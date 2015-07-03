var options = require("../options");
var router = require("../../lib/router");
var should = require("should");

router.init(options);

describe("Dynamic route testing", function () {
	describe("visit http://mydomain.com/", function () {
		var routeObj = router.parse("/");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'application/json'", function () {
					data.mime.should.equal("application/json");
				});
			});
			context("Content body", function () {
				it("should return '{title: \"I'm index.\"}'", function () {
					data.contentBody.should.equal('{"title":"I\'m index."}');
				});
			});
		});
	});
	describe("visit http://mydomain.com/pageaction", function () {
		var routeObj = router.parse("/pageaction");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'text/html'", function () {
					data.mime.should.equal("text/html");
				});
			});
			context("Content body", function () {
				it("should return '<h1>I\'m the page</h1>'", function () {
					data.contentBody.should.equal("<h1>I&#39;m the page</h1>");
				});
			});
		});
	});
	describe("visit http://mydomain.com/param1", function () {
		var routeObj = router.parse("/param1");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'text/html'", function () {
					data.mime.should.equal("text/html");
				});
			});
			context("Content body", function () {
				it("should return '<h1>param1</h1>'", function () {
					data.contentBody.replace(/\r/g, "").replace(/\n/g, "").should.equal("<h1>param1</h1>");
				});
			});
		});
	});
	describe("visit http://mydomain.com/param1/param2", function () {
		var routeObj = router.parse("/param1/param2");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'text/html'", function () {
					data.mime.should.equal("text/html");
				});
			});
			context("Content body", function () {
				it("should return '<h1>param1</h1><h2>param2</h2>'", function () {
					data.contentBody.replace(/\r/g, "").replace(/\n/g, "").should.equal("<h1>param1</h1><h2>param2</h2>");
				});
			});
		});
	});
	describe("visit url without route definition: http://mydomain.com/param1/param2/param3", function () {
		var routeObj = router.parse("/param1/param2/param3");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 404", function () {
					data.httpStatus.should.equal(404);
				});
			});
			context("Mime type", function () {
				it("should return 'text/html'", function () {
					data.mime.should.equal("text/html");
				});
			});
		});
	});
});