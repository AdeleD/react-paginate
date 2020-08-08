'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PageView = _interopRequireDefault(require("./PageView"));

var _BreakView = _interopRequireDefault(require("./BreakView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PaginationBoxView = /*#__PURE__*/function (_Component) {
  _inherits(PaginationBoxView, _Component);

  var _super = _createSuper(PaginationBoxView);

  function PaginationBoxView(props) {
    var _this;

    _classCallCheck(this, PaginationBoxView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handlePreviousPage", function (evt) {
      var selected = _this.state.selected;
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (selected > 0) {
        _this.handlePageSelected(selected - 1, evt);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNextPage", function (evt) {
      var selected = _this.state.selected;
      var pageCount = _this.props.pageCount;
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (selected < pageCount - 1) {
        _this.handlePageSelected(selected + 1, evt);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePageSelected", function (selected, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (_this.state.selected === selected) return;

      _this.setState({
        selected: selected
      }); // Call the callback with the new selected item:


      _this.callCallback(selected);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBreakClick", function (index, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      var selected = _this.state.selected;

      _this.handlePageSelected(selected < index ? _this.getForwardJump() : _this.getBackwardJump(), evt);
    });

    _defineProperty(_assertThisInitialized(_this), "callCallback", function (selectedItem) {
      if (typeof _this.props.onPageChange !== 'undefined' && typeof _this.props.onPageChange === 'function') {
        _this.props.onPageChange({
          selected: selectedItem
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "pagination", function () {
      var items = [];
      var _this$props = _this.props,
          pageRangeDisplayed = _this$props.pageRangeDisplayed,
          pageCount = _this$props.pageCount,
          marginPagesDisplayed = _this$props.marginPagesDisplayed,
          breakLabel = _this$props.breakLabel,
          breakClassName = _this$props.breakClassName,
          breakLinkClassName = _this$props.breakLinkClassName;
      var selected = _this.state.selected;

      if (pageCount <= pageRangeDisplayed) {
        for (var index = 0; index < pageCount; index++) {
          items.push(_this.getPageElement(index));
        }
      } else {
        var leftSide = pageRangeDisplayed / 2;
        var rightSide = pageRangeDisplayed - leftSide; // If the selected page index is on the default right side of the pagination,
        // we consider that the new right side is made up of it (= only one break element).
        // If the selected page index is on the default left side of the pagination,
        // we consider that the new left side is made up of it (= only one break element).

        if (selected > pageCount - pageRangeDisplayed / 2) {
          rightSide = pageCount - selected;
          leftSide = pageRangeDisplayed - rightSide;
        } else if (selected < pageRangeDisplayed / 2) {
          leftSide = selected;
          rightSide = pageRangeDisplayed - leftSide;
        }

        var _index;

        var page;
        var breakView;

        var createPageView = function createPageView(index) {
          return _this.getPageElement(index);
        };

        for (_index = 0; _index < pageCount; _index++) {
          page = _index + 1; // If the page index is lower than the margin defined,
          // the page has to be displayed on the left side of
          // the pagination.

          if (page <= marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          } // If the page index is greater than the page count
          // minus the margin defined, the page has to be
          // displayed on the right side of the pagination.


          if (page > pageCount - marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          } // If the page index is near the selected page index
          // and inside the defined range (pageRangeDisplayed)
          // we have to display it (it will create the center
          // part of the pagination).


          if (_index >= selected - leftSide && _index <= selected + rightSide) {
            items.push(createPageView(_index));
            continue;
          } // If the page index doesn't meet any of the conditions above,
          // we check if the last item of the current "items" array
          // is a break element. If not, we add a break element, else,
          // we do nothing (because we don't want to display the page).


          if (breakLabel && items[items.length - 1] !== breakView) {
            breakView = /*#__PURE__*/_react["default"].createElement(_BreakView["default"], {
              key: _index,
              breakLabel: breakLabel,
              breakClassName: breakClassName,
              breakLinkClassName: breakLinkClassName,
              onClick: _this.handleBreakClick.bind(null, _index)
            });
            items.push(breakView);
          }
        }
      }

      return items;
    });

    var initialSelected;

    if (props.initialPage) {
      initialSelected = props.initialPage;
    } else if (props.forcePage) {
      initialSelected = props.forcePage;
    } else {
      initialSelected = 0;
    }

    _this.state = {
      selected: initialSelected
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          initialPage = _this$props2.initialPage,
          disableInitialCallback = _this$props2.disableInitialCallback,
          extraAriaContext = _this$props2.extraAriaContext; // Call the callback with the initialPage item:

      if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
        this.callCallback(initialPage);
      }

      if (extraAriaContext) {
        console.warn('DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (typeof this.props.forcePage !== 'undefined' && this.props.forcePage !== prevProps.forcePage) {
        this.setState({
          selected: this.props.forcePage
        });
      }
    }
  }, {
    key: "getForwardJump",
    value: function getForwardJump() {
      var selected = this.state.selected;
      var _this$props3 = this.props,
          pageCount = _this$props3.pageCount,
          pageRangeDisplayed = _this$props3.pageRangeDisplayed;
      var forwardJump = selected + pageRangeDisplayed;
      return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
    }
  }, {
    key: "getBackwardJump",
    value: function getBackwardJump() {
      var selected = this.state.selected;
      var pageRangeDisplayed = this.props.pageRangeDisplayed;
      var backwardJump = selected - pageRangeDisplayed;
      return backwardJump < 0 ? 0 : backwardJump;
    }
  }, {
    key: "hrefBuilder",
    value: function hrefBuilder(pageIndex) {
      var _this$props4 = this.props,
          hrefBuilder = _this$props4.hrefBuilder,
          pageCount = _this$props4.pageCount;

      if (hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < pageCount) {
        return hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: "ariaLabelBuilder",
    value: function ariaLabelBuilder(pageIndex) {
      var selected = pageIndex === this.state.selected;

      if (this.props.ariaLabelBuilder && pageIndex >= 0 && pageIndex < this.props.pageCount) {
        var label = this.props.ariaLabelBuilder(pageIndex + 1, selected); // DEPRECATED: The extraAriaContext prop was used to add additional context
        // to the aria-label. Users should now use the ariaLabelBuilder instead.

        if (this.props.extraAriaContext && !selected) {
          label = label + ' ' + this.props.extraAriaContext;
        }

        return label;
      }
    }
  }, {
    key: "getPageElement",
    value: function getPageElement(index) {
      var selected = this.state.selected;
      var _this$props5 = this.props,
          pageClassName = _this$props5.pageClassName,
          pageLinkClassName = _this$props5.pageLinkClassName,
          activeClassName = _this$props5.activeClassName,
          activeLinkClassName = _this$props5.activeLinkClassName,
          extraAriaContext = _this$props5.extraAriaContext;
      return /*#__PURE__*/_react["default"].createElement(_PageView["default"], {
        key: index,
        onClick: this.handlePageSelected.bind(null, index),
        selected: selected === index,
        pageClassName: pageClassName,
        pageLinkClassName: pageLinkClassName,
        activeClassName: activeClassName,
        activeLinkClassName: activeLinkClassName,
        extraAriaContext: extraAriaContext,
        href: this.hrefBuilder(index),
        ariaLabel: this.ariaLabelBuilder(index),
        page: index + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          disabledClassName = _this$props6.disabledClassName,
          pageCount = _this$props6.pageCount,
          containerClassName = _this$props6.containerClassName,
          previousLabel = _this$props6.previousLabel,
          previousClassName = _this$props6.previousClassName,
          previousLinkClassName = _this$props6.previousLinkClassName,
          previousAriaLabel = _this$props6.previousAriaLabel,
          nextLabel = _this$props6.nextLabel,
          nextClassName = _this$props6.nextClassName,
          nextLinkClassName = _this$props6.nextLinkClassName,
          nextAriaLabel = _this$props6.nextAriaLabel;
      var selected = this.state.selected;
      var previousClasses = previousClassName + (selected === 0 ? " ".concat(disabledClassName) : '');
      var nextClasses = nextClassName + (selected === pageCount - 1 ? " ".concat(disabledClassName) : '');
      var previousAriaDisabled = selected === 0 ? 'true' : 'false';
      var nextAriaDisabled = selected === pageCount - 1 ? 'true' : 'false';
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: containerClassName
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: previousClasses
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.handlePreviousPage,
        className: previousLinkClassName,
        href: this.hrefBuilder(selected - 1),
        tabIndex: "0",
        role: "button",
        onKeyPress: this.handlePreviousPage,
        "aria-disabled": previousAriaDisabled,
        "aria-label": previousAriaLabel
      }, previousLabel)), this.pagination(), /*#__PURE__*/_react["default"].createElement("li", {
        className: nextClasses
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.handleNextPage,
        className: nextLinkClassName,
        href: this.hrefBuilder(selected + 1),
        tabIndex: "0",
        role: "button",
        onKeyPress: this.handleNextPage,
        "aria-disabled": nextAriaDisabled,
        "aria-label": nextAriaLabel
      }, nextLabel)));
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

exports["default"] = PaginationBoxView;

_defineProperty(PaginationBoxView, "propTypes", {
  pageCount: _propTypes["default"].number.isRequired,
  pageRangeDisplayed: _propTypes["default"].number.isRequired,
  marginPagesDisplayed: _propTypes["default"].number.isRequired,
  previousLabel: _propTypes["default"].node,
  previousAriaLabel: _propTypes["default"].string,
  nextLabel: _propTypes["default"].node,
  nextAriaLabel: _propTypes["default"].string,
  breakLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  hrefBuilder: _propTypes["default"].func,
  onPageChange: _propTypes["default"].func,
  initialPage: _propTypes["default"].number,
  forcePage: _propTypes["default"].number,
  disableInitialCallback: _propTypes["default"].bool,
  containerClassName: _propTypes["default"].string,
  pageClassName: _propTypes["default"].string,
  pageLinkClassName: _propTypes["default"].string,
  activeClassName: _propTypes["default"].string,
  activeLinkClassName: _propTypes["default"].string,
  previousClassName: _propTypes["default"].string,
  nextClassName: _propTypes["default"].string,
  previousLinkClassName: _propTypes["default"].string,
  nextLinkClassName: _propTypes["default"].string,
  disabledClassName: _propTypes["default"].string,
  breakClassName: _propTypes["default"].string,
  breakLinkClassName: _propTypes["default"].string,
  extraAriaContext: _propTypes["default"].string,
  ariaLabelBuilder: _propTypes["default"].func
});

_defineProperty(PaginationBoxView, "defaultProps", {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: 'selected',
  previousLabel: 'Previous',
  previousClassName: 'previous',
  previousAriaLabel: 'Previous page',
  nextLabel: 'Next',
  nextClassName: 'next',
  nextAriaLabel: 'Next page',
  breakLabel: '...',
  disabledClassName: 'disabled',
  disableInitialCallback: false
});
//# sourceMappingURL=PaginationBoxView.js.map