const errorMiddleware = (error, req, res, next) => {
  console.error("Global error handler:", error);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
};

module.exports = {
  errorMiddleware,
};
