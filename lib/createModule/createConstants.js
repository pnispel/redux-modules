'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConstants = undefined;

var _ramda = require('ramda');

var _camelCase = require('camel-case');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _generateConstants = function _generateConstants(generatedConstants, transformation) {
  var formattedConstant = transformation.formattedConstant;
  var action = transformation.action;

  var camelizedActionName = (0, _camelCase2.default)(action);

  generatedConstants[camelizedActionName] = formattedConstant;
  return generatedConstants;
};

var createConstants = exports.createConstants = function createConstants(transformations) {
  return (0, _ramda.reduce)(_generateConstants, {}, transformations);
};

exports.default = createConstants;