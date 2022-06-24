export const ApplicationUtil = {
  getFilePath: (file) => {
    if (file) {
      let path = (window.URL || window.webkitURL)?.createObjectURL(file);
      return path;
    }
    return null;
  },
};
