/**
 * @file sdoc start 命令
 * @author kidnes
 * @date 2020-12-20
 */

exports.command = 'start';

exports.description = 'Start compile ...';

exports.args = [
    ['--port [value]', 'specify dev port (default: 8080)', 8080],
    ['--mode [value]', 'specify env mode (default: development)', 'production']
];

exports.run = cmd => {
    const run = require('./run');
    run(cmd);
};
