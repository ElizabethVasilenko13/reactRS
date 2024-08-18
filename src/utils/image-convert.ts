const MAX_FILE_SIZE = 2000000;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      reject('Only .jpeg and .png formats are accepted');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      reject('This file is too large');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert image to base64');
      }
    };
    reader.onerror = () => reject('Error reading file');
    reader.readAsDataURL(file);
  });
};
