import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/usermodel.js';

passport.use('local',new LocalStrategy(async(username,password,done)=>{
    try {
        let user=await User.findOne({name:username});
        if(!user) return done(null,false);
        if(!user.isActive) return done(null,false);
        let isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return done(null,false);
        return done(null,user);
    } catch (error) {
        return done(error,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    try {
        let user=await User.findById(id);
        if(!user) return done(null,false);
        return done(null,user);
    } catch (error) {
        return done(error,false);
    }
});

export function userAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    res.locals.user=req.user;
    return next();
}

export default passport;