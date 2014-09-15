# Jade Browser

[![Jade Browser build status](https://travis-ci.org/qualitybath/jade-client-middleware.png)](https://travis-ci.org/qualitybath/jade-client-middleware)


  Middleware for express/connect to expose jade templates to the web browser. It provides a few additional features like express-like render function with partial handling.
  
```javascript
var express = require('express')
  , jade_client_middleware = require('jade-client-middleware')
  , app = express.createServer();
  
app.use(jade_client_middleware(url_endpoint, template_dir, options));
```

or for Express.js v3.x:

```javascript
var express = require('express')
  , jade_client_middleware = require('jade-client-middleware')
  , app = express();
  
app.use(jade_client_middleware(url_endpoint, template_dir, options));
```

## Installation

    $ npm install jade-client-middleware
  
## Features

  * Jade templates are served as compiled functions.
    * removes browser compatibility issues
    * increases speed of template execution
    * reduces file transfer size
  * ability to minify output
  * option to attach cache control
  * provides helpers for handling rendering/partials just like express.
  * relative path handling even from within partials.
  * ability to completely namespace to avoid any naming collisions on the browser.
  * partials inherit parent locals

## Usage

### In Node.js

 jade-client-middleware is simple to use.

```javascript
var express = require('express')
  , jade_client_middleware = require('jade-client-middleware')
  , app = express.createServer();

app.use(jade_client_middleware('/js/templates.js', '**', options));
```

### Params

  - `filename`  The filename of the resulting compiled templates file
  - `patterns`  A single string or array of patterns used to glob for template files
  - `options`   Options object, see below (optional)

#### Options

  - `root`      The root of the views (default: __dirname)
  - `minify`    Minifies the output (default: false)
  - `maxAge`    Time in seconds to cache the results (default: 86400)
  - `noCache`   Recompiles the output on every request (default: false)
  
### Browser

```javascript
jade.render('path/to/template', { values: for_template });
```
    
For direct access (for templates that have no need for partials).

Note: With render '.jade' extension is not required.

## Credits

This project is largely based off of [jade-browser](https://github.com/storify/jade-browser) with parts taken from [clientjade](https://github.com/jgallen23/clientjade). This project differs from jade-browser in that it works against the latest version of jade which has much better support for client compilation.
 
### Running Tests

In order to run the tests which are in `test` folder, you will need:

* Node.js
* NPM

With those installed, running `npm install` and ''npm test'' will run the tests.

    
## License 

(The MIT License)

Copyright (c) 2009-2011 Storify &lt;info@storify.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
