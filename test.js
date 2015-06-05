var exiler = require("./index");

var config = {
	index: {
		ref: function () {
			return {aaa: 1};
		},
		page: {
			ref: function () {
				return {bbb: 2};
			}
		}
	}
};

exiler.server(config, 9528);