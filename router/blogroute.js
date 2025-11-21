import { Router } from "express";
import blogctl from "../controllers/blogctl.js";
import uploadImage from "../middlewares/imageUpload.js";

const router = Router();

router.get('/add-blogs',blogctl.addblogPage);
router.post('/add-blogs',uploadImage,blogctl.addblog);
router.get('/my-blogs',blogctl.myblogPage);
router.get('/delete/blog/:id',blogctl.deleteblog);
router.get('/edit/blog/:id',blogctl.editblogPage);
router.post('/editblog/:id',uploadImage,blogctl.editblog);
router.get('/view-blogs',blogctl.viewblogPage);
router.get('/likedblogs',blogctl.likedblogsPage)
router.get('/like/:blogid/:userid',blogctl.likeblog);
router.get('/unlike/:blogid/:userid',blogctl.unlikeblog);
router.get('/food-blogs',blogctl.foodblogspage);
router.get('/lifestyle-blogs',blogctl.lifestyleblogspage);
router.get('/travel-blogs',blogctl.travelblogspage);

export default router;