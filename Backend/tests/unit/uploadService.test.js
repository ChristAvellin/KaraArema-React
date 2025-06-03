const uploadService = require('../../services/uploadService');
const jobQueueService = require('../../services/jobQueueService');
jest.mock('../../services/jobQueueService');

describe('uploadService', () => {
  it('should queue upload', () => {
    const req = { body: { title: 'Test', artist: 'Artist', genre: 'Pop' }, file: { path: 'path' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    uploadService.uploadSong(req, res);
    expect(jobQueueService.addToQueue).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(202);
  });
});