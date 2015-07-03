# exiler

[![Build Status](https://travis-ci.org/phariel/exiler.svg?branch=master)](https://travis-ci.org/phariel/exiler)

An easy&amp;&amp;useful restful-server with node.js

`$ npm install exiler`

### Example:

    var exiler = require("exiler");
    var port = 1080;

    var options = {
	    route: {
	        // url goes to "http://mydomain.com:1080" 
	        // or "http://mydomain.com:1080/"
	        // or "http://mydomain.com:1080/index"
		    index: {
			    ex_data: function (resolve) {
				    resolve({
				    	indexData: "I'm the index"
				    });
			    }
		    },
		    // url goes to "http://mydomain.com:1080/pageaction"
		    // or "http://mydomain.com:1080/pageAction"
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

You should create a new folder named `public` in your app root folder and put all of static files (js, css, etc) into it, and use `http://mydomain.com:1080/public/xxx/xxx.css` url to visit by your static files structure.

You should create a new folder named `template` in your app root folder and put `.ejs` template into it.

If your route goes to:

    page: {
	    ex_data: {
		    pageData: "I'm the page"
	    },
	    ex_template: "page.ejs"
	}

This route should render html page combined with ejs template and data automatically.

### Newly in v0.5.5:
You could customize `ejs` template folder path, `public` file folder path and url:

	var options = {
		// EJS folder path changes to "/foo/ejs"
		templateFolder: "foo/ejs",
		
		// Public file folder path changes to "/bar/asset" 
		publicFolder: "bar/asset",
		
		// Public file address changes to "http://mydomain.com:1080/asseturl/"
		publicurl: "/asseturl",
		
		route: {
			// ......
		}
	};

### Newly in v0.5.x:
You could use

	{
		ex_data: function(resolve){
			resolve({
				data: "my data"
			});
		} 
	}
	
for async data fetching.

### Newly in v0.4.x:
Implemented param route.

	var options = {
		route: {
			index: {
				ex_data: {
					id: "I'm the index"
				}
			},
			ex_param_id: {
				ex_data: function (resolve, param) {
					resolve({
						id: param.id
					});
				},
				ex_template: "id.ejs",
				ex_param_secondId: {
					ex_data: function (resolve, param) {
						resolve({
							id: param.id,
							secondId: param.secondId
						});
					},
					ex_template: "id.ejs"
				}
			}
		}
	};
	
id.ejs:

	<!DOCTYPE html>
	<html>
		<head>
			<title>Page Test</title>
		</head>
		<body>
			<%
				var id = locals.id;
				var secondId = locals.secondId;
			%>
			<h1><%= id %></h1>
			<%if(secondId){%>
				<h2><%= secondId %></h2>
			<%}%>
		</body>
	</html>
	
If url goes to `http://mydomain.com:1080/param1`, it would display `<h1>param1</h1>`.

If url goes to `http://mydomain.com:1080/param1/param2`, it would display `<h1>param1</h1><h2>param2</h2>`.

If url goes to'http://mydomain.com:1080/index', it would display `{id: "I'm the index"}` instead of `<h1>I'm the index</h1>`.

Because priority of `static` route is higher than `ex_param` route.

### Todo:

Continue to refine code structure.
