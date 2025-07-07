# 🧠 TheArchives

A full-stack personal archive web app for storing the details of your purchases, items, and prescriptions so you never forget important information again.

---

## 💡 Inspiration

This app was born from a real-life need.

> Recently, our microwave broke. But we didn’t know how much it originally cost, when we bought it, or where we bought it from so comparing or replacing it was frustrating.  
>  
> Another instance was my doctor prescribed medicine, but I forgot the **name** and **dosage** later when I needed it again.  

I realized I needed a place to store this kind of item-related information for future reference and that's when **TheArchives** was created.

🧠 **Memory fails. The Archives doesn’t.**

---

## 🌐 Live Demo

👉 **Try it live here**: [CLICK HERE](https://the-archives-nine.vercel.app/)

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

## 📊 Analytics & Insights

This app isn’t just for storing data — it gives you **visual insights** about your spending:

- 💰 **Total Spent**  
- 🏆 **Top Categories**  
- 📈 **Spending by Category (Bar Chart)**  
- 📆 **Spending by Year (Line Chart)**  
- 🔍 **Custom Queries:**
  - Spending by **Tag**
  - Spending by **Year**
  - Filter items by tag or keyword

---
## ✨ Features

- ✅ Add and view items with details like:
  - Name, Tag, Price, Year, Notes, and Image
- 🔎 Search for items using keywords
- 🖼️ Fetch product images using Unsplash API
- 📝 Edit or delete saved items
- 📦 Automatically stores items in MongoDB
- 📊 See breakdowns of your purchases with graphs

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
MONGO_URI=your_mongodb_connection_string # Get Your MONGO_URI at and follow the steps: https://cloud.mongodb.com
PORT=5000

# Start backend
node server.js

# Open another terminal for frontend
cd ../frontend
npm install

# Add your .env file:
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key # get your own API key from https://unsplash.com/developers 

# Start frontend
npm run dev
