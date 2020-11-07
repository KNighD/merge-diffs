const cp = require('child_process');

// 简单封装成 promise
const asyncExec = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cp.exec(command, (err: Error, stdout: string, stderr: string) => {
      if (stderr || err) {
        return reject(stderr || err);
      }
      return resolve(stdout);
    });
  });
};

export default asyncExec;