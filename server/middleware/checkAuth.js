// middleware/checkAuth.js
exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the requested page
  }
  res.redirect('/unauthorized'); // Redirect to unauthorized page if not authenticated
};
