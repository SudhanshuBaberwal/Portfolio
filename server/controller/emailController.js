import collectEmail from "../Emails/email.js";

export const email = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await collectEmail(name, email, subject, message );
    return res
      .status(200)
      .json({ success: true, message: "Email Sent Successfully" });
  } catch (error) {
    console.log("Error in email function : ", error)
    return res.status(400).json({success : false, message : error.message})
  }
};
