const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: 'You must login' });
    }
  };
  
  module.exports = isLoggedIn;
  