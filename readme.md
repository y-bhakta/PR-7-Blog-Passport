# Blog Application with Passport Authentication

A full-featured blog application built with **Node.js**, **Express.js**, and **MongoDB**, featuring user authentication with Passport.js, blog management, and a like/unlike system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Usage](#usage)
- [Database Models](#database-models)

---

## Features

### 🔐 Authentication & Authorization
- **User Registration**: New users can create an account with email validation and unique username
- **User Login**: Secure login using Passport.js with local strategy
- **Password Hashing**: Passwords are hashed using bcrypt for security
- **Session Management**: Express sessions maintain user authentication state
- **User Status Control**: Admin can activate/deactivate user accounts

### 📝 Blog Management
- **Create Blog**: Authenticated users can create new blogs with title, description, category, and image upload
- **View All Blogs**: Browse all published blogs with author information and timestamps
- **My Blogs**: Users can view only their own published blogs
- **Edit Blog**: Update blog content and images
- **Delete Blog**: Remove blogs with automatic image file cleanup
  - **Blog Metadata**: Each blog displays creation date, category, and author name

### 🔎 Filtering & Search
- **Filter by Category**: Users can filter blogs by category from the All Blogs page.

### ❤️ Like System
- **Like Blogs**: Users can like blogs from other authors
- **Unlike Blogs**: Remove likes from previously liked blogs
- **View Liked Blogs**: Access a dedicated page showing all liked blogs
- **Duplicate Prevention**: System prevents users from liking the same blog multiple times
- **Visual Feedback**: Red heart icon shows which blogs are already liked

### 👥 User Management (Admin)
- **View All Users**: Admin dashboard to see all registered users
- **User Status Toggle**: Activate or deactivate user accounts
- **User List**: Display user information with management options

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | Passport.js (Local Strategy) |
| **Password Hashing** | bcrypt |
| **Session Management** | express-session |
| **File Upload** | multer |
| **Template Engine** | EJS |
| **Styling** | Bootstrap, Custom CSS |

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PR-7-Blog-Passport
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=your_preferred_port
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Or with nodemon for development:
   ```bash
   nodemon index.js
   ```

The application will be available at `http://localhost:<your-port>`

---

## Configuration

### Environment Variables
Add these variables to your `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db
PORT=3001
```

**Note**: Keep your `.env` file secure and never commit it to version control. Add `.env` to `.gitignore`.

---

## Project Structure

```
PR-7-Blog-Passport/
├── configs/
│   ├── config.js          # Environment configuration
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── adminctl.js        # Admin & Auth controllers
│   └── blogctl.js         # Blog controllers
├── middlewares/
│   ├── passport.js        # Passport authentication strategy
│   └── imageUpload.js     # Multer file upload config
├── models/
│   ├── usermodel.js       # User schema
│   ├── blogmodel.js       # Blog schema
│   └── likedBlogs.js      # Liked blogs schema
├── router/
│   ├── adminrouter.js     # Auth & admin routes
│   ├── blogroute.js       # Blog management routes
│   └── Rout.js            # Main route handler
├── views/
│   ├── pages/             # EJS page templates
│   └── partials/          # Reusable EJS components
├── public/                # Static assets (CSS, JS, images)
├── uploads/               # User uploaded images
└── index.js               # Application entry point
```

---

## API Routes

### Authentication Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/signup` | Show signup page | No |
| POST | `/signup` | Register new user | No |
| GET | `/login` | Show login page | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | Logout user | Yes |

### Blog Management Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/add-blogs` | Show add blog form | Yes |
| POST | `/add-blogs` | Create new blog | Yes |
| GET | `/my-blogs` | View user's blogs | Yes |
| GET | `/view-blogs` | View all blogs | Yes |
| GET | `/edit/blog/:id` | Show edit blog form | Yes |
| POST | `/editblog/:id` | Update blog | Yes |
| GET | `/delete/blog/:id` | Delete blog | Yes |

### Like System Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/like/:blogid/:userid` | Like a blog | Yes |
| GET | `/unlike/:blogid/:userid` | Unlike a blog | Yes |
| GET | `/likedblogs` | View liked blogs | Yes |

### Admin Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/` | Admin dashboard | Yes |
| GET | `/getallusers` | View all users | Yes |
| GET | `/active/:id` | Toggle user status | Yes |
| GET | `/deactive/:id` | Toggle user status | Yes |

---

## Usage

### 1. User Registration & Login
- Navigate to `/signup` to create a new account
- Enter username, email, password, and confirm password
- Passwords must match to proceed
- After signup, login at `/login` with your credentials

### 2. Creating a Blog
- After login, go to `/add-blogs`
- Fill in blog details:
  - **Title**: Blog title
  - **Description**: Blog content
  - **Category**: Blog category
  - **Image**: Upload a blog cover image
- Click "Add Blog" to publish

### 3. Viewing Blogs
- **All Blogs**: Navigate to `/view-blogs` to see all published blogs
- **My Blogs**: Go to `/my-blogs` to manage your blogs
- **Author Info**: Each blog displays the author's name and creation date

### Filtering & Search
- Use the filtering controls on the All Blogs page to narrow results by category, author, date range, or keyword.
- URL query parameters are supported. Example:

```
/view-blogs?category=Tech&author=alice&q=react&start=2025-01-01&end=2025-12-31
```

- Combine query parameters to apply multiple filters at once (e.g., category + keyword).
- The UI displays active filters and provides a clear/reset option to remove all filters.

### 4. Editing & Deleting Blogs
- In "My Blogs", click edit to modify blog content/image
- Click delete to remove a blog (image is automatically deleted)

### 5. Like System
- On the all blogs page, click the heart icon to like a blog
- The heart turns red when you've liked it
- Click the red heart to unlike
- View all your liked blogs on `/likedblogs`

### 6. Admin Features
- Access the admin dashboard at `/`
- View all registered users at `/getallusers`
- Click the status button to activate/deactivate user accounts

---

## Database Models

### User Schema
```javascript
{
  name: String (required, unique),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: 'admin', 'user', default: 'user'),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Blog Schema
```javascript
{
  title: String (required),
  description: String (required),
  category: String,
  image: String (file path),
  userID: ObjectId (reference to User),
  timestamps: true
}
```

### LikedBlogs Schema
```javascript
{
  likeblogid: ObjectId (reference to Blog, required),
  likeuserid: ObjectId (reference to User, required),
  timestamps: true
}
```

---

## Key Features Explained

### 🔒 Security
- Passwords are hashed with bcrypt (10 salt rounds)
- Passport.js handles secure authentication
- Express sessions with secure cookies
- User status validation on login (inactive users cannot login)

### 📤 File Upload
- Multer middleware handles image uploads
- Images stored in `uploads/` directory
- Automatic image cleanup when blogs are deleted

### 🔄 Like System
- Prevents duplicate likes in database
- Users can only see/manage their own likes
- Real-time heart icon feedback
- Unlike functionality removes likes completely

### 👨‍💼 Admin Controls
- Only admins can access admin dashboard
- User activation/deactivation toggle
- View all system users and their status

---

## Error Handling

The application includes try-catch blocks for:
- Database connection failures
- Authentication errors
- File upload issues
- User data validation
- Route protection for authenticated endpoints

---

## Future Enhancements

- Saved filters & advanced presets (filtering already implemented: category, author, date-range, keyword)
- Comments system
- User profile pages
- Blog sharing on social media
- Email notifications
- Rate limiting for API endpoints
- Blog categories with pagination

---

## License

This project is open source and available under the MIT License.

---

## Support

For issues or questions, please create an issue in the repository or contact the development team.
