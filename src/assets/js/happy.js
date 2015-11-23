var Happy,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Happy = (function() {
  function Happy() {
    this.radioOnChange = bind(this.radioOnChange, this);
    this.colors = ['primary', 'success', 'info', 'warning', 'danger', 'white'];
    this.templates = {
      radio: '<div class="happy-radio"><b></b></div>',
      checkbox: '<div class="happy-checkbox"> <svg viewBox="0 0 30 30"> <rect class="mark-storke" x="15" y="3" rx="1" ry="1" width="10" height="4"/> <rect class="mark-storke" x="-7" y="21" rx="1" ry="1" width="19" height="4"/> </svg> </div>',
      text: '',
      textarea: ''
    };
  }

  Happy.prototype.colorify = function(input, happy_input, class_string) {
    if (input.classList.contains(class_string)) {
      return happy_input.classList.add(class_string);
    }
  };

  Happy.prototype.setNames = function(input, happy_input) {
    happy_input.setAttribute('data-name', input.getAttribute('name'));
    if (typeof (input.getAttribute('value') !== 'undefined') && input.getAttribute('value') !== false) {
      return happy_input.setAttribute('data-value', input.getAttribute('value'));
    }
  };

  Happy.prototype.init = function() {
    return this.initRadio();
  };

  Happy.prototype.removeBySelector = function(s) {
    var el, elements, i, len, results;
    elements = document.querySelectorAll(s);
    results = [];
    for (i = 0, len = elements.length; i < len; i++) {
      el = elements[i];
      results.push(el.parentNode.removeChild(el));
    }
    return results;
  };

  Happy.prototype.reset = function() {
    this.removeBySelector('.happy-radio');
    this.removeBySelector('.happy-checkbox');
    return this.init();
  };

  Happy.prototype.initRadio = function() {
    var c, happy_input, i, input, inputs, j, len, len1, ref, results;
    inputs = document.querySelectorAll('input[type=radio].happy');
    results = [];
    for (i = 0, len = inputs.length; i < len; i++) {
      input = inputs[i];
      input.insertAdjacentHTML('afterend', this.templates.radio);
      happy_input = input.nextElementSibling;
      ref = this.colors;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        c = ref[j];
        this.colorify(input, happy_input, c);
        this.setNames(input, happy_input);
      }
      this.checkRadioState(input);
      results.push(input.addEventListener('change', this.radioOnChange));
    }
    return results;
  };

  Happy.prototype.radioOnChange = function(e) {
    var happy_radio, happy_radios, i, len, name, selector, target_input;
    target_input = e.target;
    name = target_input.getAttribute('name');
    selector = '.happy-radio[data-name=' + name + ']';
    happy_radios = document.querySelectorAll(selector);
    for (i = 0, len = happy_radios.length; i < len; i++) {
      happy_radio = happy_radios[i];
      happy_radio.classList.remove('active');
    }
    return this.checkRadioState(target_input);
  };

  Happy.prototype.checkRadioState = function(input) {
    var happy_radio, name, selector, value;
    if (input.checked) {
      name = input.getAttribute('name');
      value = input.getAttribute('value');
      selector = '.happy-radio[data-name=' + name + '][data-value=' + value + ']';
      happy_radio = document.querySelector(selector);
      if (happy_radio) {
        return happy_radio.classList.add('active');
      }
    }
  };

  Happy.prototype.initCheckbox = function() {
    return $('input[type=checkbox].happy').each((function(_this) {
      return function(index, _input) {
        var c, checkbox, i, len, ref;
        checkbox = $(_this.templates.checkbox).insertAfter($(_input));
        _input = $(_input);
        ref = _this.colors;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          _this.colorify(_input, checkbox, c);
          _this.setNames(_input, checkbox);
        }

        /*_input.focus -> checkbox.addClass('focus')
        			_input.blur -> checkbox.removeClass('focus')
         */
        _this.checkCheckboxState(_input);
        _input.change(function(e) {
          return _this.checkCheckboxState(_input);
        });
        checkbox.click(function(e) {
          if (checkbox.hasClass('active')) {
            $('input[type=checkbox][name=' + checkbox.data('name') + ']').prop('checked', true);
            return checkbox.removeClass('active');
          } else {
            $('input[type=checkbox][name=' + checkbox.data('name') + ']').prop('checked', false);
            return checkbox.addClass('active');
          }
        });
        if (_input.prop('checked')) {
          return $('.happy-checkbox[data-name=' + _input.attr('name') + ']').addClass('active');
        }
      };
    })(this));
  };

  Happy.prototype.checkCheckboxState = function(_input) {
    if (_input.prop('checked')) {
      return $('.happy-checkbox[data-name=' + _input.attr('name') + ']').addClass('active');
    } else {
      return $('.happy-checkbox[data-name=' + _input.attr('name') + ']').removeClass('active');
    }
  };

  return Happy;

})();

$(function() {
  window.happy = new Happy();
  return window.happy.init();
});
