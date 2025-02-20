const express = require('express')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')
const FileReader=require('filereader')
const puppeteer = require('puppeteer')
const fs=require('fs')
const user = require('../models/user')
const lesson = require('../models/lesson')
const { kdf } = require('crypto-js')
const { INTEGER } = require('sequelize')
const fetch = require('node-fetch');
const EventEmitter = require('events');
var eventEmitter = new EventEmitter();

router.get('/new', async (req,res)=>{
    res.render('users/new.ejs')
    var f=req.body.Img;
    //var k=<HTMLElement/>,
    //var k=<document.querySelector/
    //let dom = await JSDOM.fromFile("views/users/new.ejs");
    let dom = await JSDOM.fromFile('views/users/new.ejs', {
        runScripts: "dangerously",
        resources: "usable",
      });
      console.log(dom.window.document.querySelector('.pic'));
      var newd=dom.window.document.querySelector('.pic')
      return new Promise((resolve) => {
        dom.window.addEventListener("click", () => {
           
              //var events = new EventListener(document.body);
              //events.on('click', callback);
              var window=dom.window;
              var document= dom.window.document;

              global.document = window.document;
              global.window = window;
              var event = new window.MouseEvent('change', () =>{console.log("done") });
              global.document.querySelector('.pic').dispatchEvent(event);
          console.log("it worked")
        });
        dom.window.document.querySelector('.pic').addEventListener("load", ()=>{console.log('Hello world')})
      });
console.log(dom.getInternalVMContext);
    k = await fetch('http://localhost:7000/users/new' )
let html = await k.text()
var dom1 = new JSDOM(html)
    // const dom = new JSDOM(``, {
    //     url: "http://localhost:7000/users/new/",
    //     referrer: "https://example.com/",
    //     contentType: "text/html",
    //     includeNodeLocations: true,
    //     storageQuota: 1000000000000
    //   });
    
      let check=dom.window.document.querySelector("#pic");
      //const c=lookupNamespaceURI(check.files[0]);
      //check.dispatchEvent(new dom.window.MouseEvent('click'));
      //let c=check.getAttribute('onClick')
      //console.log(check)
      //var readStream = fs.createReadStream(c);
    //   eventEmitter.on('change', check);
    //   eventEmitter.emit('change')
    //   dom.window.document.addEventListener('click', e => {
    //     console.log(typeof(e));
    //   });
      check.addEventListener('change', e => { console.log(e); }); 

      
    //   const myEmitter = new EventEmitter()
    //   myEmitter.on('newSale', () => {
    //     console.log('A new sale occur')
    //   })
    //   myEmitter.emit('newSale')
    //   check.addEventListener("change", e=>{
    //     console.log(e)
    //   })
      //console.log(typeof(check))
//console.log(dom.window.document.querySelector("p").textContent);
      
      //console.log(typeof(dom))
    //   try{dom.addEventListener("change", e =>{
    //     console.log("the event triggered")
    //   })}
    //   catch(error){console.log("its oky")}
    //   //var fil=b.files[0]
    
    //console.log(typeof(f)," this is the file ",f);
    
      let dom2=window = (new JSDOM(``, { runScripts: 'dangerously', url: 'http://localhost:7000/users/new' })).window
      //var k=dom2.window.document.querySelector(".pic").textContent
//console.log(typeof(dom2.window.document.querySelector(".pic")),check); // "Hello world"
    // if(f!=""){
    //     const reader=new FileReader()
    //     reader.readAsDataURL(k);
    //     console.log(reader);
    // }
    var base64String="";
    
    
    
})
router.get('/startup', async (req, res)=>{

    // if (res.locals.user.id==1 ) {
    //     let allLessons = await db.lesson.findAll()
    //     let ID=res.locals.user.id;
    //     //console.log('lessons', allLessons)
        
    //     //res.render('users/startup.ejs', {lessons: allLessons})
    // } else {
    //    // res.render('users/startup.ejs', {lessons: []})
    // }

    if (res.locals.user) {
        let allLessons = await db.lesson.findAll()
        
        console.log('It got worked',res.locals.user.usertype,res.locals.user.id)

        res.render('users/startup.ejs', {lessons: allLessons})
        
    } else {
        console.log('It worked')
        res.render('users/startup.ejs', {lessons: []})
    }


    
 })
 var k='';
router.get(`/display/:k/:id`, async (req, res)=>{
    let allLessons = await db.lesson.findAll()
    let curlsn = await db.lesson.findOne({
        where: { id : req.params.id}
    })
    let edit=req.params.k;
    res.render('users/display.ejs',{lessons:allLessons,curlsn,edit})
    //req.params.k=k;
     console.log(req.params.k)
     

})

router.get('/d', async (req, res)=> {
   
})
var n=0;

router.post(`/display/:k/:id`, async (req,res)=>{
    //const [newc,c]= await db.lesson.delete({where:{id:req.params.id}})
    let allLessons = await db.lesson.findAll()
     let edit=req.params.k;
     let curlsn = await db.lesson.findOne({
        where: { id : req.params.id}
    })

    try{
        console.log(req.params.k)
        
    if(req.params.k==2){  
    curlsn.destroy();
    //res.render('users/display.ejs',{lessons:allLessons,edit,curlsn})
    }
    if(req.params.k==4){
        
       
        curlsn.save()
        console.log("works");
        curlsn.name=req.body.name
        console.log(curlsn.name)
        curlsn.desc=req.body.descrip
        console.log(req.body.descrip)
        curlsn.content=req.body.content
        console.log(curlsn.content)
        console.log("wow")
        curlsn.save()
        
    }
    }
    catch(error){
        console.log("sorry",req.params.k)
    }

//if() {
   // pokemon.content
//}
    if(edit==2 || edit==4)
    res.redirect('../../startup')
    if(edit==3)
    res.render('users/display.ejs',{lessons:allLessons,edit,curlsn})
})


router.post('/', async (req, res)=>{
    var f=req.body.Img;
    //var k=<HTMLElement/>,
    //var k=<document.querySelector/
    k = await fetch('http://localhost:7000/users/new' )
let html = await k.text()
var dom = new JSDOM(html)


    // let window = (new JSDOM(``, { runScripts: 'dangerously', url: 'http://localhost:7000/users/new' })).window
    //   const input=window.document.querySelector("#pic")
      let input=dom.window.document.querySelector("#pic");
      let file=input.files[0]
      console.log(input)
      input.addEventListener("change", e =>{
        console.log(e)
      })
      //var fil=b.files[0]
    
    console.log(typeof(f)," this is the file ",f);
    
//       let dom2=window = (new JSDOM(``, { runScripts: 'dangerously', url: 'http://localhost:7000/users/new' })).window
//       var k=dom2.window.document.querySelector(".pic").textContent
// console.log(typeof(dom2.window.document.querySelector(".pic")),k); // "Hello world"
    if(f!=""){
        const reader=new FileReader()
        reader.readAsDataURL(input);
        console.log(reader);
    }
    var base64String="";
    // var reader=new FileReader();
    // reader.onload = function(){
    //     base64String=reader.result.replace("data:","").replace(/^.+,/, "")
    //     imageBase64Stringsep= base64String;
    //     console.log(base64String)
    // }
    // reader.readAsDataURL(f);
    // console.log(f)
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
        res.redirect('users/profile')
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