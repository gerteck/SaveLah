function errorHandler(err, req, res, next) {
  if(err.name === 'UnauthorizedError') {
    // jwt unauthorized error
    return res.status(401).json({message: 'The user is not authorized'});
  }

  if(err.name === 'ValidationError') {
    // validation error
    return res.status(401).json({message: err});
  }

  // default to server 500 error
  return res.status(500).json(err);
}

module.exports = errorHandler;
