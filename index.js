var options = {
  output: 'index.html',
  test: /.html$/,
  title: 'Index',
  templates: {
      header: (title) => {
        return `<!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      html    { margin: 25px; font-family: Calibri,sans-serif; font-size: 62.5%; }
                      body    { color: #333; line-height: 2.8rem; font-size: 1.8rem; font-weight: 400; }
                      H1      { font-size: 2.4rem; font-weight: 700; }
                      a       { color: #05b; text-decoration: none; }
                      a:hover { text-decoration: underline; }
                      ul      { list-style: none; column-width: 300px; margin:0 25px 0 0; padding: 0; }
                    </style>
                  </head>
                  <body>
                    <h1>${title}</h1>
                    <ul>`
      },
      file: (filePath, fileName) => { return `<li><a class="index__item-link" href="${filePath}">${fileName}</a><li>\n` },
      filePath: (filePath) => { return filePath; },
      fileName: (filePath) => {
        filePath = (filePath[0] == '/') ? filePath.substr(1) : filePath;
        return filePath.replace(new RegExp('-', 'g'), ' '); 
      },
      footer: () => { 
        return `</ul>
              </body>
            </html>`
      }
  }
};

function HtmlIndexPagelinksPlugin(userOpt) {
  if(!userOpt) return;
  var templates = options.templates;
  options = Object.assign(options, userOpt);
  options.templates = Object.assign(templates, userOpt.templates);
}

HtmlIndexPagelinksPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    var regex = new RegExp(options.test);

    var html = options.templates.header(options.title);
    var files = Object.getOwnPropertyNames(compilation.assets).sort();
    files.forEach(function (file) {
      if(!regex.test(file)) return;

      var filePath = options.templates.filePath(file),
          fileName = options.templates.fileName(file);
      html += options.templates.file(filePath, fileName);
    });
    html += options.templates.footer();
    
    compilation.assets[options.output] = {
      source: function() { return html; },
      size:   function() { return html.length; }
    };

    callback();
  });
};

module.exports = HtmlIndexPagelinksPlugin;