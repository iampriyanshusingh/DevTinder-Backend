# DEVTINDER

DEVTINDER is a full MERN (MongoDB, Express.js, React.js, Node.js) stack application that functions as a platform to connect developers. It's not just a Tinder clone but a unique, functional app tailored for developers, fostering meaningful professional connections, collaborations, and discussions.

## Features

- **Authentication:** Secure user authentication using JWT and bcrypt.
- **Developer Profiles:** Customizable profiles showcasing skills, projects, and interests.
- **Matching System:** Match developers based on shared interests, tech stacks, and collaboration goals.
- **Chat System:** Real-time messaging powered by Socket.IO.
- **Project Collaboration:** Option to post or join ongoing projects.
- **Technology Filters:** Search and match developers by specific technologies or programming languages.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

### Frontend:
- React.js with Tailwind CSS for styling.
- React Router for navigation.

### Backend:
- Node.js with Express.js for API and server management.
- MongoDB for database management.
- Socket.IO for real-time communication.

### Additional Tools:
- JWT for authentication.
- bcrypt for password hashing.
- Axios for API calls.
- Cloudinary (or similar) for image uploads.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DEVTINDER.git
   cd DEVTINDER
   ```

2. Install dependencies:
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```
     PORT=5000
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_URL=your_cloudinary_url
     ```

4. Run the application:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd ../frontend
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
DEVTINDER/
├── backend/
│   ├── config/         # Database and configuration files
│   ├── controllers/    # API logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Helper functions
│   │   └── App.js      # Main React app file
├── .gitignore          # Files to ignore in Git
├── README.md           # Project documentation
└── package.json        # Dependency manager files
```

## Future Enhancements

- **AI Recommendations:** Suggest matches based on developer activity and skills.
- **Integrated Calendar:** Schedule meetings or coding sessions.
- **Gamification:** Badges and points for contributions and collaborations.
- **Mobile App:** Extend the platform to iOS and Android.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request. Ensure your changes are well-documented.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- The open-source community for tools and libraries.
- Inspiration from the developer community's need for professional networking.

## Contact

For queries or suggestions, feel free to reach out:
- Email: singhpriyanshu086@gmail.com
- LinkedIn: https://www.linkedin.com/in/iampriyanshusingh/
