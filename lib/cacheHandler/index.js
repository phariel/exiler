var Cache = require("node-cache");
var cacheObj = new Cache();

var CacheHandler = {};

CacheHandler.setCache = function (key, val) {
	cacheObj.set(key, val);
};

CacheHandler.getCache = function (key) {
	return cacheObj.get(key);
};

module.exports = CacheHandler;