# browserify-jide-template

A Browserify transform for [jide.js](http://js.jidesoft.com) templates.

Starting with version `1.0.0-beta3`, jide.js has full for Browserify. This transform will take care of transforming jide.js templates into Browserify modules. It is required if you intend to use `is` bindings (upgrading elements to jide.js Controls) within your application.

## Install

```
$ npm install browserify-jide-template
```

## Usage

### Command Line

Bundle up all required modules, including AMD modules and jide.js templates into a single file using browserify with the deamdify and browserify-jide-template transform.

```
browserify -t 'browserify-jide-template,deamdify' main.js -o bundle.js
```

### API

```javascript
var browserify = require('browserify');
var fs = require('fs');

var b = browserify('main.js');
b.transform('browserify-jide-template');
b.transform('deamdify');

b.bundle().pipe(fs.createWriteStream('bundle.js'));
```

### Gulp

```javascript
var gulp = require('gulp'),
	browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	gulp.src('./app/main.js')
		.pipe(browserify({
			transform: ['browserify-jide-template', 'deamdify']
		}))
		.pipe(gulp.dest('./build'));
});
```