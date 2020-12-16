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

export interface AuthEmailProp {
    name: string;
    email?: string;
    username?: string;
    verifyLink?: string;
    contactInfo: string;
    urlLink?: string;
    taskType?: string;
    taskSubject?: string;
    taskMessage?: string;
    loginName?: string;
}

export type AuthEmailFunc = (props: AuthEmailProp) => string | Buffer | Readable | AttachmentLike | undefined;

export type EmailSubjectFunc = (props: object) => string;

export type EmailFunc = (props: object) => string | Buffer | Readable | AttachmentLike | undefined;

export interface EmailRequestType {
    [key: string]: string;

    fromEmail: string;
    toEmail: string;
}

export interface AuthEmailTemplate {
    subject: EmailSubjectFunc;
    text: AuthEmailFunc;
    html?: AuthEmailFunc;
}

export interface EmailTemplateType {
    subject: EmailSubjectFunc;
    text: EmailFunc;
    html?: EmailFunc;
}
