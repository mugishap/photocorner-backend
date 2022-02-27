const multer = require('multer');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const fileUpload = multer({
    limits: 1000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images");
        },
        filename: (req, file, cb) => {
            const name = file.originalname.toLocaleLowerCase().split(" ").join("_");
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name + "_" + Date.now() + "." + ext);
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype];
            let error = isValid ? null : new Error("Invalid mime type");
            cb(error, isValid);
        }
    })
})

module.exports = fileUpload;