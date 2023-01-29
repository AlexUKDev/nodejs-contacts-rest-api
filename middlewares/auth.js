const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    return new Error('Token type is not valid');
  }
  if (!token) {
    return new Error('No token provide');
  }

  next();
};

module.exports = {
  checkAuth,
};
