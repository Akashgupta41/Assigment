import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token =  req.cookies.token ||  req.header('Authorization').replace(/^Bearer\s+/, '');
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export const checkRole = (role) => {
  return (req, res, next) => {
    
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
