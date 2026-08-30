import { Resend } from 'resend';

export async function sendLeadNotificationEmail({
  name,
  email,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  company?: string | null;
  service: string;
  budget: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim().length < 5) {
    console.warn('Resend notification skipped: RESEND_API_KEY not configured.');
    return { success: false, reason: 'unconfigured' };
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'hassan@example.com';

    const { data, error } = await resend.emails.send({
      from: `NexaCore Automations <${fromEmail}>`,
      to: [adminEmail],
      subject: `[New Inquiry] ${service} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Project Inquiry</h2>
          <p>You received a new lead inquiry on your agency website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0; color: #0f172a;">${company || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Selected Service:</td>
              <td style="padding: 8px 0; color: #2563eb; font-weight: bold;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Budget Range:</td>
              <td style="padding: 8px 0; color: #0f172a;">${budget}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; font-weight: bold; color: #334155;">Project Details:</p>
            <p style="margin-top: 8px; color: #1e293b; white-space: pre-wrap; line-height: 1.5;">${message}</p>
          </div>

          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            NexaCore Automations • AUTOMATE • INNOVATE • ELEVATE
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Resend email exception:', err);
    return { success: false, error: err };
  }
}
