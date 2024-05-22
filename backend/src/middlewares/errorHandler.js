export const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    ok: false,
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (err, req, res, next) => {
  if ("isBoom" in err && err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({
      ok: false,
      ...output.payload,
    });
  } else {
    next(err);
  }
};
