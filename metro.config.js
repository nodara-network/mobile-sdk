const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configure resolver for Node.js polyfills
config.resolver.alias = {
  crypto: "crypto-browserify",
  stream: "stream-browserify",
  util: "util",
  zlib: "browserify-zlib",
  path: "path-browserify",
  os: "os-browserify/browser",
  url: "url",
  querystring: "querystring-es3",
  http: "stream-http",
  https: "https-browserify",
  process: "process/browser",
  events: "events",
  buffer: "buffer",
  assert: "assert",
  constants: "constants-browserify",
  domain: "domain-browser",
  punycode: "punycode",
  string_decoder: "string_decoder",
  sys: "util",
  timers: "timers-browserify",
  tty: "tty-browserify",
  vm: "vm-browserify",
};

// Prioritize React Native resolution
config.resolver.resolverMainFields = ["react-native", "browser", "main"];
config.resolver.platforms = ["ios", "android", "web"];

// Add node modules that should be excluded
config.resolver.blockList = [/node_modules\/jose\/dist\/node\/.*/];

module.exports = config;
