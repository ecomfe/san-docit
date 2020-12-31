#! /usr/bin/env node

require('@babel/register')({});

const program = require('commander');
const globby = require('globby');
const semver = require('semver');
const chalk = require('chalk');

const buildCommand = async (route) => {
    const {command, description, args, run} = await require(route);
    const commandConfig = program.command(command);

    commandConfig.description(description);
    args.forEach(option => commandConfig.option(option[0], option[1], option[2]));

    commandConfig.action(run);
};

const main = async () => {
    if (semver.lt(process.version, '8.9.0')) {
        console.error(chalk.yellow('Require node >= v8.9.0 to be installed'));
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
