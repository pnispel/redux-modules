'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propCheckedCreator = undefined;

var _ramda = require('ramda');

var defaultPropCheck = function defaultPropCheck() {
  return {};
};

var propCheckedCreator = exports.propCheckedCreator = function propCheckedCreator(_ref) {
  var actionName = _ref.actionName;
  var propTypes = _ref.propTypes;
  var onError = _ref.onError;
  return function (payload) {
    var _propCheck = function _propCheck(type) {
      var propChecker = propTypes[type] || defaultPropCheck;
      var typeError = propChecker(payload, type, actionName, 'prop') || {};
      var message = typeError.message;


      message && onError(message);
    };

    (0, _ramda.compose)((0, _ramda.forEach)(_propCheck), _ramda.keys)(propTypes);
  };
};

exports.default = propCheckedCreator;