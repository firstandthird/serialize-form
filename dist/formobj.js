(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SerializeForm = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormObj = function () {
  function FormObj(form) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[name]';

    _classCallCheck(this, FormObj);

    if (!form || !form.tagName || form.tagName !== 'FORM') {
      throw new Error('Must pass in a form element');
    }

    if (typeof selector !== 'string') {
      throw new Error('Invalid selector');
    }

    this.form = form;
    this.selector = selector;
  }

  _createClass(FormObj, [{
    key: 'getInputs',
    value: function getInputs() {
      return this.form.querySelectorAll(this.selector);
    }
  }, {
    key: 'getJSON',
    value: function getJSON() {
      var output = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getInputs()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;

          var name = input.getAttribute('name');
          var value = void 0;

          if (input.type === 'checkbox') {
            value = input.checked;
          } else if (input.type === 'radio') {
            if (input.checked) {
              value = input.value;
            } else {
              continue;
            }
          } else if (input.tagName === 'SELECT' && input.multiple) {
            value = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = input.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var option = _step2.value;

                if (option.selected) {
                  value.push(option.value);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else {
            value = input.value;
          }

          // Radio will have multiple matching `name` attributes and we don't want them all.
          if (typeof output[name] !== 'undefined' && input.type !== 'radio') {
            if (Array.isArray(output[name])) {
              output[name].push(value);
            } else {
              output[name] = [output[name], value];
            }
          } else {
            output[name] = value;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return output;
    }
  }, {
    key: 'deserialize',
    value: function deserialize(data) {
      var index = {};

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getInputs()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var input = _step3.value;

          var name = input.getAttribute('name');
          var val = data[name];

          if (typeof index[name] === 'undefined') {
            index[name] = 0;
          } else {
            index[name] = index[name] + 1;
          }

          if (Array.isArray(val) && input.tagName !== 'SELECT' && !input.multiple) {
            val = val[index[name]];
          }

          if (typeof val === 'undefined') {
            continue;
          }

          if (input.type === 'checkbox' && val === true) {
            input.checked = true;
          } else if (input.type === 'radio' && input.value === val) {
            input.checked = true;
          } else if (input.tagName === 'SELECT') {
            var v = val;

            if (!Array.isArray(val)) {
              v = [val];
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = input.options[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var option = _step4.value;

                if (v.indexOf(option.value) !== -1) {
                  option.selected = true;
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          } else {
            input.value = val;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }]);

  return FormObj;
}();

exports.default = FormObj;

},{}]},{},[1])(1)
});