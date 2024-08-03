BlogIt
## Introduction
BlogIt is an open-source blogging platform inspired by Medium. It provides a space for writers to share their ideas freely with minimal censorship. Users can create accounts, customize profiles, follow other accounts, and interact with blog posts through likes, comments, and saves.
Features
  User Accounts: Create and customize your profile.
  Blog Feed: View a feed of the latest blog posts.
  Interactions: Like, comment, and save posts.
  Follow System: Follow accounts and view followers.
  Post Management: View your own posts, likes, and saved posts.
  Profile Viewing: View and follow the author's account.

## Tech Stack
  Frontend: React, Redux, Tailwind CSS
  Backend: Node.js, Express
  Database: MongoDB
  Authentication: JWT, bcrypt

## How to Run
  Clone the Repository:
  git clone https://github.com/yourusername/blogit.git
  cd blogit
# Install server dependencies  
cd BackEnd
npm install
# Install client dependencies
cd FrontEnd
npm install

Setup Environment Variables:

    Create a .env file in the server directory with the following variables:
    MONGO_URL=
    CROSS_ORIGIN=
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXP=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXP=10d
    PORT=3001

Run the Application:

    # Start the server
    cd FrontEnd
    npm start

    # Start the client
    cd BackEnd
    npm run dev

    Open Your Browser:
        Visit http://localhost:5173 to see BlogIt in action.
What's Next for BlogIt
    Enhanced Features: Rich text editors, advanced search functionality.
    Mobile App: Develop a mobile version to reach a broader audience.
    Advanced Analytics: Provide analytics for blog performance and engagement.
    Tag-Based Recommendation System: Help users discover relevant content through tags.
