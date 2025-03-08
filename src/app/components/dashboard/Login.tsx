import React, { useState } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  UserCredential
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const saveUserToFirestore = async (userCredential: UserCredential, provider: string) => {
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
      photoURL: user.photoURL,
      authProvider: provider,
      createdAt: serverTimestamp()
    }, { merge: true });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }

    try {
      let userCredential: UserCredential;
      
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential, "email");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('Account not found. Need to sign up?');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Try again or reset your password.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try logging in instead.');
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await saveUserToFirestore(userCredential, "google");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (isSignUp) {
      checkPasswordStrength(newPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl w-full max-w-md shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-80"></div>
        
        <div className="flex justify-center mb-6">
          {isSignUp ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Create Account
              </h2>
              <p className="text-gray-400 mt-2">Join us today and get started</p>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">Login to continue your journey</p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="text-gray-400 text-sm block mb-1">Email Address</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              onFocus={() => setShowTooltip('email')}
              onBlur={() => setShowTooltip('')}
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {showTooltip === 'email' && (
              <div className="absolute left-0 -bottom-12 bg-gray-800 p-2 rounded text-xs text-gray-300 w-full z-10 shadow-lg">
                {isSignUp ? "We'll use this email to create your account" : "Enter the email you used to register"}
              </div>
            )}
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="text-gray-400 text-sm block mb-1">Password</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={handlePasswordChange}
              placeholder={isSignUp ? "Create a secure password" : "Your password"}
              required
              onFocus={() => setShowTooltip('password')}
              onBlur={() => setShowTooltip('')}
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {showTooltip === 'password' && (
              <div className="absolute left-0 -bottom-12 bg-gray-800 p-2 rounded text-xs text-gray-300 w-full z-10 shadow-lg">
                {isSignUp 
                  ? "Use at least 8 characters with uppercase, numbers and symbols"
                  : "Enter your password to access your account"
                }
              </div>
            )}
          </div>
          
          {isSignUp && password.length > 0 && (
            <div className="mt-2">
              <div className="text-xs text-gray-400 mb-1">Password strength:</div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    passwordStrength === 0 ? 'bg-red-500 w-1/4' : 
                    passwordStrength === 1 ? 'bg-orange-500 w-2/4' : 
                    passwordStrength === 2 ? 'bg-yellow-500 w-3/4' : 
                    'bg-green-500 w-full'
                  } transition-all`}
                ></div>
              </div>
              <div className="text-xs mt-1 text-gray-400">
                {passwordStrength === 0 && "Very weak - Add more characters"}
                {passwordStrength === 1 && "Weak - Try adding numbers"}
                {passwordStrength === 2 && "Medium - Add special characters"}
                {passwordStrength === 4 && "Strong - Perfect!"}
              </div>
            </div>
          )}
          
          {!isSignUp && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </button>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] font-medium"
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>
        
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        
        <div>
          <button 
            onClick={handleGoogleSignIn}
            className="w-full p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center group"
          >
            <img 
              src="/api/placeholder/24/24" 
              alt="Google Logo" 
              className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" 
            />
            Continue with Google
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Login instead' 
              : 'New here? Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;