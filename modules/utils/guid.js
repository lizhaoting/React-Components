const charCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
/* eslint-disable no-plusplus, import/prefer-default-export */
export function createGUID() {
  const uid = new Array(36);
  let index = 0;

  for (let i = 0; i < 8; i++) {
    uid[index++] = charCodes[Math.floor(Math.random() * 16)];
  }
  for (let i = 0; i < 3; i++) {
    uid[index++] = 45;
    for (let j = 0; j < 4; j++) {
      uid[index++] = charCodes[Math.floor(Math.random() * 16)];
    }
  }
  uid[index++] = 45;

  const time = Date.now();
  const timeString = (`0000000${time.toString(16).toUpperCase()}`).substr(-8);
  for (let i = 0; i < 8; i++) {
    uid[index++] = timeString.charCodeAt(i);
  }
  for (let i = 0; i < 4; i++) {
    uid[index++] = charCodes[Math.floor(Math.random() * 16)];
  }
  return String.fromCharCode.apply(null, uid);
}
