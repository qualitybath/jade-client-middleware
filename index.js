var fs = require('fs'),
    path = require('path'),
    jade = require('jade'),
    async = require('async'),
    glob = require('glob'),
    parser = require('uglify-js').parser,
    compiler = require('uglify-js').uglify;

function toRegExp(str, begin, end){
  return ((begin) ? '^' : '') +
  str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') +
  ((end) ? '$' : '');
}

module.exports = function(exportPath, patterns, options){
  options = options || {};
  exportPath = exportPath.replace(/\/$/,'');

  var ext = options.ext || 'jade',
      namespace = options.namespace || 'jade',
      built = false,
      noCache = options.noCache || false,
      debug = options.debug || false,
      minify = options.minify || false,
      maxAge = options.maxAge || 86400,
      root = path.normalize(options.root ? options.root.replace(/\/$/,'') : path.join(__dirname, '..', '..')),
      regexp = toRegExp(exportPath, true),
      headers = {
          'Cache-Control': 'public, max-age=' + maxAge,
          'Content-Type': 'text/javascript'
      };

  var runtime = fs.readFileSync(require.resolve('jade/runtime'), 'utf8');
  var render = fs.readFileSync(path.join(__dirname, 'render.js'), 'utf8');

  return function(req, res, next){
    if (!req.url.match(regexp)) {
       return next();
    }
    
    if (built && !noCache) {
      res.writeHead(200, headers);
      res.end(built);
      return;
    }
    
    if (typeof patterns == 'string') {
      patterns = [patterns];
    }
    
    var files = [];
    patterns.forEach(function(pattern) {
      pattern = path.join(root, pattern);
      try {
        var matches = glob.sync(pattern);
        matches = matches.filter(function(match) {
          return match.match(ext + '$');
        });
        files = files.concat(matches);
      } catch(e) {}
    });

    async.map(files, getTemplate, expose);

    function getTemplate(filename, cb) {
      fs.readFile(filename, 'utf8', function(err, content){
        if (err) {
          return cb(err);
        }

        var tmpl = jade.compileClient(content, {
            filename: filename,
            compileDebug: false
        });

        var basename = filename.replace(root+'/', '');
        tmpl = tmpl.replace(/function template/, 'jade.templates["'+basename+'"] = function');
        
        return cb(null, tmpl);
      });
    }

    function expose(e, results) {
      built = runtime + '\n\n' + render + '\n\n' + results.join('\n\n');

      if (minify) {
        var code = parser.parse(built);
        code = compiler.ast_mangle(code);
        code = compiler.ast_squeeze(code);
        built = compiler.gen_code(code);
      }

      res.writeHead(200, headers);
      res.end(built);
    }
    
  };
};
