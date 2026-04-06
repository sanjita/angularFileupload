const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// // Upload API
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({
//     message: 'File uploaded successfully',
//     file: req.file
//   });
// });


// upload multiple files

// Multiple file upload (max 5 files)
app.post('/upload', upload.array('files', 5), (req, res) => {
  res.json({
    message: 'Files uploaded successfully',
    files: req.files
  });
});




// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});