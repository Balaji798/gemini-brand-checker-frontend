🌐 Brand Mention Checker – Frontend (React + Vite)

This is the frontend for the Gemini Brand Mention Checker web application.
It allows users to enter a prompt and a brand name, sends the data to the backend API, and displays whether the brand was mentioned—along with the mention position.
The app also supports CSV download of all results.

✅ Features
1. One-Page Form

Enter Prompt

Enter Brand name

Click "Check Mention"

Displays results in a clean table

2. API Integration

Uses a backend endpoint:

POST /api/check


Backend URL is configured using a Vite environment variable:

VITE_BASE_URL=https://your-backend-url

3. CSV Download

Users can download all results in a CSV file with correct CSV formatting (quoted text, commas handled, date-based filename).

4. Error Handling

Shows user-friendly error messages

Adds fallback data if API fails

Form validation included

5. Clean UI

Simple and readable

Mobile-friendly

Clear color indicators for brand mention (Yes/No)

🛠 Tech Stack

React (Vite)

Axios for API requests

CSS for styling

JavaScript ES6

🚀 Getting Started Locally
1. Install dependencies
npm install

2. Create a .env file
VITE_BASE_URL=https://your-backend-url

3. Run the project
npm run dev

📡 How the App Works
Step 1 — User submits prompt + brand name

The frontend sends:

{
  "prompt": "Give a list of best analytics tools",
  "brandName": "Matomo"
}

Step 2 — Backend returns brand match data

The frontend displays:

Prompt

Brand

Mentioned: Yes/No

Position: Number or "N/A"

Step 3 — Optional CSV Download

CSV includes:

Prompt,Brand,Mentioned,Position
"Give a list of best analytics tools","Matomo",Yes,3

📁 File Structure
src/
  App.jsx
  App.css
  main.jsx

⚙️ Environment Variable

Add in Vite:

VITE_BASE_URL=https://your-backend-url


Accessed inside code as:

import.meta.env.VITE_BASE_URL

📌 Deployment
Recommended:

Vercel Free Tier

Just connect repository → deploy

Add VITE_BASE_URL in Vercel dashboard → Environment Variables

No build configuration needed.

📝 Footer Info

The UI footer displays:

Powered by Gemini AI • Model: gemini-1.5-pro • Temperature: 0.2


(Frontend only display text — backend actually uses gemini-2.0-flash-lite)