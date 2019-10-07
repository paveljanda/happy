# Happy components

See [demo](http://happy.paveljanda.com)

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
		import Happy from './node_modules/happy-inputs/src/Happy.js';

		Happy.init();
	</script>
</head>
<body>
	<!-- Default - black -->
	<label>
		<input class="happy" type="radio" name="animal" value="dog"> A dog
	</label>

	<!-- Colored (as you are used to from Bootstrap) -->
	<input class="happy primary">
</body>
</html>
```
