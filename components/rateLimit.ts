const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 2,
  message:
    "Too Many Requests",
});

export default apiLimiter;
