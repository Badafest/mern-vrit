export const readFile = (file) =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target.result);
      };
    } catch (error) {
      reject(error);
    }
  });
