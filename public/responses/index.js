"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
function success({ res, status = 200, message, data, token, }) {
    return res.status(status).json({
        ok: true,
        message,
        data,
        token,
    });
}
exports.success = success;
function failure({ res, status = 500, message }) {
    return res.status(status).json({
        ok: false,
        message,
    });
}
exports.failure = failure;
