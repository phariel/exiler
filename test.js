var exiler = require("./index");

var options = {
    route: {
        index: {
            data: function () {
                return {aaa: 1};
            },
            page: {
                data: function () {
                    return {bbb: 2};
                }
            }
        }
    }
};

exiler.server(options, 9528);