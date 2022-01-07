import chalk from 'chalk';

export class LogService {
  static printError = (error) => {
    console.log(chalk.bgRed(`ERROR: ${error}`));
  };

  static printSuccess = (message) => {
    console.log(chalk.bgGreen(`SUCCESS: ${message}`));
  };

  static printInfo = (info) => {
    console.log(chalk.bgCyan(`HELP: ${info}`));
  };
}
