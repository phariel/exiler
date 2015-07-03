var options = require("../options");
var router = require("../../lib/router");
var should = require("should");

router.init(options);

describe("Public file route testing", function () {
	describe("visit http://mydomain.com/asset/css/test.css", function () {
		var routeObj = router.parse("/asset/css/test.css");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'text/css'", function () {
					data.mime.should.equal("text/css");
				});
			});
			context("Content body", function () {
				it("should return 'body{margin:0;}'", function () {
					data.contentBody.should.equal('body{margin:0;}');
				});
			});
		});
	});
	describe("visit http://mydomain.com/asset/js/test.js", function () {
		var routeObj = router.parse("/asset/js/test.js");
		routeObj.done(function (data) {
			context("Http status", function () {
				it("should return 200", function () {
					data.httpStatus.should.equal(200);
				});
			});
			context("Mime type", function () {
				it("should return 'application/javascript'", function () {
					data.mime.should.equal("application/javascript");
				});
			});
			context("Content body", function () {
				it("should return 'var test=\"test\";'", function () {
					data.contentBody.should.equal('var test="test";');
				});
			});
		});
	});
	describe("visit a public file which does not exist: http://mydomain.com/asset/foo.js", function () {
		var routeObj = router.parse("/asset/foo.js");
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