export const getArgs = (processArgv) => {
  const argsData = {};

  const [_executor, _file, ...args] = processArgv;

  args.forEach((value, index) => {
    if (value.charAt(0) === '-') {
      const argName = value.substring(1);

      if (index === args.length - 1) {
        argsData[argName] = true;
      } else if (args[index + 1].charAt(0) !== '-') {
        argsData[argName] = args[index + 1];
      } else {
        argsData[argName] = true;
      }
    }
  });

  return argsData;
};

export const convertKelvinToCelcius = (number) => Math.round(number - 273.15);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
