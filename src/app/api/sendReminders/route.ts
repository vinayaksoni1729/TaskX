import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

// Configure Nodemailer (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password
  },
});

// Function to fetch and send reminders
const sendReminders = async () => {
  const now = new Date();
  const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

  const snapshot = await db
    .collection("tasks")
    .where("deadline", ">=", now.toISOString())
    .where("deadline", "<=", tenMinutesLater.toISOString())
    .get();

  if (snapshot.empty) return { success: true, message: "No tasks due in the next 10 minutes." };

  // Process tasks
  const emails: Promise<any>[] = [];
  snapshot.forEach((doc) => {
    const task = doc.data();
    if (!task.userEmail) return;

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: task.userEmail,
      subject: `Reminder: ${task.title}`,
      text: `Hey! Just a reminder that your task "${task.title}" is due at ${new Date(task.deadline).toLocaleString()}.\n\nDon't forget to complete it!`,
    };

    emails.push(transporter.sendMail(mailOptions));
  });

  await Promise.all(emails); // Send all emails
  return { success: true, message: "Reminders sent!" };
};

// API Route (Next.js App Router Format)
export async function GET(req: NextRequest) {
  try {
    const response = await sendReminders();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json({ error: "Failed to send reminders." }, { status: 500 });
  }
}
