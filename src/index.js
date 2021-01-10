const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.post("/", (req, res) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "abdearrahmaneouali05@gmail.com", // generated ethereal user
      pass: "EBF64AA8C493ABDDB9C0BA7E63803F70E186", // generated ethereal password
    },
  });
  const payload = req.body;
  payload.message = `
     From: ${payload.email}
      <br/>
      Message:
        ${payload.message}
    `;
  console.log(payload);
  try {
    // send mail with defined transport object
    transporter
      .sendMail({
        from: "abdearrahmaneouali05@gmail.com", // sender address
        to: "alexabde01@gmail.com", // list of receivers
        subject: payload.subject, // Subject line
        text: "", // plain text body
        html: `<b>${payload.message}</b>`, // html body

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      })
      .then((info) => res.send(`Message sent: ${info.messageId}`));
  } catch (error) {
    res.status(500).send("Error has occurred");
  }
});

app.listen(process.env.PORT || 3000);
