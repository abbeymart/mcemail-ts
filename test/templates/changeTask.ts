/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-09-10
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: change-password email templates
 */

import { AuthEmailProp } from "../../src/types";

export const changeTaskSubject = (props: AuthEmailProp) => {
    return `Hi ${props.name ? props.name : ''}, mConnect | ${props.taskSubject || 'Task Completed' }`;
};

export const changeTaskContentText = (props: AuthEmailProp) => {
    return `
        Hi ${props.name},
        
        The requested [${props.taskType}] task has been successfully completed.
        
        Please click the link below, or copy and paste the link into your browser, to continue / login.
        ${props.urlLink}
        
        
        --------------------------------------
        ${props.contactInfo}        
        
    `;
};

export const changeTaskContent = (props: AuthEmailProp) => {
    return `
        <div class="w3-container">
            <p>Hi ${props.name},</p>
            <p>The requested [${props.taskType}] task has been successfully completed.</p>
            <br>
            <hr>
            <p>Please click the link below, or copy and paste the link into your browser, to continue / login. </p>
            <p>${props.urlLink}</p>
            <br>
            <br>
            <hr>
            <p>${props.contactInfo}</p>
        </div>
    `;
};
