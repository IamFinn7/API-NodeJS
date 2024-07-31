module.exports = function middleware(req, res, next) {
  console.log("Middleware function called");
  next();
};
