# BookIt - Experiences & Slots Booking Platform

A complete MERN stack application for booking travel experiences with date/time selection and checkout flow.

## Features

- Browse curated travel experiences
- Select dates and time slots
- Apply promo codes
- Complete checkout with user details
- Booking confirmation with reference ID

## Tech Stack

- **Frontend**: React.js (JavaScript), React Router, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Build Tool**: Vite

## Project Structure

\`\`\`
bookit/
├── server/
│   ├── server.js
│   └── package.json
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Details.jsx
    │   │   ├── Checkout.jsx
    │   │   └── Confirmation.jsx
    │   ├── components/
    │   │   └── Header.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
\`\`\`

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
   \`\`\`bash
   cd server
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/bookit
   PORT=5000
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Seed data (optional):
   \`\`\`bash
   curl -X POST http://localhost:5000/api/seed
   \`\`\`

### Frontend Setup

1. Navigate to client directory:
   \`\`\`bash
   cd client
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open http://localhost:5173 in your browser

## API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details
- `POST /api/promo/validate` - Validate promo code
- `POST /api/bookings` - Create booking
- `POST /api/seed` - Seed sample data

## Promo Codes

- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `FLAT100` - ₹100 flat discount

## Deployment

Deploy backend to Render/Railway and frontend to Vercel for production use.
