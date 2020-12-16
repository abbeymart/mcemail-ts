/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-15
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: testing of the mc-mail package
 */

import { assertEquals, mcTest, postTestResult } from '@mconnect/mctest';
import { Email, newEmail } from "../src";

// test data import
import {
    verifyData, verifyRes, verifyError,
    changePasswordData, changePassRes, changePassError,
    getLoginNameData, getLoginNameRes, getLoginNameError,
    resetPasswordRequestData, resetPassRes, resetPassError,
    setPasswordData, setPassRes, setPassError,
    verifyUserRequestData, verifyUserReqRes, verifyUserReqError,
    defaultError,
} from "./testData";
import { ResponseMessage } from "@mconnect/mcresponse";
import { EmailConfigType, EmailRequestType, EmailTemplateType } from "../src/types";
import { emailPass, emailServer, emailUser, emailPort } from "./config/emailConfig";
import {verifySubject, verifyContentText, verifyContent} from "./templates";

const serverConfig: EmailConfigType = {
    emailUser    : emailUser,
    emailPassword: emailPass,
    emailServer  : emailServer,
    emailPort    : Number(emailPort),
};

const requestInfo: EmailRequestType = {
  fromEmail: "",
  toEmail: "",
};

const emailTemp: EmailTemplateType ={
    subject: verifySubject,
    text: verifyContentText,
    html: verifyContent,
};

(async () => {
    await mcTest({
        name    : "should send and return valid response for verification",
        testFunc: async () => {
            const mail = newEmail(serverConfig, requestInfo, emailTemp, {})
            const mailRes: ResponseMessage = await mail.sendEmail();
            if (mailRes.code === 'success') {
                assertEquals(mailRes.code, verifyRes.code);
                assertEquals(mailRes.message, verifyRes.message);
            } else {
                assertEquals(mailRes.code, verifyError.code);
            }
        },
    });

    await postTestResult();

})();
