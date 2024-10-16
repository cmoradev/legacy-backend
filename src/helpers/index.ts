import { access, stat } from 'fs';

export const fileExists = (path: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return resolve(false);
        }
        return reject(err);
      }
      return resolve(stats.isFile());
    });
  });
};
