export const findType = value => {
  const typeOfVal = typeof value;

  let resType;

  if (typeOfVal === 'object') {
    // value is null
    if (value === null) {
      resType = 'any';
    }

    // value is an array
    else if (value instanceof Array) {
      const [firstValue] = value;
      resType = findType(firstValue);
      resType = `${resType}[]`;
    }

    // value is an object
    else {
      const objectKeys = Object.keys(value);

      // object is empty
      if (objectKeys.length === 0) {
        resType = 'Record<string, any>';
      } else {
        resType = Object.keys(value).reduce((res, objectKey) => {
          return {
            ...res,
            [objectKey]: findType(value[objectKey]),
          };
        }, {});
      }
    }
  } else if (typeOfVal === 'undefined') {
    return 'any';
  } else {
    resType = typeof value;
  }

  return resType;
};
