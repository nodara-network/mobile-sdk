// Shims for specific Node.js modules that cause issues

// Create mock implementations for modules that can't be polyfilled
const mockCrypto = {
  createHash: () => ({ update: () => {}, digest: () => '' }),
  createHmac: () => ({ update: () => {}, digest: () => '' }),
  randomBytes: (size) => new Uint8Array(size),
  pbkdf2: () => {},
  pbkdf2Sync: () => new Uint8Array(32),
  createCipher: () => ({ update: () => '', final: () => '' }),
  createDecipher: () => ({ update: () => '', final: () => '' }),
};

const mockUtil = {
  deprecate: (fn) => fn,
  inherits: () => {},
  promisify: (fn) => fn,
  isBuffer: () => false,
  isString: () => false,
  isObject: () => false,
  isFunction: () => false,
};

const mockZlib = {
  deflate: () => {},
  deflateSync: () => new Uint8Array(),
  inflate: () => {},
  inflateSync: () => new Uint8Array(),
  gzip: () => {},
  gzipSync: () => new Uint8Array(),
  gunzip: () => {},
  gunzipSync: () => new Uint8Array(),
  constants: {},
};

// Only define if not already defined
if (typeof require !== 'undefined') {
  try {
    require.cache = require.cache || {};
    
    // Mock the problematic modules
    require.cache['crypto'] = { exports: mockCrypto };
    require.cache['util'] = { exports: mockUtil };
    require.cache['zlib'] = { exports: mockZlib };
  } catch (e) {
    // Ignore errors
  }
}

export { mockCrypto as crypto, mockUtil as util, mockZlib as zlib };