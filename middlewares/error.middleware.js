const errorMiddleware = (err, req, res, next) => {
  try {
  let error = { ...err };
  error.message = err.message || 'Internal Server Error';
  console.error(err);

  // mongoose bad objectid error 
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new Error(message);
    error.status = 404;
  }
    // mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(', ')}`;
      error = new Error(message);
      error.status = 400;
    }

    // mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      error = new Error(message);
      error.status = 400;
    }

    res.status(error.status || 500).json({
      success: false,
        message: error.message || 'Internal Server Error',
    });



} catch (error) {
  next(error);
}
};
export default errorMiddleware;


