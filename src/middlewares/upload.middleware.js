import multer from 'multer';

const uploadAny = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, .jpeg and .webp format allowed!'), false);
    }
  },
}).any();

export default uploadAny;
