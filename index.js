import express from 'express';
import dotenv from './configs/config.js';
import router from './router/Rout.js';
import db from './configs/db.js';
import cookieParser from 'cookie-parser';
import passport from './middlewares/passport.js';
import session from 'express-session';

const port=dotenv.PORT||3001;
const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));
app.use(session({
    secret:'it is confidential',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60 // 1 hour
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);
app.listen(port,(err)=>{
    if(!err){
        console.log(`Server is running on http://localhost:${port}`);
    }else{
        console.log(err);        
    }
});