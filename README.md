# 🗺️ Chemnitz Cultural Map

An interactive full-stack web application mapping cultural places in Chemnitz, Germany. Uses real open data from OpenStreetMap, with user authentication and favorites system.

**[Live Demo](#)** <!-- сюда потом вставишь ссылку после деплоя -->

## Features

- Interactive map with 200+ cultural locations (Leaflet + OpenStreetMap)
- Filter by category: museums, galleries, theatres, restaurants, hotels and more
- User registration and login (JWT authentication)
- Save and manage favorite places
- Search by name or category
- Responsive design

## Tech Stack

**Frontend:** React, Leaflet, Context API  
**Backend:** Node.js, Express, JWT, bcrypt  
**Database:** PostgreSQL  
**Data Source:** OpenStreetMap via Overpass API  

## Project Structure
```
chemnitz-cultural-map/
├── backend/
│   └── src/
│       ├── routes/        # auth, places, favorites
│       ├── db.js
│       └── index.js
└── client/
    └── src/               # React components
```

## Running Locally
```bash
# Backend
cd backend
cp .env.example .env      # set DATABASE_URL
npm install
npm start

# Frontend
cd client
npm install
npm start
```

## Author

**Marat Kabirov** — [GitHub](https://github.com/marat-kabirov) · [LinkedIn](https://linkedin.com/in/marat-kabirov)
