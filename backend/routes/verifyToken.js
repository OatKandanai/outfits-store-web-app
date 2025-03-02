import jwt from "jsonwebtoken";

// Middleware to verify the token
export function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    // Extract token from "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRETKEY, (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token has expired" });
        }
        return res.status(403).json({ msg: "Token is not valid" });
      }

      // Attach user info to request
      // user = { id: userResponse.id, isAdmin: userResponse.isAdmin }
      req.user = user;

      next();
    });
  } else {
    return res.status(401).json({ msg: "You are not authenticated" });
  }
}

// Middleware to verify user identity or admin role
export function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ msg: "Token verification failed" });
    }

    /* Check if the user is authorized:
    1. The user ID from the token matches the ID in the request parameters (user's own resource).
    2. The user has admin privileges. */
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next(); // Proceed if the user is authorized
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to perform this action" });
    }
  });
}

// Middleware to verify admin role
export function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    // Check if the token payload includes the isAdmin flag
    if (req.user.isAdmin) {
      next(); // Proceed if the user is an admin
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to perform this action" });
    }
  });
}
