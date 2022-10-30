const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')

router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})


router.get('/display/:id', async (req, res)=>{
    let allLessons = await db.lesson.findAll()
    let curlsn = await db.lesson.findOne({
        where: { id : req.params.id}
    })
    res.render('users/display.ejs',{lessons:allLessons,curlsn})
      
   

})

router.get('/d', async (req, res)=> {
   
})

router.post('/display/:id', async (req,res)=>{
    //const [newc,c]= await db.lesson.delete({where:{id:req.params.id}})
     let pokemon = await db.lesson.findOne({
        where: { id : req.params.id}
    })
    try{
    pokemon.destroy()
    res.render('users/display.ejs',{lessons:allLessons})
    }
    catch(error){
        console.log(error)
    }
    res.redirect('../startup')
})


router.post('/', async (req, res)=>{
    const [newUser, created] = await db.user.findOrCreate({where:{email: req.body.email,name:req.body.name,password:req.body.password,usertype:req.body.select}})
    if(!created){
        console.log('user already exists')
        res.render('users/login.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('startup')
    }
})

 router.get('/startup', async (req, res)=>{

    if (res.locals.user.id==1 ) {
        let allLessons = await db.lesson.findAll()
        let ID=res.locals.user.id;
        //console.log('lessons', allLessons)
        
        //res.render('users/startup.ejs', {lessons: allLessons})
    } else {
       // res.render('users/startup.ejs', {lessons: []})
    }

    if (res.locals.user) {
        let allLessons = await db.lesson.findAll()
        
        console.log('It got worked',res.locals.user.usertype,res.locals.user.id)

        res.render('users/startup.ejs', {lessons: allLessons})
        
    } else {
        console.log('It worked')
        res.render('users/startup.ejs', {lessons: []})
    }






    
 })

router.get('/login', (req, res)=>{
    res.render('users/login.ejs')
})

router.post('/login', async (req, res)=>{
    const user = await db.user.findOne({where: {email: req.body.email,usertype:req.body.select}})
    if(!user){
        console.log('user not found')
        res.render('users/login', { error: "Invalid email/password" })
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('password incorrect')
        res.render('users/login', { error: "Invalid email/password" })
    } else {
        console.log('logging in the user!!!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('startup')
    }
})


router.get('users/lessons/startup', (req,res)=>{
    res.render('startup')
    
})



router.post('/startup', async (req, res)=>{
    const [newlesson, created] = await db.lesson.findOrCreate({where:{name: req.body.name,content:req.body.content,desc:req.body.descrip,userId:res.locals.user.id,usertype:res.locals.user.usertype}})
    // if(!created){
    //     console.log('user already exists')
    //     res.render('users/startup.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    // } else {
       
        // await newlesson.save()
        // const encryptedUserId = cryptojs.AES.encrypt(newlesson.id.toString(), process.env.SECRET)
        // const encryptedUserIdString = encryptedUserId.toString()
        // res.cookie('userId', encryptedUserIdString)
        res.redirect('startup')
    // }
})




router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', (req, res)=>{
    res.render('users/profile.ejs')
})



module.exports = router