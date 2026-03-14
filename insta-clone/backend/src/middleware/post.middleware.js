
const jwt = require("jsonwebtoken");

async function indentifyUser(req, res, next) {
     const token = req.cookies.token
    
      if (!token) {
        return res.status(401).json({
          message:"token is invalid or misssing"
        })
      }
    
      let decoded;
    
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        return res.status(401).json({
          message:"unauthorized access token is misssing or invalid"
        })
    }
    
    req.user = decoded;

    next();
    
}

module.exports = indentifyUser