"use server";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // honeypot — bots fill every field, humans never see this one
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const gpus = String(formData.get("gpus") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !company || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Please fill in your name, company, and a valid work email.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL not set");
    return {
      status: "error",
      message: "Something went wrong on our end. Email us directly instead.",
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Comet Compute <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Cluster proposal request — ${company.replace(/[\r\n]/g, " ")}`,
      text: [
        `Name:     ${name}`,
        `Company:  ${company}`,
        `Email:    ${email}`,
        `GPUs:     ${gpus || "—"}`,
        ``,
        `What they're building:`,
        message || "—",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return {
      status: "error",
      message: "Couldn't send your request. Please try again in a minute.",
    };
  }

  return { status: "success" };
}
