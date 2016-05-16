'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var _ramda = require('ramda');

var _camelCase = require('camel-case');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _propchecker = require('./propchecker');

var _propchecker2 = _interopRequireDefault(_propchecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var onError = function onError(msg) {
  return function (err) {
    console.error('Warning: Failed ' + msg + ':', err);
  };
};

var payloadPipeline = function payloadPipeline() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (payload) {
    (0, _propchecker2.default)(_extends({
      onError: onError('payloadType')
    }, args))(payload);

    return payload;
  };
};

var metaPipeline = function metaPipeline(_ref) {
  var propTypes = _ref.propTypes;

  var args = _objectWithoutProperties(_ref, ['propTypes']);

  if (!propTypes) return;

  return function (payload) {
    (0, _propchecker2.default)(_extends({
      onError: onError('metaType'),
      propTypes: propTypes
    }, args))(payload.meta);

    return payload.meta;
  };
};

var _generateActions = function _generateActions(generatedActions, transformation) {
  var action = transformation.action;
  var _transformation$paylo = transformation.payloadTypes;
  var payloadTypes = _transformation$paylo === undefined ? {} : _transformation$paylo;
  var metaTypes = transformation.metaTypes;
  var actionName = transformation.formattedConstant;

  var camelizedActionName = (0, _camelCase2.default)(action);

  generatedActions[camelizedActionName] = (0, _reduxActions.createAction)(actionName, payloadPipeline({ actionName: actionName, propTypes: payloadTypes }), metaPipeline({ actionName: actionName, propTypes: metaTypes }));

  return generatedActions;
};

var createActions = exports.createActions = function createActions(transformations) {
  return (0, _ramda.reduce)(_generateActions, {}, transformations);
};

exports.default = createActions;