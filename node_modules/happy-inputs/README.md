# Happy components

See [demo](http://paveljanda.github.io/happy/example/)

## Installation

```bash
npm install happy-inputs
```

## Usage

```html
<!DOCTYPE html>
<html>
<head>
	<title>Happy</title>
	<link rel="stylesheet" type="text/css" href="./node_modules/happy-inputs/src/happy.css">

	<script type="module">
		import happy from './node_modules/happy-inputs/src/index.js';

		Happy.init();
	</script>
</head>
<body>
	<!-- Default (black) radio -->
	<label>
		<input class="happy" type="radio" name="animal" value="dog"> A dog
	</label>

	<!-- Default (black) checkbox -->
	<label>
		<input class="happy" type="checkbox" name="hungry"> Hungry
	</label>

	<!-- Colored (as you are used to from Bootstrap) radio -->
	<label>
		<input class="happy success" type="radio" name="animal" value="dog"> A dog
	</label>

	<!-- Colored (as you are used to from Bootstrap) checkbox -->
	<label>
		<input class="happy primary" type="checkbox" name="hungry"> Hungry
	</label>
</body>
</html>
```
