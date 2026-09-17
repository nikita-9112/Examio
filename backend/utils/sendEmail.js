const nodemailer = require("nodemailer");


const sendEmail = async ({ to, subject, html }) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Examio" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

//________________________________________________________________________________________

// for resend 

// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: process.env.EMAIL_FROM,
//       to,
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("Resend email error:", error);
//       throw new Error(error.message);
//     }

//     console.log("Email sent successfully:", data?.id);

//     return data;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = sendEmail;