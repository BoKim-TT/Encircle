const inputArg = process.argv[2];

const EvaluateAndExtractArgs = (args) => {
  let arg1;
  let arg2;
  if (args.includes('(')) {
    if (args.indexOf('(') === 0) {
      arg1 = args.slice(0, args.indexOf(')') + 1);
      arg2 = args.slice(args.indexOf(')') + 2);
    } else {
      arg1 = args.slice(0, args.indexOf('(') - 1);
      arg2 = args.slice(args.indexOf('('));
    }
  } else {
    arg1 = args.split(' ')[0];
    arg2 = args.split(' ')[1];
  }
  if (!arg1 || !arg2) {
    throw new Error('invalid expressions');
    process.exit(1);
  }
  return [arg1, arg2];
};

const calculateExpression = (expression) => {
  if (!isNaN(Number(expression))) {
    return Number(expression);
  }

  const operator = expression.startsWith('(add')
    ? 'add'
    : expression.startsWith('(multiply')
    ? 'multiply'
    : null;

  switch (operator) {
    case 'add':
      const addArgs = expression.slice(5, -1);
      const [addArg1, addArg2] = EvaluateAndExtractArgs(addArgs);
      return calculateExpression(addArg1) + calculateExpression(addArg2);
    case 'multiply':
      const multiplyArgs = expression.slice(10, -1);
      const [multiplyArg1, multiplyArg2] = EvaluateAndExtractArgs(multiplyArgs);
      return (
        calculateExpression(multiplyArg1) * calculateExpression(multiplyArg2)
      );
    default:
      throw new Error('invalid expressions');
      process.exit(1);
  }
};

console.log(calculateExpression(inputArg));
process.exit(0);
