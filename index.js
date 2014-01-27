var transformTools = require('browserify-transform-tools'),
	cheerio = require('cheerio'),
	options = { includeExtensions: ['.html'] };

module.exports = transformTools.makeStringTransform(
	'browserify-jide-template', options,
	function(content, transformOptions, done) {
		var $ = cheerio.load(content),
			requirements = [];

		$('[bind]').each(function() {
			var bindAttribute = $(this).attr('bind'),
				match = bindAttribute.match(/is\s*:\s*('|")([^'"]+)\1/);
			if(match) {
				requirements.push(match[2]);
			}
		});

		var output = [
			"var $bind = require('jide/ui/bind');",
			"module.exports = '", transformTemplate(content), "';",
			requirements.map(transformRequire).join("\n")
		].join('');

		done(null, output);
	});

var counter = 0;
function transformRequire(requirement) {
	return [
		"var dependency_", ++counter, " = require('", requirement, "');",
		"$bind.registerComponentAlias('", requirement, "', dependency_", counter, ");"
	].join('');
}

function transformTemplate(content) {
	return content.replace(/\n|\r/g, '').replace(/'/g, "\\'");
}