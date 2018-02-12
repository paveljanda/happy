# Happy components

See [demo](http://happy.paveljanda.com)

## Usage

1) Make sure you are using happy components

```html
<link rel="stylesheet" type="text/css" href="src/assets/css/happy.css">
<script type="text/javascript" src="../src/assets/js/happy.js"></script>
```

2) Use them:

* Simple:

```html
<label>
	<input class="happy" type="radio" name="animal" value="dog"> A dog
</label>
```

* Colored (as you are used to from Bootstrap)

```html
<input class="happy primary">
```

3) In case you need to re-init Happy JS, call

```javascript
window.happy.reset();
```
