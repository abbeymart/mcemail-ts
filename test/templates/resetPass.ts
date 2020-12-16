/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: reset-password email templates
 */

import { AuthEmailProp } from "../../src/types";

export const resetPassSubject = (props: AuthEmailProp) => {
    return `Hi ${props.name ? props.name : ''}, mConnect | Reset Your Password`;
};

export const resetPassContentText = (props: AuthEmailProp) => {
    return `
        Hi ${props.name},
        
        You have requested to reset your password.
       
        Please use, copy and paste the following link into your browser to reset/change your password.     
        ${props.urlLink}
        
        
        --------------------------------------
        ${props.contactInfo} 
        
    `;
};

export const resetPassContent = (props: AuthEmailProp) => {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>You have requested to reset your password.</p>
            <br>
            <p><a href="${props.urlLink}">Click to Reset/Change Your Password</a></p>
            <hr>
            <p>You may copy and paste the following link into your browser to reset/change your password. </p>
            <p>${props.urlLink}</p>
            <br>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
