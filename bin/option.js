let command = {};

exports.getCwd = () => {
    return command.cwd || process.cwd();
};

exports.getCmd = () => {
    return command;
};

exports.run = cmd => {
    command = cmd;
};