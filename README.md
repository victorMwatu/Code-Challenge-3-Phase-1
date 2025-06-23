# Code Challenge 3 Phase 1 Simple Blog/Post Manager

# Blog Manager - Code Challenge 3 Submission

## Description
This is my submission for Code Challenge 3, which involved building a simple blog post management application. The project implements a frontend interface that communicates with a local JSON server API to perform CRUD operations on blog posts.

## Features Implemented
- **View all posts**: Display list of blog post titles and images
- **View post details**: Click on any post to see full content, title, and author
- **Add new posts**: Form submission to create new blog posts
- **Edit posts**: Update existing post title and content
- **Delete posts**: Remove posts from the database
- **Persistence**: Data changes persist using JSON Server backend
- **Dynamic DOM manipulation**: Real-time updates without page refresh

## Project Structure
```
project-folder/
├── index.html          # Main HTML structure
├── src/
│   └── index.js        # JavaScript logic and API calls
├── css/
│   └── styles.css      # Styling
├── images/             # Image assets
├── package.json        # Project dependencies and scripts
└── db.json            # Mock database for json-server
```

## Core Deliverables Completed
✅ Display all blog posts on page load  
✅ Show post details when clicking on titles  
✅ Add new blog posts via form submission  
✅ Edit and delete posts  
✅ Main function to initialize the application  

## API Endpoints Used
- `GET /posts` - Fetch all blog posts
- `GET /posts/:id` - Fetch single post by ID
- `POST /posts` - Create new blog post
- `PATCH /posts/:id` - Update existing blog post
- `DELETE /posts/:id` - Delete a blog post

## Technologies Used
- JavaScript (ES6+)
- JSON Server for mock API
- HTML5 & CSS3
- Live Server for development

## Setup Instructions
1. Install dependencies: `npm install` or install json-server globally: `npm install -g json-server`
2. Start the API: `npm run server:start`
3. Start frontend: `live-server`
4. Navigate to `http://localhost:5500`

Base API URL: `http://localhost:3000`
<br>
<br>
Author: Victor N. Mwatu.<br>
License: This project was created as part of a course assignment and is not licensed for redistribution or commercial use.<br>
Date: 23.06.2025