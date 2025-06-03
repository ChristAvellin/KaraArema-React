const valkeyMock = {
  get: jest.fn(),
  setEx: jest.fn(),
  del: jest.fn(),
  connect: jest.fn(),
  client: { isOpen: false },
};

module.exports = valkeyMock;