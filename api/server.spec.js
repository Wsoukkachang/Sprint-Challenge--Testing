const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig');

const Videogames = require('./serverModel');

describe('server runs testing', () => {
    it('should set test environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

// GET TESTS
describe('GET /games', () => {
    afterEach(async () => {
        await db('videogames').truncate();
    });

    it('should return status 200', async () => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
    })

    it('should return an empty array by default', async () => {
        const res = await request(server).get('/games');
        expect(res.body).toEqual([]);
    })

    it('should return test data', async () => {
        const testData = {
            id: 1,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }

        await Videogames.insert(testData);
        const res = await request(server).get('/games');
        
        expect(res.body).toEqual([testData])
    })
})

// POST TESTS
describe('POST /games', () => {
    afterEach(async () => {
        await db('videogames').truncate();
    });

    it('should return status 201 when data correct', async () => {
        const res = await request(server)
            .post('/games')
            .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        
        expect(res.status).toBe(201);
    })

    it('should return status 422 when data incorrect', async () => {
        const res = await request(server)
            .post('/games')
            .send({ title: 'Pacman', releaseYear: 1980 })
    
        expect(res.status).toBe(422);
    })

    it('should insert videogame', async () => {
        const res = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        
        const videogames = await db('videogames');
        
        expect(videogames).toHaveLength(1);
        expect(videogames[0].title).toBe('Pacman');
    })
})