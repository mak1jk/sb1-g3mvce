import { rateLimit } from 'rate-limiter-flexible';
import { Redis } from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis(process.env.REDIS_URL);

const rateLimiter = new rateLimit({
  storeClient: redis,
  points: 100, // Number of points
  duration: 60, // Per 60 seconds
  blockDuration: 60 * 15 // Block for 15 minutes
});

export async function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({
      message: 'Too many requests. Please try again later.'
    });
  }
}