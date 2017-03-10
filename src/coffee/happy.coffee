class Happy

	constructor: () ->
		@colors = ['primary', 'success', 'info', 'warning', 'danger', 'white', 'gray']
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

		if input.classList.contains(class_string + '-border')
			happy_input.classList.add(class_string + '-border')

	# Set thickness
	thicknessify: (input, happy_input) ->
		if input.classList.contains('thin')
			happy_input.classList.add('thin')


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

			@thicknessify(input, happy_input)

			# Init state
			@checkRadioState(input)

			# Set aciton functionality for native change
			# input.addEventListener('change', @radioOnChange)
			document.addEventListener('change', @radioOnChange)

	radioOnChange: (e) =>
		target_input = e.target

		if !target_input.classList.contains('happy')
			return

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
			selector = '.happy-radio[data-name="'+name+'"][data-value="'+value+'"]'

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

			@thicknessify(input, happy_input)

			# Init state
			@checkCheckboxState(input)

			# Set action functionality for click || native change
			document.addEventListener('click', @checkCheckboxStateOnClick)
			document.addEventListener('change', @checkCheckboxStateOnChange)

	checkCheckboxStateOnClick: (e) =>
		if e.target.tagName == 'svg'
			happy_input = e.target.parentNode
		else if e.target.tagName == 'rect'
			happy_input = e.target.parentNode.parentNode
		else
			happy_input = e.target

		if !happy_input or !happy_input.classList.contains('happy-checkbox')
			return

		e.preventDefault()

		selector = 'input[type=checkbox][name="'+happy_input.getAttribute('data-name')+'"]'
		value = happy_input.getAttribute('data-value')
		if typeof(value != 'undefined') and value != false and value != null
			selector += '[value="' + value + '"]'
		input = document.querySelector(selector)

		if input
			if happy_input.classList.contains('active')
				input.checked = false
				happy_input.classList.remove('active')
			else
				input.checked = true
				happy_input.classList.add('active')

			ie = window.navigator.userAgent.indexOf("MSIE ")

			if ie
				event = document.createEvent('Event')
				event.initEvent('change', true, true)
			else
				event = new Event('change', {'bubbles': true})

			input.dispatchEvent(event)

	checkCheckboxStateOnChange: (e) =>
		if e.target.classList.contains('happy')
			input = e.target
			@checkCheckboxState(input)

	checkCheckboxState: (input) =>
		selector = '.happy-checkbox[data-name="'+input.getAttribute('name')+'"]'
		value = input.getAttribute('value')
		if typeof(value != 'undefined') and value != false and value != null
			selector += '[data-value="' + value + '"]'
		element = document.querySelector(selector)

		if element
			if input.checked
				element.classList.add('active')
			else
				element.classList.remove('active')


document.addEventListener 'DOMContentLoaded', ->
	window.happy = new Happy()
	window.happy.init()
