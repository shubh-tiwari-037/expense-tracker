export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(err);

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export const notFound = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};
