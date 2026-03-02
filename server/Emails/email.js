import { CLIENT_MESSAGE_NOTIFICATION_TEMPLATE } from "./emailTemplates.js";
import transporter from "./nodemailer.js";

const collectEmail = async (name, sender, subject, message) => {
  try {
    const mailOptions = await transporter.sendMail({
      from: sender,
      to: "24bcs147@iiitdwd.ac.in",
      subject: subject,
      html: CLIENT_MESSAGE_NOTIFICATION_TEMPLATE.replace("{clientName}", name)
        .replace("{clientEmail}", sender)
        .replace("{clientMessage}", message),
    });
  } catch (error) {
    console.log("Error in collect Email Function : ", error);
  }
};

export default collectEmail;
