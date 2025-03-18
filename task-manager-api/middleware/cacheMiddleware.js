import redis from 'redis';
import util from 'util';

const redisClient = redis.createClient();
redisClient.get = util.promisify(redisClient.get);

export const cacheTasks = async (req, res, next) => {
    try {
        const { priority, status } = req.query;
        const cacheKey = `tasks:${priority || 'all'}:${status || 'all'}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        next();
    } catch (error) {
        next();
    }
};

export const updateCache = async (key, data) => {
    try {
        await redisClient.setex(key, 3600, JSON.stringify(data));
    } catch (error) {
        console.error('Error updating cache:', error);
    }
};
