import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    console.log("Private key format check:", privateKey?.substring(0, 27) + "..." + privateKey?.substring(privateKey.length - 25));
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log("Firebase admin initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw error;
  }
}

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔥 Function to Fetch Tasks, Get User Emails & Send Emails
const sendReminders = async () => {
  let now = new Date();
  let tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

  // Convert to Firestore Timestamps
  const nowTimestamp = admin.firestore.Timestamp.fromDate(now);
  const tenMinutesLaterTimestamp = admin.firestore.Timestamp.fromDate(tenMinutesLater);

  console.log(`🕒 Querying Firestore for tasks due between:`);
  console.log(`   - NOW: ${now.toISOString()} (Firestore Timestamp: ${JSON.stringify(nowTimestamp)})`);
  console.log(`   - 10 MIN LATER: ${tenMinutesLater.toISOString()} (Firestore Timestamp: ${JSON.stringify(tenMinutesLaterTimestamp)})`);

  try {
    // 🔥 Step 1: Fetch Todos Due in Next 10 Minutes
    const snapshot = await db
      .collection("todos") // ✅ Using the correct collection name
      .where("deadline", ">=", nowTimestamp)
      .where("deadline", "<=", tenMinutesLaterTimestamp)
      .get();

    console.log(`📂 Fetched ${snapshot.size} matching todos`);

    if (snapshot.empty) {
      return { success: true, message: "No todos due in the next 10 minutes." };
    }

    // 📧 Step 2: Fetch User Emails & Send Emails
    const emailPromises = [];
    for (const doc of snapshot.docs) {
      const task = doc.data();
      console.log(`✅ Processing Task: ${task.text} (UserID: ${task.userId})`);

      // 🔥 Fetch User Email from `users` Collection using `userId`
      const userDoc = await db.collection("users").where("uid", "==", task.userId).get();

      if (userDoc.empty) {
        console.warn(`⚠️ No user found for userId: ${task.userId}. Skipping task.`);
        continue;
      }

      const userEmail = userDoc.docs[0].data().email;
      console.log(`📧 Found User Email: ${userEmail} for UserID: ${task.userId}`);

      // 🔥 Step 3: Send Email Reminder
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Reminder: ${task.text}`,
        text: `Hey! Just a reminder that your task "${task.text}" is due at ${new Date(
          task.deadline.seconds * 1000
        ).toLocaleString()}.\n\nDon't forget to complete it!`,
      };

      emailPromises.push(
        transporter
          .sendMail(mailOptions)
          .then(() => console.log(`✅ Email sent to ${userEmail}`))
          .catch((error) => console.error(`❌ Email failed for ${userEmail}:`, error))
      );
    }

    await Promise.all(emailPromises);

    return { success: true, message: "Reminders sent!" };
  } catch (error) {
    console.error("🔥 Error Fetching Tasks or Sending Emails:", error);
    return { error: "Failed to send reminders." };
  }
};

// API Route
export async function GET(req: NextRequest) {
  try {
    // 🔥 Fetch Tasks, Get Emails, & Send Reminders
    const response = await sendReminders();
    return NextResponse.json(response);
  } catch (error) {
    console.error("🔥 Error in API Handler:", error);
    return NextResponse.json({ error: "Failed to send reminders." }, { status: 500 });
  }
}