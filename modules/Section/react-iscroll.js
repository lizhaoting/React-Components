/*eslint-disable */

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _reactDom = require('react-dom');

const _reactDom2 = _interopRequireDefault(_reactDom);

const _deepEqual = require('deep-equal');

const _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const excludePropNames = ['defer', 'iScroll', 'onRefresh', 'options'];

// Events available on iScroll instance
// {`react component event name`: `iScroll event name`}
const availableEventNames = {};
const iScrollEventNames = ['beforeScrollStart', 'scrollCancel', 'scrollStart', 'scroll', 'scrollEnd', 'flick', 'zoomStart', 'zoomEnd'];

for (let i = 0, len = iScrollEventNames.length; i < len; i++) {
  const iScrollEventName = iScrollEventNames[i];
  const reactEventName = `on${iScrollEventName[0].toUpperCase()}${iScrollEventName.slice(1)}`;
  availableEventNames[reactEventName] = iScrollEventName;
  excludePropNames.push(reactEventName);
}

const ReactIScroll = (function (_React$Component) {
  _inherits(ReactIScroll, _React$Component);

  function ReactIScroll(props) {
    _classCallCheck(this, ReactIScroll);

    const _this = _possibleConstructorReturn(this, (ReactIScroll.__proto__ || Object.getPrototypeOf(ReactIScroll)).call(this, props));

    _this._isMounted = false;
    _this._initializeTimeout = null;
    _this._queuedCallbacks = [];
    _this._iScrollBindedEvents = {};
    return _this;
  }

  _createClass(ReactIScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
      this._initializeIScroll();
    },
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
      this._teardownIScroll();
    },

    // There is no state, we can compare only props.

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextContext) {
      return !(0, _deepEqual2.default)(this.props, nextProps) || !(0, _deepEqual2.default)(this.context, nextContext);
    },

    // Check if iScroll options has changed and recreate instance with new one

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      const _this2 = this;

      // If options are same, iScroll behaviour will not change. Just refresh events and trigger refresh
      if ((0, _deepEqual2.default)(prevProps.options, this.props.options)) {
        this._updateIScrollEvents(prevProps, this.props);
        this.refresh();

        // If options changed, we will destroy iScroll instance and create new one with same scroll position
        // TODO test if this will work with indicators
      } else {
        this.withIScroll(true, (iScrollInstance) => {
          // Save current state
          let x = iScrollInstance.x,
            y = iScrollInstance.y,
            scale = iScrollInstance.scale;

          // Destroy current and Create new instance of iScroll

          _this2._teardownIScroll();
          _this2._initializeIScroll();

          _this2.withIScroll(true, (newIScrollInstance) => {
            // Restore previous state
            if (scale && newIScrollInstance.zoom) {
              newIScrollInstance.zoom(scale, 0, 0, 0);
            }

            newIScrollInstance.scrollTo(x, y);
          });
        });
      }
    },
  }, {
    key: 'getIScroll',
    value: function getIScroll() {
      return this._iScrollInstance;
    },
  }, {
    key: 'getIScrollInstance',
    value: function getIScrollInstance() {
      console.warn("Function 'getIScrollInstance' is deprecated. Instead use 'getIScroll'");
      return this._iScrollInstance;
    },
  }, {
    key: 'withIScroll',
    value: function withIScroll(waitForInit, callback) {
      if (!callback && typeof waitForInit === 'function') {
        callback = waitForInit;
      }

      if (this.getIScroll()) {
        callback(this.getIScroll());
      } else if (waitForInit === true) {
        this._queuedCallbacks.push(callback);
      }
    },
  }, {
    key: 'refresh',
    value: function refresh() {
      this.withIScroll(iScrollInstance => iScrollInstance.refresh());
    },
  }, {
    key: '_performInitializeIScroll',
    value: function _performInitializeIScroll() {
      const _this3 = this;

      let _props = this.props,
        iScroll = _props.iScroll,
        options = _props.options;

      // Create iScroll instance with given options

      const iScrollInstance = new iScroll(_reactDom2.default.findDOMNode(this), options);
      this._iScrollInstance = iScrollInstance;

      this._triggerInitializeEvent(iScrollInstance);

      // Patch iScroll instance .refresh() function to trigger our onRefresh event
      iScrollInstance.originalRefresh = iScrollInstance.refresh;

      iScrollInstance.refresh = function () {
        iScrollInstance.originalRefresh.apply(iScrollInstance);
        _this3._triggerRefreshEvent(iScrollInstance);
      };

      // Bind iScroll events
      this._bindIScrollEvents();

      this._callQueuedCallbacks();
    },
  }, {
    key: '_initializeIScroll',
    value: function _initializeIScroll() {
      const _this4 = this;

      if (this._isMounted === false) {
        return;
      }

      const defer = this.props.defer;


      if (defer === false) {
        this._performInitializeIScroll();
      } else {
        const timeout = defer === true ? 0 : defer;
        this._initializeTimeout = setTimeout(() => _this4._performInitializeIScroll(), timeout);
      }
    },
  }, {
    key: '_callQueuedCallbacks',
    value: function _callQueuedCallbacks() {
      let callbacks = this._queuedCallbacks,
        len = callbacks.length;

      this._queuedCallbacks = [];

      for (let _i = 0; _i < len; _i++) {
        callbacks[_i](this.getIScroll());
      }
    },
  }, {
    key: '_teardownIScroll',
    value: function _teardownIScroll() {
      this._clearInitializeTimeout();

      if (this._iScrollInstance) {
        this._iScrollInstance.destroy();
        this._triggerDestroyEvent(this._iScrollInstance);
        this._iScrollInstance = undefined;
      }

      this._iScrollBindedEvents = {};
      this._queuedCallbacks = [];
    },
  }, {
    key: '_clearInitializeTimeout',
    value: function _clearInitializeTimeout() {
      if (this._initializeTimeout !== null) {
        clearTimeout(this._initializeTimeout);
        this._initializeTimeout = null;
      }
    },
  }, {
    key: '_bindIScrollEvents',
    value: function _bindIScrollEvents() {
      // Bind events on iScroll instance
      this._iScrollBindedEvents = {};
      this._updateIScrollEvents({}, this.props);
    },

    // Iterate through available events and update one by one

  }, {
    key: '_updateIScrollEvents',
    value: function _updateIScrollEvents(prevProps, nextProps) {
      for (const _reactEventName in availableEventNames) {
        this._updateIScrollEvent(availableEventNames[_reactEventName], prevProps[_reactEventName], nextProps[_reactEventName]);
      }
    },

    // Unbind and/or Bind event if it was changed during update

  }, {
    key: '_updateIScrollEvent',
    value: function _updateIScrollEvent(iScrollEventName, prevPropEvent, currentPropEvent) {
      if (prevPropEvent !== currentPropEvent) {
        const currentEvents = this._iScrollBindedEvents;

        this.withIScroll(true, (iScrollInstance) => {
          if (typeof prevPropEvent === 'function') {
            iScrollInstance.off(iScrollEventName, currentEvents[iScrollEventName]);
            currentEvents[iScrollEventName] = undefined;
          }

          if (typeof currentPropEvent === 'function') {
            const wrappedCallback = function wrappedCallback() {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              currentPropEvent(...[iScrollInstance].concat(args));
            };

            iScrollInstance.on(iScrollEventName, wrappedCallback);
            currentEvents[iScrollEventName] = wrappedCallback;
          }
        });
      }
    },
  }, {
    key: '_triggerInitializeEvent',
    value: function _triggerInitializeEvent(iScrollInstance) {
      const onInitialize = this.props.onInitialize;

      if (typeof onInitialize === 'function') {
        onInitialize(iScrollInstance);
      }
    },
  }, {
    key: '_triggerRefreshEvent',
    value: function _triggerRefreshEvent(iScrollInstance) {
      const onRefresh = this.props.onRefresh;

      if (typeof onRefresh === 'function') {
        onRefresh(iScrollInstance);
      }
    },
  }, {
    key: '_triggerDestroyEvent',
    value: function _triggerDestroyEvent(iScrollInstance) {
      const onDestroy = this.props.onDestroy;

      if (typeof onDestroy === 'function') {
        onDestroy(iScrollInstance);
      }
    },
  }, {
    key: 'render',
    value: function render() {
      // Keep only non ReactIScroll properties
      const props = {};

      for (const prop in this.props) {
        if (!~excludePropNames.indexOf(prop)) {
          props[prop] = this.props[prop];
        }
      }

      return _react2.default.createElement('div', props);
    },
  }]);

  return ReactIScroll;
}(_react2.default.Component));

ReactIScroll.displayName = 'ReactIScroll';
ReactIScroll.defaultProps = {
  defer: true,
  options: {},
  style: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
};
exports.default = ReactIScroll;


if (process.env.NODE_ENV !== 'production') {
  const propTypesMaker = require('./prop_types').default;
  ReactIScroll.propTypes = propTypesMaker(availableEventNames);
}
