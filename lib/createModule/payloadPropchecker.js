'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propCheckedPayloadCreator = undefined;

var _ramda = require('ramda');

var defaultPropCheck = function defaultPropCheck() {
  return {};
};

var propCheckedPayloadCreator = exports.propCheckedPayloadCreator = function propCheckedPayloadCreator(_ref) {
  var actionName = _ref.actionName;
  var payloadTypes = _ref.payloadTypes;
  var onError = _ref.onError;
  return function (payload) {
    var _propCheck = function _propCheck(type) {
      var propChecker = payloadTypes[type] || defaultPropCheck;
      var typeError = propChecker(payload, type, actionName, 'prop') || {};
      var message = typeError.message;


      message && onError(message);
    };

    (0, _ramda.compose)((0, _ramda.forEach)(_propCheck), _ramda.keys)(payloadTypes);

    return payload;
  };
};

exports.default = propCheckedPayloadCreator;