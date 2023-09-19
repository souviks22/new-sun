const catchAsync = handler => {
    return (req, res) => {
        handler(req, res).catch(error => {
            const response = {
                success: false,
                message: error.message
            }
            if (error.name === 'ValidationError') res.status(400).json(response)
            else res.status(500).json(response)
        })
    }
}

export default catchAsync