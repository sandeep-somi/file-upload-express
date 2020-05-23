const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

//to access the files in public folder
app.use(express.static('public'));
//it enables all cors requests
app.use(cors());
app.use(fileUpload());

//file upload api
app.post('/upload', (req, res) => {
    if(!req.files) {
        return res.status(500).send({ msg: 'file not found!'});
    }

    //accessing the file
    const myFile = req.files.file;

    //mv() method places the files inside the public direcotry
    myFile.mv(`${__dirname}/public/${myFile.name}`, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Something went wrong while uploading file!" });
        }
        // returing the response with file path and name
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
});

app.listen(4500, () => {
    console.log('server is running at port 4500');
});