'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModule = undefined;

var _ramda = require('ramda');

var _createActions = require('./createActions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createConstants = require('./createConstants');

var _createConstants2 = _interopRequireDefault(_createConstants);

var _formatConstants = require('./formatConstants');

var _formatConstants2 = _interopRequireDefault(_formatConstants);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _generateReduxComponents = function _generateReduxComponents(name, initialState) {
  return function (transformations) {
    var generated = {
      name: name,
      actions: (0, _createActions2.default)(transformations),
      reducer: (0, _createReducer2.default)(initialState, transformations),
      constants: (0, _createConstants2.default)(transformations)
    };

    return generated;
  };
};

var createModule = exports.createModule = function createModule(_ref) {
  var name = _ref.name;
  var transformations = _ref.transformations;
  var _ref$initialState = _ref.initialState;
  var initialState = _ref$initialState === undefined ? (0, _immutable.Map)() : _ref$initialState;

  var generated = (0, _ramda.compose)(_generateReduxComponents(name, initialState), (0, _formatConstants2.default)(name))(transformations);

  return generated;
};

exports.default = createModule;