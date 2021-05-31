#! /usr/bin/env node

const path = require('path');
const program = require('commander');
const globby = require('globby');
const semver = require('semver');
const chalk = require('chalk');
const option = require('./option');

const parseCwd = value => {
    if (!value || value.startsWith('/')) {
        return value;
    }
    return path.join(process.cwd(), value);
};

const buildCommand = async route => {
    const {command, description, args, run} = await require(route);
    const commandConfig = program
        .command(command)
        .description(description)
        .arguments('[cwd]').description('override current working directory');

    args.forEach(arg => commandConfig.option(arg[0], arg[1], arg[2]));

    commandConfig.action((cwd = '.', cmd) => {
        cmd.cwd = parseCwd(cwd);

        option.run(cmd);
        run(cmd);
    });
};

const main = async () => {
    if (semver.lt(process.version, '10.0.0')) {
        console.error(chalk.yellow('Require node >= v10.0.0 to be installed'));
        process.exit(1);
    }

    const routes = await globby('./commands/*', {
        expandDirectories: false,
        onlyFiles: false,
        cwd: __dirname
    });

    await Promise.all(routes.map(buildCommand));

    program.parse(process.argv);
};

main();
