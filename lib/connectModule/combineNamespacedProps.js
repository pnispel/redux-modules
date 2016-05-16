'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var combineNamespacedProps = function combineNamespacedProps() {
  var ns = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  return function (mapStateProps, mapDispatchProps, props) {
    var generatedProps = _extends({}, mapStateProps, {
      actions: _extends({}, mapDispatchProps)
    });

    return ns ? _extends(_defineProperty({}, ns, _extends({}, generatedProps)), props) : _extends({}, generatedProps, props);
  };
};

exports.default = combineNamespacedProps;