require('dotenv').config();

const server = require('./api/server.js');
const PORT = 7070;

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})