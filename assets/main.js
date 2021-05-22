seajs.config({
    base: "/sea-modules/",
    alias: {
      "jquery": "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
    }
});

seajs.use(['date-extension', 'clock', 'event', 'theme-picker', 'weather']);