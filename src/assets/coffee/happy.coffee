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

		value = input.getAttribute('value')

		if typeof(value != 'undefined') and value != false and value != null
			happy_input.setAttribute('data-value', input.getAttribute('value'))


	init: ->
		@initRadio()
		@initCheckbox()

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
		selector = '.happy-radio[data-name="'+name+'"]'

		happy_radios = document.querySelectorAll(selector)

		for happy_radio in happy_radios
			happy_radio.classList.remove('active')

		@checkRadioState(target_input)

	checkRadioState: (input) ->
		if input.checked
			name = input.getAttribute('name')
			value = input.getAttribute('value')
			selector = '.happy-radio[data-name="'+name+'""][data-value='+value+']'

			happy_radio = document.querySelector(selector)

			if happy_radio
				happy_radio.classList.add('active')

	initCheckbox: ->
		inputs = document.querySelectorAll('input[type=checkbox].happy')
		for input in inputs
			# Paste happy-component into html
			input.insertAdjacentHTML('afterend', @templates.checkbox)
			happy_input = input.nextElementSibling

			# Add optional colors
			for c in @colors
				@colorify(input, happy_input, c)
				@setNames(input, happy_input)

			# Init state
			@checkCheckboxState(input)

			# Set action functionality for click || native change
			happy_input.addEventListener('click', @checkCheckboxStateOnClick)
			input.addEventListener('change', @checkCheckboxStateOnChange)

	checkCheckboxStateOnClick: (e) =>
		e.preventDefault()

		if e.target.tagName == 'svg'
			happy_input = e.target.parentNode
		else if e.target.tagName == 'rect'
			happy_input = e.target.parentNode.parentNode
		else
			happy_input = e.target
		
		selector = 'input[type=checkbox][name="'+happy_input.getAttribute('data-name')+'"]'
		input = document.querySelector(selector)

		if input
			if happy_input.classList.contains('active')
				input.checked = false
				happy_input.classList.remove('active')
			else
				input.checked = true
				happy_input.classList.add('active')

	checkCheckboxStateOnChange: (e) =>
		input = e.target
		@checkCheckboxState(input)

	checkCheckboxState: (input) =>
		selector = '.happy-checkbox[data-name="'+input.getAttribute('name')+'"]'
		element = document.querySelector(selector)

		if element
			if input.checked
				element.classList.add('active')
			else
				element.classList.remove('active')


document.addEventListener 'DOMContentLoaded', ->
	window.happy = new Happy()
	window.happy.init()
