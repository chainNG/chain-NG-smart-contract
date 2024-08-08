

export function formatMilliseconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const millisecondsRemainder = milliseconds % 1000;

    return seconds;
  }

  

  
 export const convertBigIntToString = (obj) => {
    const newObj = { ...obj };
    // Replace BigInt values with their string representation
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key) && typeof newObj[key] === 'bigint') {
        newObj[key] = newObj[key].toString();
      }
    }
    return newObj;
  };
