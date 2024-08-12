export function sendOtp(email: string){

    let otp_val = Math.floor(Math.random()*10000);
    let emailBody = `<h3>Your otp is </h3>${otp_val}`;

    Email.send({
        SecureToken : "dbb26e6c-fe62-42c6-869d-6faed37c172b",
        To : email,
        From : "3suryasingh@gmail.com",
        Subject : "Vefidy your StudentPlus account.",
        Body : emailBody
    }).then(
      message => {
        if(message === "OK"){
            alert("otp sent")
        }
      }
    );
    navigate('/blogs')
}