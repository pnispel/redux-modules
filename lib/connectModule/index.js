'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectModule = undefined;

var _ramda = require('ramda');

var _connectModule2 = require('./connectModule');

var _connectModule3 = _interopRequireDefault(_connectModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectModule = exports.connectModule = function connectModule(selector, module, Component) {
  var actions = module.actions;
  var namespace = module.name;


  var ConnectedComponent = (0, _connectModule3.default)({
    namespace: namespace,
    actions: actions,
    selector: selector
  }, Component);

  return ConnectedComponent;
};

exports.default = (0, _ramda.curry)(connectModule);