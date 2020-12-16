/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: verify-account email templates
 */

import { AuthEmailProp } from "../../src/types";

export const verifySubject= (props: AuthEmailProp) => {
    return `Hi ${props.name ? props.name : ''}, Welcome to mConnect | Verify ${props.taskSubject || "Email & Access Information"}`;
};

export const verifyContentText= (props: AuthEmailProp) => {
    return `
        Hi ${props.name},
        
        Welcome to mConnect, the marketplace connected solutions. 
        ${props.taskMessage || "Click the following link to confirm your email and access information"}.
        
        ${props.verifyLink}
        
        Please use, copy and paste, the following link into your browser to verify your account.
        ${props.verifyLink}
        
        
        --------------------------------------
        ${props.contactInfo}        
        
    `;
};

export const verifyContent= (props: AuthEmailProp)=> {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>Welcome to mConnect, the marketplace connected solutions. To complete your account registration or updates,
            click the following link to confirm your email and access information</p>
            <br>
            <p><a href="${props.verifyLink}">Click to Verify Your Account</a></p>
            <hr>
            <p>You may copy and paste the following link into your browser to verify your account. </p>
            <p>${props.verifyLink}</p>
            <br>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
