const appRoot = require('app-root-path');
const nodemailer = require("nodemailer");
const logger = require(appRoot + '/src/logger').apiLogger;

module.exports = {
	//In this method we will sendForgetPassword Emails
	forgetPassEmailSendingFunc: async function (params) {
		const {
			email,
			code,
		} = params;
		logger.info(`calling nodeMailer to create transport`);
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "renthub715@gmail.com",
				pass: "Pakistan1234#",
			},
		});
		const mailOptions = {
			from: "norply@gmail.com",
			to: email,
			subject: "Forget Password Code",
			html: `<p>Your Requested code is <br> <centrer> <h1 style="font-size: 60px">${code}</h1></center></p>`, // html body
		};
		logger.info(`calling nodeMailer to send email with mail Options ${JSON.stringify(mailOptions)}`);
		const emailSend = await transporter.sendMail(mailOptions);
		return !!emailSend;
	},
}
