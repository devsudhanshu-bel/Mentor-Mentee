import nodemailer from "nodemailer";

let cachedTransporter;

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
];

function getTransporter() {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`SMTP configuration missing: ${missing.join(", ")}`);
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return cachedTransporter;
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

class StudentCredentialsEmailService {
  async sendTemporaryPassword({
    email,
    fullName,
    registerNumber,
    temporaryPassword,
  }) {
    if (!email || !temporaryPassword) {
      throw new Error("Student email and temporary password are required.");
    }

    const transporter = getTransporter();
    const safeName = escapeHtml(fullName || "Student");
    const safeEmail = escapeHtml(email);
    const safeRegisterNumber = escapeHtml(registerNumber || "Not provided");
    const safeTemporaryPassword = escapeHtml(temporaryPassword);

    await transporter.sendMail({
      // Set SMTP_FROM in .env to: Mentor Mentee Portal <your-existing-sender-address>
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Your Mentor–Mentee Portal student account is ready",

      text: [
        "MENTOR–MENTEE PORTAL",
        "Student Account Services",
        "",
        `Welcome, ${fullName || "Student"}!`,
        "Your student account is ready.",
        "",
        `Login email: ${email}`,
        `Register number: ${registerNumber || "Not provided"}`,
        "",
        "TEMPORARY PASSWORD",
        temporaryPassword,
        "",
        "SECURITY NOTICE: You must change this temporary password after your first login. Do not share it with anyone.",
        "",
        "The portal sign-in link will be added when it is provided by the administrator.",
        "",
        "If you did not expect this account, contact your institution administrator.",
        "",
        "Mentor–Mentee Portal | Student Account Notification",
      ].join("\n"),

      html: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your Mentor–Mentee Portal account is ready</title>
          </head>
          <body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.6">
            <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">
              Your Mentor–Mentee Portal student account is ready. Your temporary sign-in credentials are inside.
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6fb;padding:28px 12px">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e1e7f0;border-radius:16px;overflow:hidden">
                    <tr>
                      <td style="background:#102344;padding:25px 28px;color:#ffffff">
                        <div style="font-size:11px;font-weight:700;letter-spacing:1.8px;color:#c8d8f0">STUDENT ACCOUNT SERVICES</div>
                        <div style="font-size:23px;font-weight:700;line-height:1.35;margin-top:7px">MENTOR–MENTEE PORTAL</div>
                        <div style="font-size:13px;color:#d5e2f5;margin-top:4px">Academic guidance. Connected journeys.</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 28px 24px">
                        <div style="font-size:12px;font-weight:700;letter-spacing:1px;color:#16835d;text-transform:uppercase">Account created successfully</div>
                        <h1 style="font-size:27px;line-height:1.25;margin:8px 0 12px;color:#14213a">Welcome, ${safeName}!</h1>
                        <p style="font-size:15px;margin:0 0 22px;color:#536176">Your student account has been created and is ready for its first sign-in.</p>

                        <div style="border:1px solid #e3e9f2;border-radius:12px;padding:18px 19px;margin-bottom:18px">
                          <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#718096;margin-bottom:13px">YOUR ACCOUNT DETAILS</div>
                          <div style="font-size:13px;color:#718096;margin-bottom:3px">Login email</div>
                          <div style="font-size:15px;font-weight:600;overflow-wrap:anywhere;margin-bottom:14px">${safeEmail}</div>
                          <div style="font-size:13px;color:#718096;margin-bottom:3px">Register number</div>
                          <div style="font-size:15px;font-weight:600">${safeRegisterNumber}</div>
                        </div>

                        <div style="background:#eef4fb;border:1px solid #dce7f5;border-radius:12px;padding:19px;margin-bottom:18px">
                          <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#365579;margin-bottom:8px">TEMPORARY PASSWORD</div>
                          <div style="font-family:Consolas,Monaco,monospace;font-size:17px;font-weight:700;color:#102344;overflow-wrap:anywhere;word-break:break-word">${safeTemporaryPassword}</div>
                          <div style="font-size:12px;color:#536176;margin-top:10px">Keep this password private and use it only to sign in to your account.</div>
                        </div>

                        <div style="border-left:4px solid #d89b24;background:#fff8e8;padding:13px 15px;border-radius:4px;margin-bottom:19px">
                          <div style="font-size:14px;font-weight:700;color:#6e4a0a;margin-bottom:3px">Important security notice</div>
                          <div style="font-size:13px;color:#6e4a0a">You must change this temporary password after your first login. Do not share it with anyone.</div>
                        </div>

                        <p style="font-size:13px;color:#536176;margin:0">The portal sign-in link will be added once it is provided by your administrator.</p>
                        <p style="font-size:13px;color:#536176;margin:17px 0 0">If you did not expect this account, please contact your institution administrator.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#f8fafc;border-top:1px solid #e8edf4;padding:18px 28px;text-align:center">
                        <div style="font-size:12px;font-weight:700;color:#334155">Mentor–Mentee Portal</div>
                        <div style="font-size:11px;color:#8792a3;margin-top:4px">Student Account Notification</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
  }
}

export default new StudentCredentialsEmailService();
