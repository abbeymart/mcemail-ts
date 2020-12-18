/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-mail: types
 */

import { Readable } from "nodemailer/lib/xoauth2";
import { AttachmentLike } from "nodemailer/lib/mailer";

export interface EmailConfigType {
    username: string;
    password: string;
    port: number;
    emailServer: string;
}

export type EmailSubjectFunc = (props: object) => string;

export type EmailFunc = (props: object) => string | Buffer | Readable | AttachmentLike | undefined;

export interface EmailRequestType {
    fromEmail: string;
    toEmail: string;
    templateData: {
        [key: string]: string;
    }


}

export interface EmailTemplateType {
    subject: EmailSubjectFunc;
    text: EmailFunc;
    html?: EmailFunc;
}

export interface MessageObject {
    [key: string]: string;
}
