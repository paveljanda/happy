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
	colorify: (input, happy_input, class_string) ->
		if input.classList.contains(class_string)
			happy_input.classList.add(class_string)

	setNames: (input, happy_input) ->
		happy_input.setAttribute('data-name', input.getAttribute('name'))

		if typeof(input.getAttribute('value') != 'undefined') and input.getAttribute('value') != false
			happy_input.setAttribute('data-value', input.getAttribute('value'))


	init: ->
		@initRadio()
		#@initCheckbox()

	removeBySelector: (s) ->
		elements = document.querySelectorAll(s)
		for	el in elements
			el.parentNode.removeChild(el)

	reset: ->
		@removeBySelector('.happy-radio')
		@removeBySelector('.happy-checkbox')

		@init()

	initRadio: ->
		inputs = document.querySelectorAll('input[type=radio].happy')
		for input in inputs
			# Paste happy-component into html
			input.insertAdjacentHTML('afterend', @templates.radio)
			happy_input = input.nextElementSibling

			# Add optional colors
			for c in @colors
				@colorify(input, happy_input, c)
				@setNames(input, happy_input)

			# Init state
			@checkRadioState(input)

			# Set aciton functionality for native change
			input.addEventListener('change', @radioOnChange)

	radioOnChange: (e) =>
		target_input = e.target
		name = target_input.getAttribute('name')
		selector = '.happy-radio[data-name='+name+']'

		happy_radios = document.querySelectorAll(selector)

		for happy_radio in happy_radios
			happy_radio.classList.remove('active')

		@checkRadioState(target_input)

	checkRadioState: (input) ->
		if input.checked
			name = input.getAttribute('name')
			value = input.getAttribute('value')
			selector = '.happy-radio[data-name='+name+'][data-value='+value+']'

			happy_radio = document.querySelector(selector)
			#console.log(name, value)
			if happy_radio
				happy_radio.classList.add('active')

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
