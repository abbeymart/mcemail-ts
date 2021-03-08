/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: set-password email templates
 */

import { EmailPropsType } from "../../src";

export const setPassSubject = (props: EmailPropsType) => {
    return `Hi ${props.name? props.name : ''}, mConnect | Password Reset Successfully`;
};

export const setPassContentText = (props: EmailPropsType) => {
    return `
        Hi ${props.name},
        
        Your password has been reset/changed. You may login now.
        
        Please use, copy and paste the following link into your browser to login.
        ${props.urlLink}
        
        
        --------------------------------------
        ${props.contactInfo}    
        
    `;
};

export const setPassContentHtml = (props: EmailPropsType) => {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>You have successfully reset your password. You may login now.</p>
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
