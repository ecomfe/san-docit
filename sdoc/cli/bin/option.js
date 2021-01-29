const path = require('path');

let command = {};

exports.parseCwd = value => {
    if (!value || value.startsWith('/')) {
        return value;
    }
    return path.join(process.cwd(), value);
};

exports.getCwd = () => {
    return command.cwd || process.cwd();
};

exports.getCmd = () => {
    return command;
};

exports.run = cmd => {
    command = cmd;
};