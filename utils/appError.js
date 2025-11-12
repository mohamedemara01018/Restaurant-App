export const AppError = (message, statusCode, statusResponse) => {
    const newError = new Error();
    newError.message = message
    newError.statusCode = statusCode
    newError.statusResponse = statusResponse
    return newError
}

