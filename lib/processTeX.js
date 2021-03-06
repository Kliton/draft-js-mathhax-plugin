"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processTeX;
var pendingScripts = [];
var pendingCallbacks = [];
var needsProcess = false;

function doProcess(MathJax) {
  MathJax.Hub.Queue(function () {
    var oldElementScripts = MathJax.Hub.elementScripts;
    MathJax.Hub.elementScripts = function () {
      return (/* element */pendingScripts
      );
    };

    try {
      return MathJax.Hub.Process(null, function () {
        // Trigger all of the pending callbacks before clearing them
        // out.
        pendingCallbacks.forEach(function (cb) {
          return cb();
        });
        // for (const callback of pendingCallbacks) {
        //   callback()
        // }

        pendingScripts = [];
        pendingCallbacks = [];
        needsProcess = false;
      });
    } catch (e) {
      // IE8 requires `catch` in order to use `finally`
      throw e;
    } finally {
      MathJax.Hub.elementScripts = oldElementScripts;
    }
  });
}

/**
 * Process math in a script node using MathJax
 * @param {MathJax}  MathJax
 * @param {DOMNode}  script
 * @param {Function} callback
 */
function processTeX(MathJax, script, callback) {
  pendingScripts.push(script);
  pendingCallbacks.push(callback);
  if (!needsProcess) {
    needsProcess = true;
    setTimeout(function () {
      return doProcess(MathJax);
    }, 0);
  }
}