const express = require('express');
const Videogames = require('./serverModel');
const server = express();
server.use(express.json());

server.get('/games', async (req, res) => {
    const videogames = await Videogames.get();
    res.status(200).json(videogames);
})

server.post('/games', async (req, res) => {
    try {
        const { title, genre } = req.body;
        
        if(title && genre) {
            const videogame = await Videogames.insert(req.body);
            res.status(201).json(videogame);
        } else {
            res.status(422).json({ message: "Please provide all required info" })
        }

    } catch(err) {
        res.status(500).json({ error: 'Error adding data' })
    }
})

module.exports = server; 