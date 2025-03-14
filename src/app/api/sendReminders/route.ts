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

const sendReminders = async () => {
  try {
    console.log("🚀 Starting reminder process");
    
    let now = new Date();
    
    let nineMinutesLater = new Date(now.getTime() + 9 * 60 * 1000);
    let tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

    const nineMinutesLaterTimestamp = admin.firestore.Timestamp.fromDate(nineMinutesLater);
    const tenMinutesLaterTimestamp = admin.firestore.Timestamp.fromDate(tenMinutesLater);

    console.log(`🕒 Querying Firestore for tasks due between:`);
    console.log(`   - 9 MIN LATER: ${nineMinutesLater.toISOString()}`);
    console.log(`   - 10 MIN LATER: ${tenMinutesLater.toISOString()}`);

    const snapshot = await db
      .collection("todos")
      .where("deadline", ">=", nineMinutesLaterTimestamp)
      .where("deadline", "<=", tenMinutesLaterTimestamp)
      .get();

    console.log(`📂 Found ${snapshot.size} total tasks in the time window`);

    if (snapshot.empty) {
      return { success: true, message: "No todos due in the target time window." };
    }

    const tasksToProcess = [];
    
    for (const doc of snapshot.docs) {
      const taskId = doc.id;
      const task = doc.data();
      
      if (task.reminderSent !== true) {
        tasksToProcess.push({ id: taskId, data: task });
      } else {
        console.log(`⏭️ Skipping task ${taskId} - reminder already sent`);
      }
    }
    
    console.log(`✉️ Need to send reminders for ${tasksToProcess.length} tasks`);
    
    if (tasksToProcess.length === 0) {
      return { success: true, message: "No new reminders needed." };
    }

    const emailPromises = [];
    
    for (const { id: taskId, data: task } of tasksToProcess) {
      console.log(`🔄 Processing Task: ${task.text} (UserID: ${task.userId})`);

      const userDoc = await db.collection("users").where("uid", "==", task.userId).get();

      if (userDoc.empty) {
        console.warn(`⚠️ No user found for userId: ${task.userId}. Skipping task.`);
        continue;
      }

      const userEmail = userDoc.docs[0].data().email;
      console.log(`📧 Found User Email: ${userEmail} for UserID: ${task.userId}`);

      const formattedDate = new Date(task.deadline.seconds * 1000).toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const mailOptions = {
        from: `"Task Reminder" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Reminder: ${task.text}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="background-color: #4a86e8; padding: 15px; border-radius: 5px 5px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 22px;">Task Reminder</h1>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
              <p style="font-size: 16px; color: #333;">Hi there,</p>
              <p style="font-size: 16px; color: #333;">Just a friendly reminder that your task is due soon:</p>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #4a86e8; margin: 15px 0;">
                <h2 style="margin-top: 0; color: #333; font-size: 18px;">${task.text}</h2>
                <p style="color: #666; margin-bottom: 0;">
                  <strong>Due:</strong> ${formattedDate}
                </p>
              </div>
              <p style="font-size: 16px; color: #333;">Don't forget to complete it on time!</p>
              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #777; margin: 0;">
                  This is an automated reminder from your task management app.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Reminder: Your task "${task.text}" is due at ${formattedDate}.\n\nDon't forget to complete it!`,
      };

      emailPromises.push(
        transporter
          .sendMail(mailOptions)
          .then(async () => {
            console.log(`✅ Email sent to ${userEmail} for task ${taskId}`);
            
            await db.collection("todos").doc(taskId).update({
              reminderSent: true
            });
            
            console.log(`✓ Task ${taskId} marked as reminded`);
          })
          .catch((error: any) => {
            console.error(`❌ Email failed for ${userEmail}:`, error);
            return Promise.reject(error);
          })
      );
    }

    await Promise.allSettled(emailPromises);

    const sentCount = emailPromises.length;
    
    return { 
      success: true, 
      message: `Reminders processed: ${sentCount} sent successfully.`
    };
  } catch (error: any) {
    console.error("🔥 Error in sendReminders:", error);
    return { error: "Failed to send reminders: " + (error?.message || "Unknown error") };
  }
};

export async function GET(req: NextRequest) {
  try {
    console.log("📣 API endpoint called");
    const response = await sendReminders();
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("🔥 Error in API Handler:", error);
    return NextResponse.json({ 
      error: "Failed to process reminders", 
      details: error?.message || "Unknown error" 
    }, { status: 500 });
  }
}