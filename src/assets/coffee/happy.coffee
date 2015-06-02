class Happy

	constructor: () ->
		@colors = ['primary', 'success', 'info', 'warning', 'danger', 'white']
		@templates = {
			radio: '<div class="happy-radio"><b></b></div>',
			checkbox: '<div class="happy-checkbox">
									<svg viewBox="0 0 30 30">
										<rect class="mark-storke" x="15" y="3" rx="1" ry="1" width="10" height="4"/>
										<rect class="mark-storke" x="-7" y="21" rx="1" ry="1" width="19" height="4"/>
									</svg>
								</div>',
			text: '',
			textarea: ''
		}

	# Add some colors
	colorify: (_input, radio, c) ->
		if _input.hasClass(c)
			radio.addClass(c)

	setNames: (_input, radio) ->
		###console.log(radio)###
		radio.attr('data-name', _input.attr('name'))

		if typeof(_input.attr('value') != 'undefined') and _input.attr('value') != false
			radio.attr('data-value', _input.attr('value'))


	init: ->
		@initLables()
		@initRadio()
		@initCheckbox()

	reset: ->
		$('.happy-radio').remove()
		$('.happy-checkbox').remove()
		$('label').unbind('click')

		@init()

	initLables: ->
		$('label:not(.selectable), .noselect').on('selectstart', ->
			return false
		)

	initRadio: ->
		$('input[type=radio].happy').each (index, _input) =>
			# Paste happy-component into html
			radio = $(@templates.radio).insertAfter($(_input))
			_input = $(_input)

			# Add optional colors
			for c in @colors
				@colorify(_input, radio, c)
				@setNames(_input, radio)

			###_input.focus -> radio.addClass('focus')
			_input.blur -> radio.removeClass('focus')###

			# Init state
			@checkRadioState(_input)



			# Set aciton functionality for native change
			_input.change =>
				$('.happy-radio[data-name='+_input.attr('name')+']').removeClass('active')
				@checkRadioState(_input)

			# Set aciton functionality for custom click
			radio.click ->
				if !radio.hasClass('active')
					_i = $('input[type=radio][name='+radio.data('name')+'][value='+radio.data('value')+']')
					_i.prop('checked', true)
					_i.trigger("change")

	checkRadioState: (_input) ->
		if _input.prop('checked')
			$('.happy-radio[data-name='+_input.attr('name')+'][data-value='+_input.attr('value')+']').addClass('active')

	initCheckbox: ->
		$('input[type=checkbox].happy').each (index, _input) =>
			# Paste happy-component into html
			checkbox = $(@templates.checkbox).insertAfter($(_input))
			_input = $(_input)

			# Add optional colors
			for c in @colors
				@colorify(_input, checkbox, c)
				@setNames(_input, checkbox)

			###_input.focus -> checkbox.addClass('focus')
			_input.blur -> checkbox.removeClass('focus')###

			# Init state
			@checkCheckboxState(_input)

			# Set aciton functionality for native change
			_input.change (e) =>
				@checkCheckboxState(_input)

			# Set action functionality for custom click
			checkbox.click (e) ->
				if checkbox.hasClass('active')
					$('input[type=checkbox][name='+checkbox.data('name')+']').prop('checked', true)
					checkbox.removeClass('active')
				else
					$('input[type=checkbox][name='+checkbox.data('name')+']').prop('checked', false)
					checkbox.addClass('active')

			if _input.prop('checked')
				$('.happy-checkbox[data-name='+_input.attr('name')+']').addClass('active')

	checkCheckboxState: (_input) ->
		if _input.prop('checked')
			$('.happy-checkbox[data-name='+_input.attr('name')+']').addClass('active')
		else
			$('.happy-checkbox[data-name='+_input.attr('name')+']').removeClass('active')

$ ->
	window.happy = new Happy()
	window.happy.init()
