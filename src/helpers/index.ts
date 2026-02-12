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

export const getImagePath = async (ASSETS_FOLDER: string, path: string) => {
  if (!!ASSETS_FOLDER) {
    const url = `${ASSETS_FOLDER}${path}`;

    const isExistsColegioLogo = await fileExists(url);

    if (!isExistsColegioLogo) {
        return null;
    }

    return url;
    
  }
};
