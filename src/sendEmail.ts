/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-03 | @Updated: 2020-07-15
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-sendmail function
 */

import { isEmptyObject, validateConfig } from "./helper";
import * as nodemailer from "nodemailer";
import { getResMessage, ResponseMessage } from "@mconnect/mcresponse";
import { EmailRequestType, EmailTemplateType, EmailConfigType, TemplateDataType } from "./types";
import Mail = require("nodemailer/lib/mailer");

class Email {
    protected emailUser: string;
    protected emailPassword: string;
    protected emailPort: number;
    protected serverUrl: string;
    protected msgFrom: string;
    protected request: EmailRequestType;
    protected template: EmailTemplateType;
    protected transporter: Mail | undefined;
    protected templateData: TemplateDataType;

    constructor(config: EmailConfigType) {
        this.emailUser = config.username
        this.emailPassword = config.password
        this.emailPort = config.port
        this.serverUrl = config.serverUrl
        this.msgFrom = config.msgFrom
        this.request = {fromEmail: "", toEmail: [], successMessage: "", requestName: "", templateData: {}}
        this.template = {text: ({}) => "", subject: ({}) => ""}
        this.templateData = {}
    }

    validateEmailConfig() {
        // validate email-server configuration
        const valRes = validateConfig({
            username : this.emailUser,
            password : this.emailPassword,
            serverUrl: this.serverUrl,
            port     : this.emailPort,
            msgFrom  : this.msgFrom,
        })
        if (valRes.code !== "success") {
            return valRes
        }
    }

    validateEmailRequestParams() {
        // required email parameters validation
        if (!this.request.toEmail) {
            return getResMessage("paramError", {
                message: "Request fromEmail and toEmail are required.",
            });
        }
        if ((typeof this.request.templateData !== "object") || (typeof this.request.templateData === "object" && isEmptyObject(this.request.templateData))) {
            return getResMessage("paramError", {
                message: "Email content-data is required to compose the email-message from the email-templates.",
            });
        }
    }

    activateMailServer() {
        // environment:
        const sysEnv = process.env.MC_ACCESS_ENV || "development";
        this.transporter = nodemailer.createTransport({
            host          : this.serverUrl,
            port          : this.emailPort,
            secure        : sysEnv !== "development", // use TLS for TEST/PROD deployment
            auth          : {
                user: this.emailUser,
                pass: this.emailPassword,
            },
            tls           : {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
            pool          : true,
            maxMessages   : 200,
            maxConnections: 20,
        });
    }

    validateMailServer() {
        if (!this.transporter) {
            return getResMessage("emailError", {
                message: "Email Server Setup Error. Valid transporter is required to send email/message.",
            });
        }
    }

    async sendEmail(request: EmailRequestType, template: EmailTemplateType): Promise<ResponseMessage> {
        try {
            this.request = request
            this.template = template
            this.templateData = request.templateData
            // validate send-email parameters / inputs
            this.validateEmailConfig()
            this.validateEmailRequestParams()
            this.validateMailServer()

            // activate email-server
            this.activateMailServer()

            // send email
            const result = await this.transporter?.sendMail({
                from   : `${this.request.fromEmail}`, // sender address
                to     : this.request.toEmail, // list of receivers
                subject: this.template.subject(this.templateData), // Subject line
                text   : this.template.text(this.templateData), // plain text body
                html   : this.template.html ? this.template.html(this.templateData) : ""  // html body
            });
            return getResMessage("success", {
                message: this.request.requestName ? (this.request.successMessage ? `${this.request.requestName}: ${this.request.successMessage}` :
                    `${this.request.requestName}: Requested Email sent to your registered email. Check you email for details.`) :
                    "Requested Email sent to your registered email. Check you email for details.",
                value  : result,
            });
        } catch (e) {
            return getResMessage("emailError", {
                message: `Error sending email: ${e.message}`,
            });
        }
    }
}

function newEmail(config: EmailConfigType) {
    return new Email(config)
}

export { Email, newEmail }
