// jest.setup.js

const { _client, _ioClient } = require('./config/valkey');

let client;
let ioClient;

// Initialisation avant tous les tests
beforeAll(async () => {
  client = _client?.();
  ioClient = _ioClient?.();
});

// Nettoyage après chaque test
afterEach(async () => {
  // Ici tu pourrais réinitialiser certaines données entre les tests
});

// Fermeture des connexions après tous les tests
afterAll(async () => {
  if (client?.isOpen) {
    await client.quit();
    console.log('[Valkey] Redis client fermé.');
  }

  if (ioClient?.status === 'ready') {
    await ioClient.quit();
    console.log('[Valkey] Redis ioClient fermé.');
  }
});
