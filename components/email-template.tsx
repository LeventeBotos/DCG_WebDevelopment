type AdminEmailTemplateProps = {
  safeName: string;
  safeEmail: string;
  safeCompany: string;
  safeCountry: string;
  safeTopic: string;
  safeMessage: string;
  submittedAt: string;
};

type ConfirmationEmailTemplateProps = {
  safeName: string;
  safeCompany: string;
  safeCountry: string;
  safeTopic: string;
  safeMessage: string;
};

export const buildAdminEmailHtml = ({
  safeName,
  safeEmail,
  safeCompany,
  safeCountry,
  safeTopic,
  safeMessage,
  submittedAt,
}: AdminEmailTemplateProps) => `
  <div style="margin: 0; padding: 0; background: #f5f7fa; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <style>
      @media screen and (max-width: 600px) {
        .dcg-email-wrapper { padding: 0 !important; }
        .dcg-email-card {
          border-left: 0 !important;
          border-right: 0 !important;
          box-shadow: none !important;
        }
        .dcg-stack {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .dcg-stack-bottom { padding-top: 12px !important; }
        .dcg-stack-spacer { display: none !important; width: 0 !important; }
      }
    </style>
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">
      New inquiry from ${safeName} about ${safeTopic}.
    </div>
    <table width="100%" cellspacing="0" cellpadding="0" class="dcg-email-wrapper" style="padding: 28px 18px;">
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0" class="dcg-email-card" style="max-width: 720px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 18px 40px rgba(10, 76, 138, 0.12);">
            <tr>
              <td style="background: linear-gradient(120deg, #00CACA 0%, #00CACA 100%); padding: 28px 32px; color: #ffffff;">
                <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8;">DCG Contact</div>
                <div style="font-size: 28px; font-weight: 700; margin-top: 10px;">New inquiry received</div>
                <div style="font-size: 14px; opacity: 0.85; margin-top: 6px;">${safeTopic}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 8px;">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 0;">
                      <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="dcg-stack" style="padding: 12px 14px; background: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px;">
                            <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">Name</div>
                            <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">${safeName}</div>
                          </td>
                          <td class="dcg-stack-spacer" style="width: 12px;"></td>
                          <td class="dcg-stack dcg-stack-bottom" style="padding: 12px 14px; background: #f0fbfb; border: 1px solid #c8f0f0; border-radius: 14px;">
                            <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #0f766e;">Email</div>
                            <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">
                              <a href="mailto:${safeEmail}" style="color: #0f766e; text-decoration: none;">${safeEmail}</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 12px;"></td>
                  </tr>
                  <tr>
                    <td style="padding: 0;">
                      <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="dcg-stack" style="padding: 12px 14px; background: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px;">
                            <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">Company</div>
                            <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">${safeCompany}</div>
                          </td>
                          <td class="dcg-stack-spacer" style="width: 12px;"></td>
                          <td class="dcg-stack dcg-stack-bottom" style="padding: 12px 14px; background: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px;">
                            <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">Country</div>
                            <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">${safeCountry}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 12px;"></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; background: #ffffff; border: 1px dashed #cbd5f5; border-radius: 14px;">
                      <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #1f2937;">
                        <tr>
                          <td style="width: 140px; color: #64748b;">Topic</td>
                          <td style="font-weight: 600;">${safeTopic}</td>
                        </tr>
                        <tr>
                          <td style="padding-top: 6px; color: #64748b;">Submitted</td>
                          <td style="padding-top: 6px;">${submittedAt}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 20px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #64748b;">Message</div>
                <div style="margin-top: 10px; padding: 18px 18px 18px 14px; background: #f7fbfb; border-radius: 16px; border: 1px solid #e2e8f0; border-left: 4px solid #00CACA; font-size: 15px; color: #0f172a; line-height: 1.7;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 24px;">
                <table cellspacing="0" cellpadding="0" style="margin-top: 16px;">
                  <tr>
                    <td style="background: #0A4C8A; border-radius: 999px;">
                      <a href="mailto:${safeEmail}" style="display: inline-block; padding: 11px 20px; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none;">Reply to ${safeName}</a>
                    </td>
                    <td style="padding-left: 12px; font-size: 12px; color: #64748b;">
                      We'll reply with next steps soon.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 32px 28px; font-size: 12px; color: #64748b; border-top: 1px solid #eef2f6;">
                Reply directly to this email to reach ${safeName}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

export const buildConfirmationEmailHtml = ({
  safeName,
  safeCompany,
  safeCountry,
  safeTopic,
  safeMessage,
}: ConfirmationEmailTemplateProps) => `
  <div style="margin: 0; padding: 0; background: #f5f7fa; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <style>
      @media screen and (max-width: 600px) {
        .dcg-email-wrapper { padding: 0 !important; }
        .dcg-email-card {
          border-left: 0 !important;
          border-right: 0 !important;
          box-shadow: none !important;
        }
        .dcg-stack {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .dcg-stack-bottom { padding-top: 12px !important; }
        .dcg-stack-spacer { display: none !important; width: 0 !important; }
      }
    </style>
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">
      We received your message about ${safeTopic}.
    </div>
    <table width="100%" cellspacing="0" cellpadding="0" class="dcg-email-wrapper" style="padding: 28px 18px;">
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0" class="dcg-email-card" style="max-width: 720px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 18px 40px rgba(10, 76, 138, 0.12);">
            <tr>
              <td style="background: linear-gradient(120deg, #00CACA 0%, #00CACA 100%); padding: 28px 32px; color: #ffffff;">
                <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8;">DCG</div>
                <div style="font-size: 28px; font-weight: 700; margin-top: 10px;">We received your message</div>
                <div style="font-size: 14px; opacity: 0.85; margin-top: 6px;">Our team will reply shortly with next steps.</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 10px; font-size: 14px; color: #0f172a;">
                <p style="margin: 0 0 12px;">Hi ${safeName},</p>
                <p style="margin: 0 0 16px;">Thanks for reaching out. We have your message about <strong>${safeTopic}</strong>. If you need to add more context, reply directly to this email.</p>
                <table width="100%" cellspacing="0" cellpadding="0" style="margin: 16px 0 8px; border-collapse: separate; border-spacing: 0 8px;">
                  <tr>
                    <td class="dcg-stack" style="padding: 12px 14px; background: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 13px;">
                      <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">Company</div>
                      <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 4px;">${safeCompany}</div>
                    </td>
                    <td class="dcg-stack-spacer" style="width: 12px;"></td>
                    <td class="dcg-stack dcg-stack-bottom" style="padding: 12px 14px; background: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 13px;">
                      <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">Country</div>
                      <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 4px;">${safeCountry}</div>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 10px; padding: 16px 16px 16px 12px; background: #f7fbfb; border-radius: 16px; border: 1px solid #e2e8f0; border-left: 4px solid #00CACA; line-height: 1.7;">
                  ${safeMessage}
                </div>
                <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: 18px;">
                  <tr>
                    <td style="padding: 14px 16px; background: #f0fbfb; border: 1px solid #c8f0f0; border-radius: 14px;">
                      <div style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0f766e;">What happens next</div>
                      <div style="margin-top: 6px; font-size: 13px; color: #0f172a; line-height: 1.6;">
                          We'll reply with tailored next steps soon.
                      </div>
                    </td>
                  </tr>
                </table>
                <p style="margin: 18px 0 0; color: #64748b;">Best,<br />DCG Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;
