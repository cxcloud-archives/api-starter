import { Request, Response, NextFunction } from 'express';

export const attachAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next();
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  res.locals.authToken = token;
  next();
};
