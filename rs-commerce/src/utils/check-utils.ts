import { REGEXP } from 'constants/constants';

export function checkIsValueEmpty(value: string): boolean {
  return value === '';
}

export function checkIsValueHasWhitespaces(value: string): boolean {
  return value[0] === ' ' || value[value.length - 1] === ' ';
}

export function checkEmailHasAmpSymbol(value: string): boolean {
  return value.includes('@');
}

export function checkEmailHasLocalPart(value: string): boolean {
  return value.includes('@') && !value.split('@')[0];
}

export function checkEmailLocalPartIsValid(value: string): boolean {
  return (
    Boolean(value.includes('@')) &&
    Boolean(value.split('@')[0]) &&
    !REGEXP.isLocalPartValid.test(value.split('@')[0] as string)
  );
}

export function checkEmailHasDomain(value: string): boolean {
  return Boolean(value.includes('@')) && !value.split('@')[1];
}

export function checkEmailDomainIsValid(value: string): boolean {
  return (
    Boolean(value.includes('@')) &&
    Boolean(value.split('@')[1]) &&
    !REGEXP.isDomainValid.test(value.split('@')[1] as string)
  );
}

export function checkEmailValid(value: string): boolean {
  return REGEXP.isEmailValid.test(value);
}

export function checkIsValueHasLowercase(value: string): boolean {
  return REGEXP.hasLowercase.test(value);
}

export function checkIsValueHasUppercase(value: string): boolean {
  return REGEXP.hasUppercase.test(value);
}

export function checkIsValueHasDigit(value: string): boolean {
  return REGEXP.hasDigit.test(value);
}

export function checkIsValueHasSpecial(value: string): boolean {
  return REGEXP.hasSpecial.test(value);
}

export function checkIsValueHasOnlyLatin(value: string): boolean {
  return REGEXP.hasOnlyLatin.test(value);
}

export function checkPasswordLength(value: string): boolean {
  return value.length < REGEXP.minPasswordLength;
}
