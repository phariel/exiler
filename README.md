# exiler
An easy&amp;&amp;useful restful-server with node.js

`$ npm install exiler`

### Example:

    var exiler = require("exiler");
    var port = 1080;

    var options = {
	    route: {
	        // url goes to "http://localhost:1080" 
	        // or "http://localhost:1080/"
	        // or "http://localhost:1080/index"
		    index: {
			    ex_data: function () {
				    return {
				    	indexData: "I'm the index"
				    };
			    }
		    },
		    // url goes to "http://localhost:1080/pageaction"
		    // or "http://localhost:1080/pageAction"
		    pageAction: {
			    ex_data: {
				    pageData: "I'm the page"
			    },
			    // page.ejs is just like <h1><%= pageData %></h1>
			    ex_template: "page.ejs"
		    }
	    }
    };

    exiler.server(options, port);
    
`port` should be optional, default to 9527

Using `ex_data` for data fetching and `ex_template` for template fetching.

You should create a new folder named `public` in your app root folder and put all of static files (js, css, etc) into it, and use `http://localhost:1080/public/xxx/xxx.css` url to visit by your static files structure.

You should create a new folder named `template` in your app root folder and put `.ejs` template into it.

If your route goes to:

    page: {
	    ex_data: {
		    pageData: "I'm the page"
	    },
	    ex_template: "page.ejs"
	}

This route should render html page combined with ejs template and data automatically.

### Todo:

Continue to refine code structure.

Implement data dynamic fetching.
