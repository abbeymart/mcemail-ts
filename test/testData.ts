/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-15
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: test data for mc-mail testing
 */

export const verifyData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'verify',
};

export const verifyRes = {
    code   : 'success',
    message: 'Verification email sent to your registered email, check and verify your email before login.',
}
export const verifyError = {
    code   : 'emailError',
    message: 'Error sending verification email, contact system-admin',
}

export const verifyUserRequestData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'verifyUserRequest',
};
export const verifyUserReqRes = {
    code   : 'success',
    message: 'Verification email sent to your registered email, check and verify your email before login.',
}
export const verifyUserReqError = {
    code   : 'emailError',
    message: 'Error sending verification email, contact system-admin',
}

export const resetPasswordRequestData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'resetPasswordRequest',
};
export const resetPassRes = {
    code   : 'success',
    message: 'Reset password request email sent to your registered email address.',
}
export const resetPassError = {
    code   : 'emailError',
    message: 'Error sending reset password request email, contact system-admin:',
}

export const setPasswordData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'setPassword',
};
export const setPassRes = {
    code   : 'success',
    message: 'Password reset email sent to your registered email address',
}
export const setPassError = {
    code   : 'emailError',
    message: 'Error sending password reset email, contact system-admin:',
}

export const getLoginNameData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'getLoginName',
};
export const getLoginNameRes = {
    code   : 'success',
    message: 'Login-name email sent to your registered email address.',
}
export const getLoginNameError = {
    code   : 'emailError',
    message: 'Error sending login-name email, contact system-admin:',
}

export const changePasswordData = {
    email    : 'abbeymart@hotmail.com',
    username : 'abbeymart',
    loginName: 'abbeymart',
    msgFrom  : 'support@mconnect.biz',
    token    : 'testing-testing-testing',
    fullName : 'Abbey City',
    reqUrl   : 'mconnect.biz',
    type     : 'changePassword',
};
export const changePassRes = {
    code   : 'success',
    message: 'Password reset email sent to your registered email address',
}
export const changePassError = {
    code   : 'emailError',
    message: 'Error sending password reset email, contact system-admin:',
}

export const defaultError = {
    code   : 'emailError',
    message: 'Error sending email: missing the required email parameters (type, title etc.)',
}
