module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
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
          },
        },
      ],
    ],
  };
};
