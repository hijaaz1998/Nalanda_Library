import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Autherization denied" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!req.user) {
      req.user = {};
    }
    req.user.id = decoded.userId;
    req.user.role = decoded.role;
    
    next();
  } catch (error) {
   if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "token is expired, login again" });
    }
   console.log(error)
    res.status(500).json({ success: false, message: "Internal srver error" });
  }
};
