var through = require('through2');
var reactTools = require('react-tools');
var assign = require('object-assign');
var gutil = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function(options) {

    options = assign({
        harmony: false,
        stripTypes: false
    }, options);

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-jsx', 'Streaming not supported'));
        }

        var str = file.contents.toString();
        file.contents = new Buffer(reactTools.transform(str, options));
        file.path = gutil.replaceExtension(file.path, '.js');
        cb(null, file);
    });
};