'use strict';

module.exports = (req, res, next) => {
  console.log(`REQ: ${req.method} from ${req.originalUrl} status ${res.statusCode} `);
  next();
}