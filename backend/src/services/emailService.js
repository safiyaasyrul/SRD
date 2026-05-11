const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendNotice = async (email, authorName, status) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This is for testing
      to: email,
      subject: 'Update on your Abstract Submission',
      html: `<p>Hello ${authorName},</p><p>Your abstract status has been updated to: <strong>${status}</strong>.</p>`
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

module.exports = { sendNotice };
