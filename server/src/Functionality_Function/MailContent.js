const htmlText=(type,userName,code)=>{
    if(type=="VERIFICATIONCODE")
    {

        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            @media only screen and (max-width: 600px) {
              .email_template {
                width: 100% !important;
                padding:0 !important;
              }
            }
          </style>
        </head>
        
        <body style="margin: 0; padding: 0;">
          <table class="email_template" style="width: 100%; background-color: gainsboro; padding: 2rem; display: flex; align-items: center; justify-content: center; font-size: small; font-weight: 300; color:black">
            <tr>
              <td align="center" style="padding-bottom: 2rem;">
                <table style="width: 100%;  background-color: white; padding: 2rem;">
                  <tr>
                    <td style="display:flex">
                      <img src="https://theme.zdassets.com/theme_assets/11150919/275750ee43a3c25bb5cd917f1349a6054ea8e535.png" alt="none" style="width: 40px; border-radius: 50%; height: 40px">
                      <h4 style="font-size: x-large; padding: 0; margin: 9px;">VideoConfii</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="padding: 0;">Hi ${userName},</p>
                      <p style="margin: 0; padding: 0;">To activate your VideoConfii Account, please verify your email address.</p>
                      <p style="margin: 0; padding: 0;">Your account will not be created until you verify your email address.</p>
                      <p style="display: flex; color:black">Please use the code: <span style="display: contents; font-weight: 600;">${code}</span></p>
                      <p style="margin: 0; padding: 0; color:black; font-weight: 700;">This code is valid for next 10 min only</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p>Thank You</p>
                      <p>Team VideoConfii</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        
        </html>
        
        `
    }
}
module.exports=htmlText