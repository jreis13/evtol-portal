import nodemailer from "nodemailer"

export async function POST(req) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"<${email}>`,
      to: "updates@evtolportal.com",
      subject: "New Newsletter Subscription",
      text: `${email} has subscribed to the newsletter.`,
      html: `${email} has subscribed to the newsletter.<br><br>`,
    })

    return new Response("Email sent", { status: 200 })
  } catch (error) {
    console.error("Email send error:", error)
    return new Response("Error sending email", { status: 500 })
  }
}
