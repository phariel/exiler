var url = require("url");
var dynamicModule = require("./dynamic");
var staticModule = require("./static");

var staticUrl = "public";

var _route;

var Router = {};


Router.init = function (options) {
    _route = options.route;
    options.staticUrl && (staticUrl = options.staticUrl);
};

Router.parse = function (urlStr) {
    var urlObj = url.parse(urlStr);
    var urlArr = urlObj.pathname.split("/");

    var returnObj;

    urlArr.shift();

    console.log(urlArr);

    if (urlArr[0] === staticUrl) {
        returnObj = staticModule.parse(urlArr);
    } else {
        returnObj = dynamicModule.parse(urlArr, _route);
    }

    return returnObj;

};

module.exports = Router;