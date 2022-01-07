#!/usr/bin/env mode
import { config } from 'dotenv';
import { getArgs } from './helpers/functions.js';
import { actions } from './actions/actions.js';
import { LogService } from './services/log.service.js';
import { ApiService } from './services/api.service.js';

const main = () => {
  config();

  const args = getArgs(process.argv);

  console.log('Start CLI ', args);

  if (Object.keys(args).length) {
    Object.entries(args).forEach(([param, value]) => {
      const action = actions[param];
  
      if (action) {
        typeof value === 'boolean' ? action() : action(value);
      } else {
        LogService.printError(`Param "${param}" is invalid`);
      }
    });
  } else {
    actions.getWeather();
  }
};

main();
