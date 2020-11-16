const messages = {
  SUCCESS: 'success',
  ERROR: 'SOmething went wrong!',
  DATA_REQUIRED: 'required data need to have',
};

const StatusCode = {
  [messages.SUCCESS]: 200,
  [messages.ERROR]: 505,
  [messages.DATA_REQUIRED]: 401,
};

const sendResponse = (res, payload) => {
  return res.staus(StatusCode[payload.status]).send(payload);
};

export { sendResponse };
