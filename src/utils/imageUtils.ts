export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
  id: string;
}

// Validate image file
export const validateImage = (file: File): ImageValidationResult => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: 'File must be an image',
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 5MB',
    };
  }

  return { isValid: true };
};

// Create preview URL for image
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Clean up preview URL to prevent memory leaks
export const cleanupImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl);
};

// Generate unique ID for image
export const generateImageId = (): string => {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Process uploaded image file
export const processImageUpload = (file: File): ImageFile | null => {
  const validation = validateImage(file);
  
  if (!validation.isValid) {
    console.error('Image validation failed:', validation.error);
    return null;
  }

  return {
    file,
    previewUrl: createImagePreview(file),
    id: generateImageId(),
  };
};

// Convert image to base64 (useful for API uploads)
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};

// Resize image to specific dimensions (useful for thumbnails)
export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          0.8
        );
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};
