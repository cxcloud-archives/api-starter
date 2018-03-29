const { generatePassword, getConfig } = require('@buttercup/generator');

export async function generateRandomNumber(prefix = '') {
  try {
    const config = getConfig();
    config.randomCharacters.length = 5;
    config.randomCharacters.enabledCharacterSets = ['DIGITS'];
    return `${prefix}${await generatePassword(config)}`;
  } catch (err) {}
  return null;
}
