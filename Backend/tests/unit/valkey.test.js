const { get, setEx, del, connect, client, ioClient } = require('../../config/valkey.js');
const cleanup = require('../setup/valkeyCleanup');

afterEach(cleanup);
const logger = require('../../config/logger.js');
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');

// Mock redis client
jest.mock('redis', () => ({
  createClient: jest.fn(() => {
    const redisClient = {
      connect: jest.fn().mockImplementation(function () {
        this.isOpen = true;
        return Promise.resolve();
      }),
      quit: jest.fn().mockImplementation(function () {
        this.isOpen = false;
        return Promise.resolve();
      }),
      isOpen: false,
      on: jest.fn(),
      get: jest.fn(),
      setEx: jest.fn(),
      del: jest.fn(),
      sAdd: jest.fn(),
      sRem: jest.fn(),
    };
    return redisClient;
  }),
}));

// Mock ioredis client
jest.mock('ioredis', () => jest.fn(() => {
  const ioRedisClient = {
    connect: jest.fn().mockImplementation(function () {
      this.status = 'ready';
      return Promise.resolve();
    }),
    quit: jest.fn().mockImplementation(function () {
      this.status = 'end';
      return Promise.resolve();
    }),
    status: 'connect',
    on: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
  };
  return ioRedisClient;
}));

// Mock logger
jest.mock('../../config/logger.js', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

describe('Valkey Config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    client.isOpen = false;
    ioClient.status = 'connect';
  });

  afterEach(async () => {
    if (client.isOpen) {
      await client.quit();
    }
    if (ioClient.status === 'ready') {
      await ioClient.quit();
    }
  });

  it('should connect to Valkey using node-redis and ioredis', async () => {
    await connect();
    expect(client.connect).toHaveBeenCalled();
    expect(ioClient.connect).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Valkey connection established (node-redis)');
    expect(logger.info).toHaveBeenCalledWith('Valkey connection established (ioredis)');
    expect(client.isOpen).toBe(true);
    expect(ioClient.status).toBe('ready');
  });

  it('should not reconnect if already connected', async () => {
    client.isOpen = true;
    ioClient.status = 'ready';
    await connect();
    expect(client.connect).not.toHaveBeenCalled();
    expect(ioClient.connect).not.toHaveBeenCalled();
  });

  it('should handle connection failure', async () => {
    const error = new Error('Connection failed');
    client.connect.mockRejectedValue(error);
    await expect(connect()).rejects.toThrow('Connection failed');
    expect(logger.error).toHaveBeenCalledWith('Valkey connection failed (node-redis): Connection failed');
  });

  it('should get a value from Valkey', async () => {
    const key = 'test:key';
    const value = { data: 'test' };
    client.get.mockResolvedValue(JSON.stringify(value));
    const result = await get(key);
    expect(result).toEqual(value);
    expect(client.get).toHaveBeenCalledWith(key);
  });

  it('should return null for non-existent key', async () => {
    const key = 'test:missing';
    client.get.mockResolvedValue(null);
    const result = await get(key);
    expect(result).toBeNull();
    expect(client.get).toHaveBeenCalledWith(key);
  });

  it('should handle get error', async () => {
    const key = 'test:key';
    const error = new Error('Get failed');
    client.get.mockRejectedValue(error);
    await expect(get(key)).rejects.toThrow('Get failed');
    expect(logger.error).toHaveBeenCalledWith(`Get ${key} failed: Get failed`);
  });

  it('should set a value with TTL', async () => {
    const key = 'test:key';
    const ttl = 3600;
    const value = { data: 'test' };
    client.setEx.mockResolvedValue('OK');
    client.sAdd.mockResolvedValue(1);
    await setEx(key, ttl, value);
    expect(client.setEx).toHaveBeenCalledWith(key, ttl, JSON.stringify(value));
    expect(client.sAdd).toHaveBeenCalledWith('cache:keys', key);
  });

  it('should handle setEx error', async () => {
    const key = 'test:key';
    const ttl = 3600;
    const value = { data: 'test' };
    const error = new Error('Set failed');
    client.setEx.mockRejectedValue(error);
    await expect(setEx(key, ttl, value)).rejects.toThrow('Set failed');
    expect(logger.error).toHaveBeenCalledWith(`SetEx ${key} failed: Set failed`);
  });

  it('should handle sAdd error in setEx', async () => {
    const key = 'test:key';
    const ttl = 3600;
    const value = { data: 'test' };
    client.setEx.mockResolvedValue('OK');
    const error = new Error('sAdd failed');
    client.sAdd.mockRejectedValue(error);
    await expect(setEx(key, ttl, value)).rejects.toThrow('sAdd failed');
    expect(logger.error).toHaveBeenCalledWith(`SetEx ${key} failed: sAdd failed`);
  });

  it('should delete a value', async () => {
    const key = 'test:key';
    client.del.mockResolvedValue(1);
    client.sRem.mockResolvedValue(1);
    await del(key);
    expect(client.del).toHaveBeenCalledWith(key);
    expect(client.sRem).toHaveBeenCalledWith('cache:keys', key);
  });

  it('should handle del error', async () => {
    const key = 'test:key';
    const error = new Error('Delete failed');
    client.del.mockRejectedValue(error);
    await expect(del(key)).rejects.toThrow('Delete failed');
    expect(logger.error).toHaveBeenCalledWith(`Del ${key} failed: Delete failed`);
  });

  it('should handle sRem error in del', async () => {
    const key = 'test:key';
    client.del.mockResolvedValue(1);
    const error = new Error('sRem failed');
    client.sRem.mockRejectedValue(error);
    await expect(del(key)).rejects.toThrow('sRem failed');
    expect(logger.error).toHaveBeenCalledWith(`Del ${key} failed: sRem failed`);
  });

  it('should support Bull queue operations with ioredis', async () => {
    const key = 'bull:test:job';
    const value = { task: 'test' };
    ioClient.set.mockResolvedValue('OK');
    await ioClient.set(key, JSON.stringify(value));
    expect(ioClient.set).toHaveBeenCalledWith(key, JSON.stringify(value));

    ioClient.get.mockResolvedValue(JSON.stringify(value));
    const result = await ioClient.get(key);
    expect(JSON.parse(result)).toEqual(value);
  });
});
