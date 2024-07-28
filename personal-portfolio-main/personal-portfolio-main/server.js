const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using your email service provider's SMTP settings
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const name = firstName + " " + lastName;

  const mail = {
    from: name,
    to: "3suryasingh@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ code: 500, message: "Something went wrong, please try again later." });
    } else {
      res.json({ code: 200, message: "Message Sent" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
