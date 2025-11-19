import env from 'dotenv';
env.config();
const dotenv={
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI
}
export default dotenv;