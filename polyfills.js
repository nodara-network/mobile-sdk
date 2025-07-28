// Polyfills for React Native
import 'react-native-polyfill-globals/auto';
import 'react-native-get-random-values';

// Buffer polyfill
global.Buffer = require('buffer').Buffer;

// Process polyfill
global.process = require('process');

// Define Node.js globals that are missing in React Native
global.global = global;

// Polyfill for crypto
if (typeof global.crypto === 'undefined') {
  global.crypto = require('crypto-browserify');
}

// Text encoding polyfill
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('fast-text-encoding');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Additional polyfills for Node.js modules
global.util = require('util');
global.stream = require('stream-browserify');
global.zlib = require('browserify-zlib');
global.path = require('path-browserify');
global.os = require('os-browserify/browser');
global.url = require('url');
global.querystring = require('querystring-es3');
global.events = require('events');
global.assert = require('assert');
global.constants = require('constants-browserify');
global.domain = require('domain-browser');
global.punycode = require('punycode');
global.string_decoder = require('string_decoder');
global.timers = require('timers-browserify');
global.tty = require('tty-browserify');
global.vm = require('vm-browserify');