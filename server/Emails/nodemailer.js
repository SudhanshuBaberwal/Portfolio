import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  sercure: false,
  auth: {
    user: "24bcs147@iiitdwd.ac.in",
    pass: "foounepaqfuyklvu",
  },
});

export default transporter;
