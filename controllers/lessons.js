const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()


router.post('/startup', async (req, res)=>{
    const [newlesson, created] = await db.lesson.findOrCreate({where:{name:req.body.name,email:req.body.email}})
    if(!created){
        console.log('user already exists')
        res.render('users/startup.ejs', {error: 'Looks like you already have a lesson! Try posting another lesson :)'})
    } else {
        //const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        //newlesson.password = hashedPassword
        await newlesson.save()
        const encryptedlessonId = cryptojs.AES.encrypt(newlesson.id.toString(), process.env.SECRET)
        const encryptedlessonIdString = encryptedlessonId.toString()
        res.cookie('lessonId', encryptedlessonIdString)
        res.redirect('startup')
    }
})

router.get('/startup', async (req, res)=>{
    try{
     const courses = await db.lesson.findAll()
    console.log('courses', courses)
     res.render('users/startup.ejs', { Lesson: courses })
    res.render('users/startup.ejs')
    }
    catch(error){
        console.log(error)
        res.send('I AM THE PATH')
    }
})



module.exports = router