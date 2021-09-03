import App from './app.js'
const app = new App({ apiUrl: 'https://rickandmortyapi.com/api/character' })
await app.initialize()