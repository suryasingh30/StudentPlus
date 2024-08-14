import { useNavigate } from "react-router-dom";

export function sendOtp(email: string) {
  const navigate = useNavigate(); // Initialize the navigate function

  let otp_val = Math.floor(Math.random() * 10000);
  let emailBody = `<h3>Your OTP is: </h3>${otp_val}`;

  Email.send({
    SecureToken: "dbb26e6c-fe62-42c6-869d-6faed37c172b",
    To: email,
    From: "3suryasingh@gmail.com",
    Subject: "Verify your StudentPlus account.",
    Body: emailBody,
  }).then((message: string) => {
    if (message === "OK") {
      alert("OTP sent");
      navigate('/blogs'); // Navigate to /blogs after successful OTP send
    } else {
      alert("Failed to send OTP. Please try again.");
    }
  }).catch((error: any) => {
    console.error("Error sending email:", error);
    alert("An error occurred while sending the OTP.");
  });
}
