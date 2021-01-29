/**
 * @file sdoc build 命令
 * @author kidnes
 * @date 2020-12-20
 */

exports.command = 'build';

exports.description = 'Start compile ...';

exports.args = [
    ['--mode [value]', 'specify env mode (default: development)', 'production']
];

exports.run = cmd => {
    const run = require('./run');
    run(cmd);
};
