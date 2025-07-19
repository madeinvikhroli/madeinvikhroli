"use server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { buyerEmailID, buyerUPIID, member, artifact, secret } =
      await request.json();

    const templatePath = path.join(
      process.cwd(),
      "public",
      "static",
      "invoice-mail-template.html"
    );
    let template = fs.readFileSync(templatePath, "utf8");

    template = template
      .replace(/\$\{artifactName\}/g, artifact?.name)
      .replace(/\$\{userEmailID\}/g, buyerEmailID)
      .replace(/\$\{upiID\}/g, buyerUPIID)
      .replace(/\$\{secretKey\}/g, secret)
      .replace(/\$\{price\}/g, artifact?.price);

    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "madeinvikhroli@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "madeinvikhroli@gmail.com",
      to: [buyerEmailID, member.email_id],
      cc: "madeinvikhroli@gmail.com",
      subject: `Purchased ${artifact?.name}`,
      html: template,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Checkout API Error:", error);

    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
