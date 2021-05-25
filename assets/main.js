seajs.config({
    base: "/sea-modules/",
    alias: {
      "jquery": "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
    }
});
seajs.use(['css/animation.css', 'css/stable-content.css', 'css/override.css']);

seajs.use(['animation-extension', 'date-extension', 'common-extension']);
seajs.use(['clock', 'event', 'theme-picker', 'weather']);

