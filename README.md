# 🧠 TheArchives

A full-stack personal archive web app for storing the details of your purchases, items, and prescriptions — so you never forget important information again.

---

## 💡 Inspiration

This app was born from a real-life need.

> Recently, our microwave broke. But we didn’t know how much it originally cost, when we bought it, or where we bought it from so comparing or replacing it was frustrating.  
>  
> Another instance was my doctor prescribed medicine, but I forgot the **name** and **dosage** later when I needed it again.  

I realized I needed a place to store this kind of item-related information for future reference and that's when **TheArchives** was created.

---

## 🌐 Live Demo

👉 **Try it live here**: [.](https://the-archives-nine.vercel.app/)

---

## 📦 Features

- Add, edit, and delete items like appliances, tools, prescriptions, or purchases
- Save details: **name**, **year**, **price**, **notes**, and **tag**
- Auto-fetch a relevant image using the **Unsplash API**
- View all archived items in a clean, organized layout
- Built with responsiveness in mind for both desktop and mobile

---

## 🧰 Tech Stack

| Layer      | Technology                     |
|------------|---------------------------------|
| Frontend   | React + Vite + Axios + CSS      |
| Backend    | Node.js + Express + Mongoose    |
| Database   | MongoDB Atlas                   |
| Image API  | Unsplash                        |
| Hosting    | Vercel (Frontend), Render (Backend) |

---

## ⚙️ Local Setup

Want to try it locally?

```bash
# Clone the repo
git clone https://github.com/mohamedasad10/TheArchives.git

# Go into the backend folder
cd TheArchives/backend
npm install

# Add your environment variables in a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Start backend
node server.js

# Open another terminal for frontend
cd ../frontend
npm install

# Add your .env file:
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key

# Start frontend
npm run dev
