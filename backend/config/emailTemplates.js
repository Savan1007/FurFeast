function renderVerifyEmailHtml(link, username) {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #333;">Hi ${username || 'there'},</h2>
          <p style="text-align: center; color: #555;">Please confirm your email address by clicking the button below:</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="background-color: #4CAF50; color: white; padding: 14px 24px; text-decoration: none; border-radius: 5px;">
              Confirm Email
            </a>
          </div>
          <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">This link is valid for 30 minutes.</p>
        </div>
      </div>
    `;
  }
  
  function renderWelcomeEmailHtml(username) {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #333;">Welcome, ${username || 'User'}!</h2>
          <p style="text-align: center; color: #555;">Your account has been successfully created by an administrator.</p>
          <p style="text-align: center; color: #555;">You can now log in and start using the platform.</p>
        </div>
      </div>
    `;
  }
  
  module.exports = {
    renderVerifyEmailHtml,
    renderWelcomeEmailHtml
  };
  