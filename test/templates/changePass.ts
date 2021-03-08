/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: change-password email templates
 */

import { EmailPropsType } from "../../src";

export const changePassSubject = (props: EmailPropsType) => {
    return `Hi ${props.name? props.name : ''}, mConnect | Password Changed`;
};

export const changePassContentText = (props: EmailPropsType) => {
    return `
        Hi ${props.name},
        
        You have successfully changed your password.
        
        Please use, copy and paste the following link into your browser to login.
        ${props.urlLink}
        
        
        --------------------------------------
        ${props.contactInfo}        
        
    `;
};

export const changePassContentHtml = (props: EmailPropsType) => {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>You have successfully changed your password.</p>
            <br>
            <p><a href="${props.urlLink}">Click to Login into your account</a></p>
            <hr>
            <p>You may copy and paste the following link into your browser to login. </p>
            <p>${props.urlLink}</p>
            <br>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
