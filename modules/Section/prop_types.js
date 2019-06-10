

Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.default = function (eventsNames) {
  for (const eventName in eventsNames) {
    reactIScrollPropTypes[eventName] = _propTypes.func;
  }

  return reactIScrollPropTypes;
};

var _propTypes = require('prop-types');

const errMsg = function errMsg(props, propName, componentName, msgContinuation) {
  return `Invalid prop '${propName}' of value '${props[propName]}' supplied to '${componentName}'${msgContinuation}`;
};

const iScrollPropType = function iScrollPropType(props, propName, componentName) {
  const iScroll = props[propName];
  const proto = iScroll && iScroll.prototype;

  if (!iScroll || !proto || !proto.version || !proto.scrollTo) {
    return new Error(errMsg(props, propName, componentName, ', expected a iScroll object'));
  }

  if (Number(proto.version.split('.')[0]) !== 5) {
    console.warn(`${componentName}: different version than 5.x.y of iScroll is required. Some features won't work properly.`);
  }

  if (props.options && props.options.zoom && !proto.zoom) {
    console.warn(`${componentName}: options.zoom is set, but iscroll-zoom version is not required. Zoom feature won't work properly.`);
  }
};

const elementOrSelectorPropType = function elementOrSelectorPropType(props, propName, componentName) {
  const value = props[propName];

  if (!value || value.nodeType !== 1 || typeof value !== 'string') {
    return new Error(errMsg(props, propName, componentName, ', expected a DOM element or a selector'));
  }
};

const shrinkPropType = (0, _propTypes.oneOf)([false, 'clip', 'scale']);

const indicatorPropType = (0, _propTypes.shape)({
  el: elementOrSelectorPropType,
  fade: _propTypes.bool,
  ignoreBoundaries: _propTypes.bool,
  interactive: _propTypes.bool,
  listenX: _propTypes.bool,
  listenY: _propTypes.bool,
  resize: _propTypes.bool,
  shrink: shrinkPropType,
  speedRatioX: _propTypes.number,
  speedRatioY: _propTypes.number,
});

const stringOrNumberPropType = (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]);

const iScrollOptionsPropType = (0, _propTypes.shape)({
  // Basic options
  useTransform: _propTypes.bool,
  useTransition: _propTypes.bool,
  HWCompositing: _propTypes.bool,
  bounce: _propTypes.bool,
  click: _propTypes.bool,
  disableMouse: _propTypes.bool,
  disablePointer: _propTypes.bool,
  disableTouch: _propTypes.bool,
  eventPassthrough: (0, _propTypes.oneOf)([true, false, 'horizontal']),
  freeScroll: _propTypes.bool,
  keyBindings: (0, _propTypes.oneOfType)([_propTypes.bool, (0, _propTypes.shape)({
    pageUp: stringOrNumberPropType,
    pageDown: stringOrNumberPropType,
    end: stringOrNumberPropType,
    home: stringOrNumberPropType,
    left: stringOrNumberPropType,
    up: stringOrNumberPropType,
    right: stringOrNumberPropType,
    down: stringOrNumberPropType,
  })]),
  invertWheelDirection: _propTypes.bool,
  momentum: _propTypes.bool,
  mouseWheel: _propTypes.bool,
  preventDefault: _propTypes.bool,
  scrollX: _propTypes.bool,
  scrollY: _propTypes.bool,
  startX: _propTypes.number,
  startY: _propTypes.number,
  tap: (0, _propTypes.oneOfType)([_propTypes.bool, _propTypes.string]),

  // Scrollbars
  scrollbars: (0, _propTypes.oneOf)([true, false, 'custom']),
  fadeScrollbars: _propTypes.bool,
  interactiveScrollbars: _propTypes.bool,
  resizeScrollbars: _propTypes.bool,
  shrinkScrollbars: shrinkPropType,

  // Indicators
  indicators: (0, _propTypes.oneOfType)([indicatorPropType, (0, _propTypes.arrayOf)(indicatorPropType)]),

  // Snap
  snap: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.bool]),

  // Zoom
  zoom: _propTypes.bool,
  zoomMax: _propTypes.number,
  zoomMin: _propTypes.number,
  zoomStart: _propTypes.number,
  wheelAction: (0, _propTypes.oneOf)(['zoom']),

  // Advanced
  bindToWrapper: _propTypes.bool,
  bounceEasing: (0, _propTypes.oneOfType)([(0, _propTypes.oneOf)(['quadratic', 'circular', 'back', 'bounce', 'elastic']), (0, _propTypes.shape)({
    style: _propTypes.string,
    fn: _propTypes.func,
  })]),
  bounceTime: _propTypes.number,
  deceleration: _propTypes.number,
  mouseWheelSpeed: _propTypes.number,
  preventDefaultException: (0, _propTypes.shape)({
    className: (0, _propTypes.instanceOf)(RegExp),
    tagName: (0, _propTypes.instanceOf)(RegExp),
  }),
  resizePolling: _propTypes.number,

  // Probe version (onScroll event)
  probeType: (0, _propTypes.oneOf)([1, 2, 3]),
});

// Generate propTypes with event function validating
var reactIScrollPropTypes = {
  defer: (0, _propTypes.oneOfType)([_propTypes.bool, _propTypes.number]),
  iScroll: iScrollPropType,
  onInitialize: _propTypes.func,
  onDestroy: _propTypes.func,
  onRefresh: _propTypes.func,
  options: iScrollOptionsPropType,
};
