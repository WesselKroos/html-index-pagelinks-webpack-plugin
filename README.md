# [Html Index Pagelinks](https://github.com/WesselKroos/html-index-pagelinks-webpack-plugin) plugin for [Webpack](http://webpack.github.io/)

Generates an Index.html (customizable) with a list of links to pages/files in your Webpack project to save time. 
You can fully customize which type, name and/or basepath of pages/files will be included in the list with a regex. Examples: html,htm,js,ts,css,png,jpg,gif,svg,etc..

## Customization

```
output:       //Change the default (index.html) path and name of the destination file
test:         //A regex to decide which files will be in the the list of pages.
title:        //Title of the index.html file
templates: {  //Change the content of the index.html file
    header: '<h1>[title]</h1><ul>',
    file: '<li><a href="[filePath]">[fileName]</a><li>',
    filePath: (filePath) => { return filePath; },
    fileName: (filePath) => { return filePath[0].toUpperCase() + filePath.substr(1); },
    footer: '</ul>'
}
```

## Install:

```bash
$ npm install --save-dev html-index-pagelinks-webpack-plugin
```

## Usage:

Just pass the optional [options](https://github.com/WesselKroos/html-index-pagelinks-webpack-plugin) to the plugin as the first argument.

In your `webpack.config.js`:

```javascript
var HtmlIndexPagelinksPlugin = require('html-index-pagelinks-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    //Add the plugin last
    new HtmlIndexPagelinksPlugin(options)
  ]
}
```

### Options:

In your `webpack.config.js`:

```javascript
module.exports = {
  plugins: [
    new HtmlIndexPagelinksPlugin({
      output: 'path/index.htm', // The path and name of the destination file. 
                                //  Default: 'index.html'

      test: /.html$/,   // A regex to decide which files will be in the the list of pages. 
                        // (Works just like the test rules of Webpack). 
                        //  Default: /.html$/
                        // Examples:
                        //   /.md$/                         Ending with .md
                        //   /^\/Directory1\/Directory2\//  Starting with /Directory1/Directory2/
                        //   /.js$/                         Ending with .js
                        //   /.(html|html)$/                Ending with .html or .htm
                        //   /.(svg|jpg|jpeg|png|gif)$/     Ending with .svg .jpg .jpeg .png or .gif

      title: 'Project title',   // Title of the index.html file. 
                                //  Default: 'Index'

      // Specify custom templates to override the default content of the index.html file
      templates: { 

          // Generates the html before the list
          // If you are creating an html file here you can also add the head tag or styling
          //  Parameters: title
          header: (title) => { return `<h1>${title}</h1><ul>` }, 

          // Generates the html for a link to a file
          //  Parameters: filePath, fileName
          file: (filePath, fileName) => { return `<li><a href="${filePath}">${fileName}</a></li>` },

          // Modifies the filePath in the file template
          //  Parameters: filePath
          filePath: (filePath) => { return filePath; },

          // Modifies the fileName parameter in the file template
          //  Parameters: filePath
          fileName: (filePath) => { return filePath[0].toUpperCase() + filePath.substr(1); },

          // Generates the html after the list
          footer: () => { return `</ul>` }
      }
    })
  ]
}
```

## Feedback & Bugs:

Feel free to [open issues](https://github.com/WesselKroos/html-index-pagelinks-webpack-plugin/issues) to [propose stuff and participate](https://github.com/WesselKroos/html-index-pagelinks-webpack-plugin/issues). [Pull requests](https://github.com/WesselKroos/html-index-pagelinks-webpack-plugin/pulls) are also welcome.

## Licence:

[MIT](http://en.wikipedia.org/wiki/MIT_License)
