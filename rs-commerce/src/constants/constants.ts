export const LOGIN_PAGE_TEXT = {
  titleForm: 'Login',
  linkRegistration: "Don't have an account yet? ",
  linkTo: 'Register',
  titleEmail: 'Email',
  placeholderEmail: 'Enter email',
  titlePassword: 'Password',
  placeholderPassword: 'Enter password',
  loginPageBtn: 'Submit',
};

export const EMAIL_FORM_TIPS = {
  tipsEmailEmpty: "Email can't be empty.",
  tipsEmailWhitespaces: 'Email address must not contain leading or trailing whitespace.',
  tipsEmailAmpSymbol:
    "Email address must contain an '@' symbol separating local part and domain name",
  tipsEmailLocalPart: 'Email address must contain a local part (e.g., user).',
  tipsEmailLocalPartValid:
    'Local part can contain only latin letters, digits and "-", "_", "." character.',
  tipsEmailDomain: 'Email address must contain a domain name (e.g., example.com).',
  tipsEmailDomainValid: 'Domain can contain only latin letters, digits and "-" or "." character.',
  tipsEmailFormat: 'Email address must be properly formatted (e.g., user@example.com).',
};

export const PASSWORD_FORM_TIPS = {
  tipsPasswordEmpty: "Password can't be empty.",
  tipsPasswordWhitespaces: 'Password must not contain leading or trailing whitespace.',
  tipsPasswordHasLowercase: 'Password must contain at least one lowercase latin letter (a-z).',
  tipsPasswordHasUppercase: 'Password must contain at least one uppercase latin letter (A-Z).',
  tipsPasswordHasDigit: 'Password must contain at least one digit (0-9).',
  tipsPasswordHasSpecial: 'Password must contain at least one special character (e.g., !@#$%^&*).',
  tipsPasswordHasOnlyLatin:
    'Password must contain only latin letter (A-Za-z), digit (0-9) and special character (e.g., !@#$%^&*).',
  tipsPasswordLength: 'Password must be at least 8 characters long.',
};

export const REGEXP = {
  isLocalPartValid: /^[A-Za-z0-9-_.]+$/i,
  isDomainValid: /^[A-Za-z0-9-.]+$/i,
  isEmailValid: /^[A-Za-z0-9-_.]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/i,
  hasLowercase: /[a-z]+/,
  hasUppercase: /[A-Z]+/,
  hasDigit: /[0-9]+/,
  hasSpecial: /[!@#$%^&*]+/,
  hasOnlyLatin: /^[A-Za-z0-9!@#$%^&*]+$/,
  minPasswordLength: 8,
};
