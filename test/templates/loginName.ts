/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: login-name email templates
 */

import { AuthEmailProp } from "../../src/types";

export const loginNameSubject = (props: AuthEmailProp) => {
    return `Hi ${props.name? props.name : ''}, mConnect | Login Name Request`;
};

export const loginNameContentText = (props: AuthEmailProp) => {
    return `
        Hi ${props.name},
        
        You have requested for your login name. See details below.
        
        Email:      ${props.email}
        Username:   ${props.username}
        
        Please use, copy and paste the following link into your web browser, to login:
        ${props.urlLink}
        
        
        --------------------------------------
        ${props.contactInfo} 

    `;
};

export const loginNameContent = (props: AuthEmailProp) => {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>You have requested for your login name. See details below</p>
            <br>
            <h4>Email:      ${props.email}</h4>
            <h4>Username:   ${props.username}</h4>
            <br>
            <p><a href="${props.urlLink}">Login to Your Account</a></p>
            <hr>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
