import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, X, LogIn, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface TodoHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  user: any; 
  onLoginPage: boolean;
  setOnLoginPage: (value: boolean) => void;
}

interface UserData {
  username?: string;
  displayName?: string;
  email: string;
  photoURL?: string | null;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  user,
  onLoginPage,
  setOnLoginPage
}) => {
  const auth = getAuth();
  const db = getFirestore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
          } else {
            setUserData({
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user, db]);

  const handleLogout = () => {
    signOut(auth);
    setIsProfileMenuOpen(false);
  };

  const handleLogin = () => {
    setOnLoginPage(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayName = () => {
    if (userData?.username) {
      return userData.username;
    } else if (userData?.displayName) {
      return userData.displayName;
    } else if (userData?.email) {
      return userData.email.split('@')[0];
    }
    return 'User';
  };

  const getInitial = () => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-sm border-b border-white/10 relative z-50">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors mr-3"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
          TaskX
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <button className="text-white/80 hover:text-white transition-colors">
          <Search size={20} />
        </button>
        
        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full py-1 px-2 transition-colors"
            >
              {user.photoURL ? (
                <img 
                  src="/api/placeholder/28/28" 
                  alt="User Avatar" 
                  className="w-7 h-7 rounded-full border border-indigo-500" 
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                  {userData ? getInitial() : user.email.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden md:block text-sm text-white/90 max-w-24 truncate">
                {userData ? getDisplayName() : user.email.split('@')[0]}
              </span>
              <ChevronDown size={16} className={`text-white/70 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isProfileMenuOpen && (
              <div className="fixed right-4 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 overflow-hidden z-[100]">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-white font-medium truncate">
                    {userData?.displayName || getDisplayName()}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {userData?.username && `@${userData.username}`}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {userData?.email || user.email}
                  </p>
                </div>
                <div className="p-1">
                  <button className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white/10 rounded-md text-sm text-white/80 hover:text-white transition-colors">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white/10 rounded-md text-sm text-white/80 hover:text-white transition-colors">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left p-2 hover:bg-red-900/30 rounded-md text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg py-1.5 px-3 transition-colors"
          >
            <LogIn size={18} />
            <span className="hidden md:block text-sm">Login</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoHeader;