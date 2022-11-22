const express = require('express');
const multer = require('multer');
const router = express.Router(); 
const mongoose = require('mongoose'); 
const  User = mongoose.model('User'); 
const Memory = mongoose.model('Memory'); 
const { requireUser } = require('../../config/passport'); 

const upload = multer({
    limits: {
        fileSize: 1000000
    },

    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpeg|jpg) $/)){
            cb(new Error('files must be formatted to end with jpg or jpeg'));
        }

        cb(undefined, true); 
    }
})

router.get('/memories', async(req, res) =>{
    try{
        const memories = await Memory.find({}); 
        res.send(memories); 
    } catch(err) {
        return res.json([]);
    }
})

router.get('/memories/:id', async(req, res) => {
    try{
        const memory = await Photo.findById(req.params.id); 
        res.set('Content-Type', 'image/jpeg'); 
        res.send(result.photo); 
    } catch (err){
        next(err);
    }
}); 

router.post('/memories', upload.single('photo'), async(req, res) =>{
    try{
        const photo = new photo(req.body)
        const file = req.file.buffer; 
        photo.photo = file;

        let memory = await photo.save(); 
        res.status(201).send({ _id: photo._id }); 
    } catch (err){
        next(err);
    }
}); 


module.exports = router;