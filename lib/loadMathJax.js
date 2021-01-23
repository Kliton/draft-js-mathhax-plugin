'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadScript = require('load-script');

var DEFAULT_SCRIPT = 'https://cdn.mathjax.org/mathjax/latest/MathJax.js';

var DEFAULT_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/CommonHTML'],
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js']
  },
  messageStyles: 'none',
  showProcessingMessages: false,
  showMathMenu: false,
  showMathMenuMSIE: false,
  preview: 'none',
  tex2jax: {
    // inlineMath: [],
    preview: 'none',
    processEnvironments: false
  },
  delayStartupTypeset: true
};

var loadMathJax = function loadMathJax() {
  var script = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SCRIPT;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPTIONS;

  if (window.MathJax) {
    window.MathJax.Hub.Config(options);
    return;
  }
  loadScript(script, function () {
    window.MathJax.Hub.Config(options);
  });
};

exports.default = loadMathJax;