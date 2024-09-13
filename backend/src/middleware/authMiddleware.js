const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  console.log(" here we are")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
console.log("hallo",authHeader,req.path,req.headers)
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
   console.log("error",err)
   console.log("error",user)
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
