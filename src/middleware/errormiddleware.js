// Error handling middleware
export const errorhandler = (err, req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode : 500;

    res.status(statuscode).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
}