import { Router } from "express";
import adminctl from "../controllers/adminctl.js";
import passport, { userAuth } from "../middlewares/passport.js";

const adminrouter=Router();
adminrouter.get('/signup',adminctl.signupPage);
adminrouter.post('/signup',adminctl.signup);
adminrouter.get('/login',adminctl.loginPage);
adminrouter.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}));

// adminrouter.use(userAuth);
adminrouter.use(userAuth);
adminrouter.get('/',adminctl.dashboard);
adminrouter.get('/logout',adminctl.logout);
adminrouter.get('/getallusers',adminctl.getallusersPage);
adminrouter.get('/deactive/:id',adminctl.deactive);
adminrouter.get('/active/:id',adminctl.active);
export default adminrouter;