import { validationResult } from "express-validator"

const catchAsync = handler => {
    return (req, res, next) => {
        const { errors } = validationResult(req)
        if (errors.length) {
            const fields = []
            for (const error of errors) fields.push(error.path)
            res.status(400).json({
                success: false,
                message: `Your ${fields.join(', ')} ${fields.length == 1 ? 'is' : 'are'} missing`
            })
        } else {
            handler(req, res, next).catch(error => {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            })
        }
    }
}

export default catchAsync