/**
 *
 * @param array
 * @returns
 */
export function pickRandom<T>(array: readonly T[]): T | undefined {
  const { length } = array;
  return array[Math.floor(Math.random() * length)];
}

/**
 * Used for the bot premium system. Creates user keys for verification.
 * @param length of keys to generate
 * @returns
 */
export function premiumKeyGenerator(length: number) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function generateID() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
