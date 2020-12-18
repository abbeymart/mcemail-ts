/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-03 | @Updated: 2020-07-15
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-sendmail function
 */

import { isEmptyObject, validateConfig } from "./helper";
import * as nodemailer from "nodemailer";
import { getResMessage, ResponseMessage } from "@mconnect/mcresponse";
import { EmailRequestType, EmailTemplateType, EmailConfigType } from "./types";
import Mail from "nodemailer/lib/mailer";

class Email {
    protected emailUser: string;
    protected emailPassword: string;
    protected emailPort: number;
    protected emailServer: string;
    protected request: EmailRequestType;
    protected template: EmailTemplateType
    protected transporter: Mail | undefined
    protected templateData: { [key: string]: string }

    constructor(config: EmailConfigType, request: EmailRequestType, template: EmailTemplateType) {
        this.emailUser = config.username
        this.emailPassword = config.password
        this.emailPort = config.port
        this.emailServer = config.emailServer
        this.request = request
        this.template = template
        this.templateData = request.templateData
    }

    validateEmailConfig() {
        // validate email-server configuration
        const valRes = validateConfig({
            username   : this.emailUser,
            password   : this.emailPassword,
            emailServer: this.emailServer,
            port       : this.emailPort,
        })
        if (valRes.code !== "success") {
            return valRes
        }
    }

    validateEmailRequestParams() {
        // required email parameters validation
        if (!this.request.fromEmail || !this.request.toEmail) {
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
        this.transporter = nodemailer.createTransport({
            host          : this.emailServer,
            port          : this.emailPort,
            secure        : true, // use TLS
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

    async sendEmail(): Promise<ResponseMessage> {
        try {
            this.validateEmailConfig()
            this.validateEmailRequestParams()
            this.activateMailServer()
            this.validateMailServer()

            // send email
            const result = await this.transporter?.sendMail({
                from   : `${this.request.fromEmail}`, // sender address
                to     : `${this.request.toEmail}`, // list of receivers
                subject: this.template.subject(this.templateData), // Subject line
                text   : this.template.text(this.templateData), // plain text body
                html   : this.template.html ? this.template.html(this.templateData) : ""  // html body
            });
            return getResMessage("success", {
                message: "Verification email sent to your registered email, check and verify your email before login.",
                value  : result,
            });
        } catch (e) {
            return getResMessage("emailError", {
                message: `Error sending email: ${e.message}`,
            });
        }
    }
}

function newEmail(config: EmailConfigType, request: EmailRequestType, template: EmailTemplateType) {
    return new Email(config, request, template)
}

export { Email, newEmail }
