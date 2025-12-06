// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized. Token missing." });
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired." });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized." });
  if (req.user.role !== role)
    return res.status(403).json({ message: "Forbidden: insufficient role." });
  next();
};
