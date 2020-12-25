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
import { verifySubject, verifyContentText, verifyContent } from "./templates";

const serverConfig: EmailConfigType = {
    username : emailUser,
    password : emailPass,
    serverUrl: emailServer,
    port     : Number(emailPort),
    msgFrom  : "",
};

const requestInfo: EmailRequestType = {
    fromEmail   : "",
    toEmail     : "",
    templateData: {},
};

const emailTemp: EmailTemplateType = {
    subject: verifySubject,
    text   : verifyContentText,
    html   : verifyContent,
};

(async () => {
    await mcTest({
        name    : "should send and return valid response for verification",
        testFunc: async () => {
            const mail = newEmail(serverConfig)
            const mailRes: ResponseMessage = await mail.sendEmail(requestInfo, emailTemp);
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
