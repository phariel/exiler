# exiler
An easy&amp;&amp;useful restful-server with node.js

`$ npm install exiler`

### Example:

    var exiler = require("exiler");
    var port = 1080;

    var options = {
	    route: {
	        // url goes to "http://localhost:1080" or "http://localhost:1080/" or "http://localhost:1080/index"
		    index: {
			    data: function () {
				    return {aaa: 1};
			    }
		    },
		    // url goes to "http://localhost:1080/page"
		    page: {
			    data: {
				    bbb: 2
			    },
			    template: "page.ejs"
		    }
	    }
    };

    exiler.server(options, port);
    
`port` should be optional, default to 9527

You should create a new folder named `public` in your app root folder and put all of static files (js, css, etc) into it, and use `/public/xxx/xxx.css` url to visit by your static files structure.

You should create a new folder named `template` in your app root folder and put `.ejs` template into it.

If your route goes to:

    page: {
	    data: {
		    bbb: 2
	    },
	    template: "page.ejs"
	}

This route should render html page combined with ejs template and data automatically.

### Todo:

Continue to refine code structure.

Using cache functionality instead of reading file directly from disk. 
