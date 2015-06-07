var mimeLib = require("mime");
var fs = require("fs");

var StaticModule = {};
var rootPath = process.cwd();
var localPath = rootPath + "/public/";

StaticModule.parse = function (urlArr) {
    var httpStatus = 200;
    var mime;
    var contentBody;
    var file;

    urlArr.shift();
    file = (localPath + urlArr.join("/")).replace(/\\/g, "\/");
    console.log(file);

    if (fs.existsSync(file)) {
        mime = mimeLib.lookup(file);
        contentBody = fs.readFileSync(file, "utf8");
    } else {
        httpStatus = 404;
        contentBody = "404 not found";
        mime = "text/html";
    }

    return {
        mime: mime,
        httpStatus: httpStatus,
        contentBody: contentBody
    }
};

module.exports = StaticModule;