const server = require('./api/server.js');
const PORT = 6000;

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})