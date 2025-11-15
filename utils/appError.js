export const AppError = (message, statusCode, responseText) => {
    let error = new Error();
    error.message = message;
    error.statusCode = statusCode;
    error.responseText = responseText;
    return error
}