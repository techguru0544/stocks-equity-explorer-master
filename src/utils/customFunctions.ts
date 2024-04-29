/**
 * to verify the argument value/string is false, null, undefined, empty or length is 0 then true else false.
 * @param {any} checkValue multiple parameters which are string variables.
 * @returns boolean value.
 */
export const isEmpty = (orgValue: any) => {
  let checkValue = orgValue;
  if (typeof orgValue === 'number') checkValue = String(orgValue);
  if (checkValue === false) return !checkValue;
  if (checkValue === true) return !checkValue;
  return (
    checkValue === null ||
    checkValue === 'undefined' ||
    checkValue === 'null' ||
    checkValue === undefined ||
    checkValue === '' ||
    (typeof checkValue === 'string' && checkValue.trim() === '') ||
    checkValue.length === 0 ||
    Object.keys(checkValue).length === 0
  );
};

export const extractInitailObjectKey = (dataObj: any, metaName: string) => {
  return dataObj?.[Object.keys(dataObj)?.[0]]?.[metaName];
};
