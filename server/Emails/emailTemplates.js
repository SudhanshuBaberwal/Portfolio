export const CLIENT_MESSAGE_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- HEADER -->
  <div style="background: linear-gradient(to right, #00c6ff, #0072ff); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">📩 New Client Message</h1>
  </div>

  <!-- BODY -->
  <div style="background-color: #f9f9f9; padding: 25px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    
    <p>Hello Admin,</p>
    
    <p>You have received a new message from your website contact form.</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <p><strong>Client Name:</strong> {clientName}</p>
    <p><strong>Client Email:</strong> {clientEmail}</p>

    <p><strong>Message:</strong></p>
    <div style="background: #ffffff; padding: 15px; border-left: 4px solid #0072ff; border-radius: 4px;">
      {clientMessage}
    </div>

    <p style="margin-top: 25px;">Please respond to the client as soon as possible.</p>

    <p>Best regards,<br>Your Portfolio System</p>

  </div>

  <!-- FOOTER -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated notification email.</p>
  </div>

</body>
</html>
`;