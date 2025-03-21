# Authentication Server

This is the backend API server for the Authentication system.

## Deployment Instructions

### Local Development
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`

### Production Deployment
1. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Select the server directory as the source
   - Vercel will automatically detect the vercel.json file and deploy accordingly
   
2. Set Environment Variables in Vercel Dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - CLIENT_URL (URL of the deployed client)
   - SMTP_USER
   - SMTP_PASS
   - SENDER_EMAIL

## API Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login a user
- GET `/api/auth/logout` - Logout the current user
- GET `/api/user/profile` - Get the current user's profile 