/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-15
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: testing of the mc-mail package
 */

import { assertEquals, mcTest, postTestResult } from '@mconnect/mctest';
import { newEmail } from "../src";

import { EmailConfigType, EmailRequestType, EmailTemplateType } from "../src";
import { contactInfo, emailConfig, toEmailAddress } from "./config/emailConfig";
import { verifySubject, verifyContentText, verifyContentHtml } from "./templates";

const serverConfig: EmailConfigType = {
    username : emailConfig.username,
    password : emailConfig.password,
    serverUrl: emailConfig.serverUrl,
    port     : emailConfig.port,
    msgFrom  : emailConfig.msgFrom,
};

const requestInfo: EmailRequestType = {
    fromEmail   : emailConfig.msgFrom,
    toEmail     : toEmailAddress,
    successMessage: "success",
    requestName: "Guest User",
    templateData: {
        name       : "Abbey",
        verifyLink : "http://localhost:8080/verify",
        contactInfo: contactInfo,
        taskSubject: "Verify Registered Account",
    },
};

const emailTemp: EmailTemplateType = {
    subject: verifySubject,
    text   : verifyContentText,
    html   : verifyContentHtml,
};

const verifyRes = {
    code: "success",
    resMessage: "Requested Email sent to your registered email",
    message: "success",
};
const verifyError = {
    code: "emailError",
    message: "",
};

(async () => {
    await mcTest({
        name    : "should send and return valid response for verification",
        testFunc: async () => {
            const mail = newEmail(serverConfig)
            const mailRes = await mail.sendEmail(requestInfo, emailTemp);
            console.log("mail-response: ", mailRes)
            if (mailRes.code === 'success') {
                assertEquals(mailRes.code, verifyRes.code);
                assertEquals(mailRes.message.includes(verifyRes.message), true);
            } else {
                assertEquals(mailRes.code, verifyError.code);
            }
        },
    });

    await postTestResult();

})();
