import asyncExec from './asyncExec';

const receiveMessageHandler = async (message: string) => {
  try {
    let data;
    switch (message) {
      case 'getLogs':
        data = await asyncExec('git log');
        break;
      case 'getCurrentBranch':
        data = await asyncExec('git branch');
        break;
      default:
        break;
    }
    return {
      code: 0,
      data: {
        data,
        type: message,
      },
    };
  } catch (error) {
    return {
      code: 1,
      data: error,
    };
  }
};

export default receiveMessageHandler;
