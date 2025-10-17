export const whatTypeVarIs = (variable) => {
  if (Array.isArray(variable)) {
    return 'isArray';
  } else if (typeof variable === 'object' && variable !== null) {
    return 'isObject';
  } else {
    return null;
  }
}


