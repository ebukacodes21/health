"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (schema) => (req, res, next) => {
    try {
        // parse all requests on the desired endpoint
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    }
    catch (error) {
        // invalid argument error
        res.status(400).json(error.issues);
    }
};
exports.validateInput = validateInput;
