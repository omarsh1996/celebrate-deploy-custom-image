
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import {deploy} from "./commands/deploy";

yargs(hideBin(process.argv))
    .command('deploy', 'Greet the user', (yargs) => {

    }, (argv) => {
         deploy()
    })
    .help()
    .argv;