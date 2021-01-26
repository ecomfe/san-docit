/**
 * @file sandocit start 命令
 * @author kidnes
 * @date 2020-12-20
 */

const path = require('path');

exports.command = 'start';

exports.description = 'Start compile ...';

exports.args = [
    ['--cwd [value]', 'override current working directory', value => {
        if (!value || value.startsWith('/')) {
            return value;
        }
        return path.join(process.cwd(), value);
    }],
    ['--port [value]', 'specify dev port (default: 8080)', 8080],
    ['--mode [value]', 'specify env mode (default: development)', 'production']
];

exports.run = cmd => {
    const run = require('./run');
    run(cmd);
};