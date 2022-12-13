const router = require('express').Router();
const multer = require('multer');
const Converter = require("csv-converter-to-pdf-and-html");
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'public/uploads');
    },
    filename: (req, file, cb)=>{
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage }).single('csv');

router.get('/send', (req, res) => {
    try {
      res.sendFile(__dirname + "/index.html")
    } catch (error) {
       return console.log("err", error.message)
    }
})

router.post('/upload', (req, res)=>{
  try{
    output = Date.now() + "output"
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(req.file.path)

            
const converter = new Converter();

    const filePath = path.resolve(req.file.path);
    const destinationPath = path.resolve("./" + output);

    converter.HTMLAndPDFConverter(filePath, destinationPath)
  }
    })
  }catch(err){
   return console.log('error', err.message)
  }
  })


module.exports = router;