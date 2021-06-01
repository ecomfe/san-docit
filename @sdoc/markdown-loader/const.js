exports.codeboxReg = /<(codebox)\s?((?:[^>]+)?>(.+?))<\/\1>/gis;
exports.codeboxRawReg = /<(codebox)\s?(?:[^>]+)?\braw\b((?:[^>]+)?>(.+?))<\/\1>/gis;
exports.codeboxSnippetReg = /```(html|san|js)\s{0,}(?:(?:\{[^?]+?\})?)\s+(.+?)\s+```/s;
exports.NS = 'san-cli-markdown-loader';
exports.isSanLoader = l => /(\/|\\|@)?(san-loader|(\w+)-san-loader)/.test(l.path);
exports.isNullLoader = l => /(\/|\\|@)?null-loader/.test(l.path);
exports.isBabelLoader = l => /(\/|\\|@)?babel-loader/.test(l.path);
exports.isSanHotLoader = l => /(\/|\\|@)?san-hot-loader/.test(l.path);
