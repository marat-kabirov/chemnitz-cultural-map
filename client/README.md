## Chemnitz Cultural Map

An interactive web application mapping cultural places in Chemnitz Germany using open data from OpenStreetMap (via Overpass API). Users can register, filter, browse and save favorites.

## Project Structure

chemnitz-cultural-map/
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ │ ├── auth.js
│ │ │ ├── favorites.js
│ │ │ └── places.js
│ │ ├── db.js
│ │ ├── index.js
│ │ └── importPlacesFromGeoJSON.js
│ │ └── init.sql
├── client/
│ ├── src/
│ │ ├── App.js
│ │ ├── MainPage.js
│ │ ├── MapView.jsx
│ │ ├── PlaceItem.jsx
│ │ ├── PlaceList.jsx
│ │ ├── PlaceDetails.jsx
│ │ ├── FavoritesList.jsx
│ │ ├── FavoritesPage.jsx
│ │ ├── HeaderBar.jsx
│ │ ├── AuthPage.jsx
│ │ ├── AuthContext.jsx
│ │ └── FavoritesContext.js

## Features

1. Displays cultural places 
2. Uses real open data from Overpass API (OpenStreetMap)
3. Shows places on an interactive map (Leaflet)
4. User authentication (JWT)
5. Save/remove favorite places
6. Responsive design
7. RESTful API with PostgreSQL backend

## Database Schema (PostgreSQL)

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Places
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    osm_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    address TEXT,
    rating NUMERIC,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## API Endpoints

Auth (/api/auth)

    POST /register – Register new user

    POST /login – Login and receive JWT token

Places (/api/places)

    GET / – Get all places

    GET /:id – Get place by ID

    GET /search?q=term – Search places by keyword

Favorites (/api/favorites)

    GET / – Get all favorite places (auth required)

    POST /:placeId – Add place to favorites

    DELETE /:placeId – Remove from favorites

    All /favorites routes require a valid JWT token

## Technologies used

Frontend: React, Leaflet, Context API
Backend: Node.js, Express, JWT, bcrypt
Database: PostgreSQL
Data Source: OpenStreetMap via Overpass API

## Running the Project

1. Setup PostgreSQL

# Set DATABASE_URL in .env file
DATABASE_URL=postgresql://user:password@localhost:5432/cultural_places_db

2. Backend 

cd backend
npm install
npm run dev

3. Frontend 

cd client
npm install
npm start

## Author

Kabirov Marat  
Web Engineering M.Sc
Matriculation Number - 858818






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


