// utils/text-formatting.ts

export const camelToKebab = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const isCapitalLetter = (letter: string): boolean =>
  letter >= 'A' && letter <= 'Z' ? true : false;

export const getFirstCapitalIndex = (string: string): number => {
  for (let i = 0; i < string.length; i++) {
    const char = string[i]!;
    // 💭 Idiomatic non-null assertion usage.
    // I could have used an `isString` type guard, but since `char` is
    // guaranteed to be a string within the `for` loop, a type guard
    // would be unnecessarily verbose.

    if (isCapitalLetter(char)) {
      return i;
    }
  }

  return -1;
};

export function camelCaseToSentence(string: string) {
  const CAPITAL_LETTER_REGEX = /[A-Z]/g;
  const newString = string.replaceAll(CAPITAL_LETTER_REGEX, (match, index) =>
    index === 0 ? match : ` ${match.toLowerCase()}`,
  );

  return newString;
}
// 💭 camelCaseToSentence v1
// function camelCaseToSentenceV1(string: string) {
//   const capitalLetterRegex = /[A-Z]/g;

//   const capitalLetterArray = [...string.matchAll(capitalLetterRegex)];
//   const stringArray = string.split(capitalLetterRegex);
//   const isFirstLetterCapitalized = capitalLetterRegex.test(string);

//   let i = isFirstLetterCapitalized ? 1 : 0;

//   for (const capitalLetter of capitalLetterArray) {
//     stringArray[i] = `${capitalLetter}` + stringArray[i];
//     i++;
//   }

//   if (isFirstLetterCapitalized) stringArray.shift();

//   const sentence = stringArray.join(' ');

//   return sentence;
// }
