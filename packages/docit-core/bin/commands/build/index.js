/**
 * @file sandocit build 命令
 * @author kidnes
 * @date 2020-12-20
 */

const path = require('path');

exports.command = 'build';

exports.description = 'Start compile ...';

exports.args = [
    ['--cwd [value]', 'override current working directory', value => {
        if (!value || value.startsWith('/')) {
            return value;
        }
        return path.join(process.cwd(), value);
    }],
    ['--mode [value]', 'specify env mode (default: development)', 'production']
];

exports.run = cmd => {
    const run = require('./run');
    run(cmd);
};
