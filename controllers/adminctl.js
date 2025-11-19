import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";

const adminctl={
    dashboard(req,res){
        res.render('./index.ejs');
    },
    signupPage(req,res){
        res.render('./pages/signup.ejs');
    },
    async signup(req,res){
        let {password,confirmPassword}=req.body;
        if(password!==confirmPassword){
            console.log("Passwords do not match.");            
            return res.redirect('/signup');
        }
        try {
            let data= await User.create(req.body);
            console.log(`${data.name} account created.`);            
            return res.redirect('/login');
        } catch (error) {
            console.log(error);            
        }
    },
    loginPage(req,res){
        res.render('./pages/login.ejs');
    },
    logout(req,res){
        req.logout(()=>{
            return res.redirect('/login');
        });
    },
    async getallusersPage(req,res){
        try{
            let users=await User.find({});
            return res.render('./pages/tables.ejs',{
                users
            });
        }catch(err){
            console.log(err);
            return res.redirect('/');
        }
    },
    async deactive(req,res){
        try {
            let {id}=req.params;
            let oneuser=await User.findById(id);         
            if(oneuser.isActive){
                oneuser.isActive=false;
            }else{
                oneuser.isActive=true;
            }
            await oneuser.save();
            return res.redirect('/getallusers');
        } catch (error) {
            console.log(error);
            return res.redirect('/getallusers');
        }
    },
    async active(req,res){
        try {
            let {id}=req.params;
            let oneuser=await User.findById(id);
            if(oneuser.isActive){
                oneuser.isActive=false;
            }else{
                oneuser.isActive=true;
            }
            await oneuser.save();
            return res.redirect('/getallusers');
        } catch (error) {
            console.log(error);
            return res.redirect('/getallusers');
        }
    }
};
export default adminctl;