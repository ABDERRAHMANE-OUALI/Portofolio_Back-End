import * as functions from "firebase-functions"
import * as nodemailer from "nodemailer"

export const sendEmail = functions.https.onRequest((req, res) => {
  interface Payload {
    username: string
    email: string
    subject: string
    message: string
  }
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "abdearrahmaneouali05@gmail.com", // generated ethereal user
        pass: "EBF64AA8C493ABDDB9C0BA7E63803F70E186", // generated ethereal password
      },
    })
    const payload: Payload = req.body
    payload.message = `
     From: ${payload.email}
      <br/>
      Message:
        ${payload.message}
    `
    console.log(payload)
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "abdearrahmaneouali05@gmail.com", // sender address
        to: "alexabde01@gmail.com", // list of receivers
        subject: payload.subject, // Subject line
        text: "", // plain text body
        html: `<b>${payload.message}</b>`, // html body
      })

      res.send(`Message sent: ${info.messageId}`)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
      res.status(500).send("Error has occurred")
    }
  }

  main().catch(e => console.log(e))
})
