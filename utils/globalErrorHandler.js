const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // Distinguish between operational (known) and programming (unknown) errors
  if (error.isOperational) {
    // Known errors (handled by custom error classes)
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Unknown errors
    console.error("Unexpected Error: ", error); // Log error details for debugging
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = errorHandler;
