# React album-list
 
1. Clone the repository:
    ```bash
    git clone https://github.com/Gaurav8757/albums-list.git
    cd album-list
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Install Tailwind CSS:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
3. Run Dev & build Command:
    ```bash
    npm run dev
    npm run build
    ```



## Folder Structure
album-list/
├── public/
│       ├── redirects
│       └── img
│
├── src
│    ├── assets
│    ├── components
│    │        ├── albums
│    │        │     ├── AddAlbum.jsx
│    │        │     └── Album.jsx
│    │        ├── app
│    │        │    └── App.jsx
│    │        │
│    │        ├── header
│    │        │     └── Header.jsx
│    │        └── network
│    │              └── NetworkStatus.jsx
│    │
│    ├── App.jsx
│    ├── index.css
│    └── main.jsx
│
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js

# Dependencies
    "axios": "^1.7.2",
    "lodash.debounce": "^4.0.8",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1"


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
