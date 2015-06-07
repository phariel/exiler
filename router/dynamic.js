var ejs = require("ejs");
var fs = require("fs");

var rootPath = process.cwd();
var ejsFolder = rootPath + "/ejs/";

var DynamicModule = {};

DynamicModule.parse = function (urlArr, route) {
    var loopObj = route;
    var httpStatus = 200;
    var contentBody;
    var mime = "application/json";

    urlArr.forEach(function (v, i) {
        loopObj = loopObj[v];
        if (!loopObj) {
            httpStatus = 404;
        }
    });


    if (httpStatus === 404) {
        mime = "text/html";
        contentBody = "404 not found";
    } else {
        contentBody = loopObj.data();

        if (loopObj.file) {
            if (loopObj.file.indexOf(".ejs") > -1) {
                var file = ejsFolder + loopObj.file;
                file = file.replace(/\\/g, "\/");
                console.log("file: ", file);
                if (fs.existsSync(file)) {
                    var template = fs.readFileSync(file, "utf8");
                    contentBody = ejs.render(template, contentBody);
                    mime = "text/html";
                }
            }
        }
    }

    typeof contentBody === "object" && (contentBody = JSON.stringify(contentBody));

    return {
        mime: mime,
        httpStatus: httpStatus,
        contentBody: contentBody
    };
};

module.exports = DynamicModule;

