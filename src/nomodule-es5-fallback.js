function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Happy = function Happy() {
  "use strict";

  var _this = this;

  _classCallCheck(this, Happy);

  _defineProperty(this, "init", function () {
    _this.removeBySelector('.happy-radio');

    _this.removeBySelector('.happy-checkbox');

    _this.initRadio();

    _this.initCheckbox();
  });

  _defineProperty(this, "reset", function () {
    _this.init();
  });

  _defineProperty(this, "addColorToInput", function (input, happyInput, classString) {
    if (input.classList.contains(classString)) {
      happyInput.classList.add(classString);
    }

    if (input.classList.contains(classString + '-border')) {
      happyInput.classList.add(classString + '-border');
    }
  });

  _defineProperty(this, "addThinkessToInput", function (input, happyInput) {
    if (input.classList.contains('thin')) {
      happyInput.classList.add('thin');
    }
  });

  _defineProperty(this, "setNames", function (input, happyInput) {
    happyInput.setAttribute('data-name', input.getAttribute('name'));
    var value = input.getAttribute('value');

    if (value !== 'undefined' && value !== false && value !== null) {
      happyInput.setAttribute('data-value', input.getAttribute('value'));
    }
  });

  _defineProperty(this, "removeBySelector", function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  });

  _defineProperty(this, "initRadio", function () {
    document.querySelectorAll('input[type=radio].happy').forEach(function (input) {
      /**
       * Paste happy component into html
       */
      input.insertAdjacentHTML('afterend', _this.templates.radio);
      var happyInput = input.nextElementSibling;
      /**
       * Add optional colors
       */

      _this.colors.forEach(function (color) {
        _this.addColorToInput(input, happyInput, color);

        _this.setNames(input, happyInput);
      });

      _this.addThinkessToInput(input, happyInput);
      /**
       * Init state
       */


      _this.checkRadioState(input);
      /**
       * Set aciton functionality for native change
       */


      document.addEventListener('change', _this.radioOnChange);
    });
  });

  _defineProperty(this, "initCheckbox", function () {
    document.querySelectorAll('input[type=checkbox].happy').forEach(function (input) {
      /**
       * Paste happy component into html
       */
      input.insertAdjacentHTML('afterend', _this.templates.checkbox);
      var happyInput = input.nextElementSibling;
      /**
       * Add optional colors
       */

      _this.colors.forEach(function (color) {
        _this.addColorToInput(input, happyInput, color);

        _this.setNames(input, happyInput);
      });

      _this.addThinkessToInput(input, happyInput);
      /**
       * Init state
       */


      _this.checkCheckboxState(input);
      /**
       * Set action functionality for click || native change
       */


      document.addEventListener('click', _this.checkCheckboxStateOnClick);
      document.addEventListener('change', _this.checkCheckboxStateOnChange);
    });
  });

  _defineProperty(this, "checkCheckboxStateOnClick", function (event) {
    var happyInput;

    if (event.target.tagName === 'svg') {
      happyInput = event.target.parentNode;
    } else if (event.target.tagName === 'rect') {
      happyInput = event.target.parentNode.parentNode;
    } else {
      happyInput = event.target;
    }

    if (!happyInput || !happyInput.classList.contains('happy-checkbox')) {
      return;
    }

    event.preventDefault();
    var selector = 'input[type=checkbox][name="' + happyInput.getAttribute('data-name') + '"]';
    var value = happyInput.getAttribute('data-value');

    if (_typeof(value != 'undefined') && value != false && value != null) {
      selector += '[value="' + value + '"]';
    }

    var input = document.querySelector(selector);

    if (input) {
      if (happyInput.classList.contains('active')) {
        input.checked = false;
        happyInput.classList.remove('active');
      } else {
        input.checked = true;
        happyInput.classList.add('active');
      }

      if (window.navigator.userAgent.indexOf("MSIE ")) {
        event = document.createEvent('Event');
        event.initEvent('change', true, true);
      } else {
        event = new Event('change', {
          'bubbles': true
        });
      }

      input.dispatchEvent(event);
    }
  });

  _defineProperty(this, "checkCheckboxStateOnChange", function (event) {
    if (event.target.classList.contains('happy')) {
      _this.checkCheckboxState(event.target);
    }
  });

  _defineProperty(this, "checkRadioState", function (input) {
    if (input.checked) {
      var name = input.getAttribute('name');
      var value = input.getAttribute('value');
      var selector = '.happy-radio[data-name="' + name + '"][data-value="' + value + '"]';
      var happyRadio = document.querySelector(selector);

      if (happyRadio) {
        happyRadio.classList.add('active');
      }
    }
  });

  _defineProperty(this, "checkCheckboxState", function (input) {
    var selector = '.happy-checkbox[data-name="' + input.getAttribute('name') + '"]';
    var value = input.getAttribute('value');

    if (_typeof(value != 'undefined') && value != false && value != null) {
      selector += '[data-value="' + value + '"]';
    }

    var element = document.querySelector(selector);

    if (element) {
      if (input.checked) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  });

  _defineProperty(this, "radioOnChange", function (event) {
    if (!event.target.classList.contains('happy')) {
      return;
    }

    var name = event.target.getAttribute('name');
    var selector = '.happy-radio[data-name="' + name + '"]';
    document.querySelectorAll(selector).forEach(function (happyRadio) {
      happyRadio.classList.remove('active');
    });

    _this.checkRadioState(event.target);
  });

  this.colors = ['primary', 'success', 'info', 'warning', 'danger', 'white', 'gray'];
  this.templates = {
    radio: '<div class="happy-radio"><b></b></div>',
    checkbox: '<div class="happy-checkbox"><svg viewBox="0 0 30 30"><rect class="mark-storke" x="15" y="3" rx="1" ry="1" width="10" height="4"/><rect class="mark-storke" x="-7" y="21" rx="1" ry="1" width="19" height="4"/></svg></div>',
    text: '',
    textarea: ''
  };
};
