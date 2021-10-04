const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 90000,
  max: 2,
});

export default apiLimiter;
