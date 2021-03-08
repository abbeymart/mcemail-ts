/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-09-10
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: verify-account email templates
 */

import { EmailPropsType } from "../../src";

export const changeRequestSubject= (props: EmailPropsType) => {
    return `Hi ${props.name ? props.name : ''}, mConnect | Verify ${props.taskSubject || "Email & Access Information"}`;
};

export const changeRequestContentText= (props: EmailPropsType) => {
    return `
        Hi ${props.name},
         
        ${props.taskMessage || `Click the following link to confirm/verify [${props.taskType}] request`}.
        
        ${props.verifyLink}
        
        OR copy and paste, the following link into your browser to confirm/verify the request.
        ${props.verifyLink}
        
        
        --------------------------------------
        ${props.contactInfo}        
        
    `;
};

export const changeRequestContentHtml= (props: EmailPropsType)=> {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>
                ${props.taskMessage || `Click the following link to confirm/verify [${props.taskType}] request`}.
            </p>
            <br>
            <p><a href="${props.verifyLink}">Click to Verify Request [${props.taskType}]</a></p>
            <hr>
            <p>OR, copy and paste the following link into your browser to confirm/verify the request. </p>
            <p>${props.verifyLink}</p>
            <br>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
