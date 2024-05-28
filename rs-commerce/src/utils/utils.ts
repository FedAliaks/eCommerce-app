const getRequestErrorMessage = (eCode: number) => {
  let error = 'Oops... ';
  switch (eCode) {
    case 400:
      error += 'Bad request';
      break;
    case 404:
      error = 'Requested data not found';
      break;
    case 500:
      error = 'Server error';
      break;

    case 502:
      error = 'Bad gateway';
      break;
    case 503:
      error = 'Service unavailable';
      break;
    default:
      error = 'Loading error';
  }

  return error;
};

export default getRequestErrorMessage;
