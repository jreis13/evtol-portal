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
      from: `"${name}" <${email}>`,
      to: "enquiries@exponentialvector.eu",
      subject: "New Contact Form Message",
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p><p>${message}</p>`,
    })

    return new Response("Email sent", { status: 200 })
  } catch (error) {
    console.error("Email send error:", error)
    return new Response("Error sending email", { status: 500 })
  }
}
