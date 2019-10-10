export default class Happy {
	constructor() {
		this.colors = ['primary', 'success', 'info', 'warning', 'danger', 'white', 'gray']
		this.templates = {
			radio: '<div class="happy-radio"><b></b></div>',
			checkbox: '<div class="happy-checkbox"><svg viewBox="0 0 30 30"><rect class="mark-storke" x="15" y="3" rx="1" ry="1" width="10" height="4"/><rect class="mark-storke" x="-7" y="21" rx="1" ry="1" width="19" height="4"/></svg></div>',
			text: '',
			textarea: ''
		}
	}

	init = () => {
		this.removeBySelector('.happy-radio');
		this.removeBySelector('.happy-checkbox');

		this.initRadio();
		this.initCheckbox();
	}

	/**
	 * Back compatibility
	 */
	reset = () => {
		this.init();
	}

	addColorToInput = (input, happyInput, classString) => {
		if (input.classList.contains(classString)) {
			happyInput.classList.add(classString);
		}

		if (input.classList.contains(classString + '-border')) {
			happyInput.classList.add(classString + '-border');
		}
	}

	addThinkessToInput = (input, happyInput) => {
		if (input.classList.contains('thin')) {
			happyInput.classList.add('thin');
		}
	}

	setNames = (input, happyInput) => {
		happyInput.setAttribute('data-name', input.getAttribute('name'));

		var value = input.getAttribute('value');

		if (value !== 'undefined' && value !== false && value !== null) {
			happyInput.setAttribute('data-value', input.getAttribute('value'));
		}
	}

	removeBySelector = (selector) => {
		document.querySelectorAll(selector).forEach(function(el) {
			el.parentNode.removeChild(el);
		});
	}


	initRadio = () => {
		document.querySelectorAll('input[type=radio].happy').forEach((input) => {
			/**
			 * Paste happy component into html
			 */
			input.insertAdjacentHTML('afterend', this.templates.radio);
			var happyInput = input.nextElementSibling;

			/**
			 * Add optional colors
			 */
			this.colors.forEach((color) => {
				this.addColorToInput(input, happyInput, color);
				this.setNames(input, happyInput);
			});

			this.addThinkessToInput(input, happyInput);

			/**
			 * Init state
			 */
			this.checkRadioState(input);

			/**
			 * Set aciton functionality for native change
			 */
			document.addEventListener('change', this.radioOnChange);
		});
	}

	initCheckbox = () => {
		document.querySelectorAll('input[type=checkbox].happy').forEach((input) => {
			/**
			 * Paste happy component into html
			 */
			input.insertAdjacentHTML('afterend', this.templates.checkbox);
			var happyInput = input.nextElementSibling

			/**
			 * Add optional colors
			 */
			this.colors.forEach((color) => {
				this.addColorToInput(input, happyInput, color);
				this.setNames(input, happyInput);
			});

			this.addThinkessToInput(input, happyInput);

			/**
			 * Init state
			 */
			this.checkCheckboxState(input);

			/**
			 * Set action functionality for click || native change
			 */
			document.addEventListener('click', this.checkCheckboxStateOnClick);
			document.addEventListener('change', this.checkCheckboxStateOnChange);
		});
	}


	checkCheckboxStateOnClick = (event) => {
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

		if (typeof(value != 'undefined') && value != false && value != null) {
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
				event = document.createEvent('Event')
				event.initEvent('change', true, true);
			} else {
				event = new Event('change', {'bubbles': true});
			}

			input.dispatchEvent(event);
		}
	}

	checkCheckboxStateOnChange = (event) => {
		if (event.target.classList.contains('happy')) {
			this.checkCheckboxState(event.target);
		}
	}

	checkRadioState = (input) => {
		if (input.checked) {
			var name = input.getAttribute('name');
			var value = input.getAttribute('value');
			var selector = '.happy-radio[data-name="' + name + '"][data-value="' + value + '"]';

			var happyRadio = document.querySelector(selector);

			if (happyRadio) {
				happyRadio.classList.add('active');
			}
		}
	}

	checkCheckboxState = (input) => {
		var selector = '.happy-checkbox[data-name="' + input.getAttribute('name') + '"]';

		var value = input.getAttribute('value');

		if (typeof(value != 'undefined') && value != false && value != null) {
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
	}

	radioOnChange = (event) => {
		if (!event.target.classList.contains('happy')) {
			return;
		}

		var name = event.target.getAttribute('name');
		var selector = '.happy-radio[data-name="' + name + '"]';

		document.querySelectorAll(selector).forEach(function(happyRadio) {
			happyRadio.classList.remove('active');
		});

		this.checkRadioState(event.target);
	}
}
