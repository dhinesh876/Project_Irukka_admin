// Utility functions for sending success responses
export const successResponse = (res, data, message) => {
    res.status(200).json({
        status: "success",
        message,
        data
    });
}

// Utility function for sending error responses
export const routeerrorResponse = (res, statuscode, message) => {
    res.status(statuscode).json({
        status: "error",
        success: false,
        message
    })
}