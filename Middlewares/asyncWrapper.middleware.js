export const asyncWrapper = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((rej) => {
            next(rej);
        });
    }
}