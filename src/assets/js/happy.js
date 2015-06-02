var Happy;

Happy = (function() {
  function Happy() {
    this.colors = ['primary', 'success', 'info', 'warning', 'danger', 'white'];
    this.templates = {
      radio: '<div class="happy-radio"><b></b></div>',
      checkbox: '<div class="happy-checkbox"> <svg viewBox="0 0 30 30"> <rect class="mark-storke" x="15" y="3" rx="1" ry="1" width="10" height="4"/> <rect class="mark-storke" x="-7" y="21" rx="1" ry="1" width="19" height="4"/> </svg> </div>',
      text: '',
      textarea: ''
    };
  }

  Happy.prototype.colorify = function(_input, radio, c) {
    if (_input.hasClass(c)) {
      return radio.addClass(c);
    }
  };

  Happy.prototype.setNames = function(_input, radio) {

    /*console.log(radio) */
    radio.attr('data-name', _input.attr('name'));
    if (typeof (_input.attr('value') !== 'undefined') && _input.attr('value') !== false) {
      return radio.attr('data-value', _input.attr('value'));
    }
  };

  Happy.prototype.init = function() {
    this.initLables();
    this.initRadio();
    return this.initCheckbox();
  };

  Happy.prototype.reset = function() {
    $('.happy-radio').remove();
    $('.happy-checkbox').remove();
    $('label').unbind('click');
    return this.init();
  };

  Happy.prototype.initLables = function() {
    return $('label:not(.selectable), .noselect').on('selectstart', function() {
      return false;
    });
  };

  Happy.prototype.initRadio = function() {
    return $('input[type=radio].happy').each((function(_this) {
      return function(index, _input) {
        var c, i, len, radio, ref;
        radio = $(_this.templates.radio).insertAfter($(_input));
        _input = $(_input);
        ref = _this.colors;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          _this.colorify(_input, radio, c);
          _this.setNames(_input, radio);
        }

        /*_input.focus -> radio.addClass('focus')
        			_input.blur -> radio.removeClass('focus')
         */
        _this.checkRadioState(_input);
        _input.change(function() {
          $('.happy-radio[data-name=' + _input.attr('name') + ']').removeClass('active');
          return _this.checkRadioState(_input);
        });
        return radio.click(function() {
          var _i;
          if (!radio.hasClass('active')) {
            _i = $('input[type=radio][name=' + radio.data('name') + '][value=' + radio.data('value') + ']');
            _i.prop('checked', true);
            return _i.trigger("change");
          }
        });
      };
    })(this));
  };

  Happy.prototype.checkRadioState = function(_input) {
    if (_input.prop('checked')) {
      return $('.happy-radio[data-name=' + _input.attr('name') + '][data-value=' + _input.attr('value') + ']').addClass('active');
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
