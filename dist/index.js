"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const helpers_1 = require("yargs/helpers");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('say-hello [name]', 'Greet the user', (yargs) => {
    yargs.positional('name', {
        type: 'string',
        describe: 'Name of the person to greet',
        default: 'World',
    });
}, (argv) => {
    console.log(`Hello, ${argv.name}!`);
})
    .help()
    .argv;
