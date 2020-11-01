const cp = require('child_process');

const getLogs = () => {
  return new Promise((resolve, reject) => {
    cp.exec(
      `git log`,
      (err: Error, stdout: string, stderr: string) => {
        if (stderr || err) {
          return reject(stderr || err);
        }
        return resolve(stdout);
      }
    );
  });
};

export default getLogs;