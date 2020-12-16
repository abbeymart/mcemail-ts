/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: email props type
 */

import { Readable } from "nodemailer/lib/xoauth2";
import { AttachmentLike } from "nodemailer/lib/mailer";

export interface EmailConfigType {
    emailUser: string;
    emailPassword: string;
    emailPort: number;
    emailServer: string;
}

export type EmailSubjectFunc = (props: object) => string;

export type EmailFunc = (props: object) => string | Buffer | Readable | AttachmentLike | undefined;

export interface EmailRequestType {
    [key: string]: string;

    fromEmail: string;
    toEmail: string;
}

export interface EmailTemplateType {
    subject: EmailSubjectFunc;
    text: EmailFunc;
    html?: EmailFunc;
}
