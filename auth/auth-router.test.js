const request = require('supertest');
const User = require('./userModel');

const server = require('../api/server');
const db = require('../database/dbConfig');

describe('server test', function(){
    beforeEach( async () => {
        await db('users').truncate();
    });

    it('db environment test', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('should return 201 created', () => {
        return request(server).post('/api/auth/register')
        .send({
            username: 'test1',
            password: 'test1'
        })
        .then(res => expect(res.status).toBe(201));
    })

    // describe('addUser() for regisger', () => {
        it('post /api/auth/register', async () => {
            await User.addUser({
                username: 'test1',
                password: 'test2'
            })

            const userDb = await db('users');
            expect(userDb).toHaveLength(1);
        })
    // })
    it('should return 200 for login', () => {
        return request(server).post('/api/auth/login')
        .send({
            username: 'test1'
  
        }).then(res => expect(res.status).toBe(401))
    })

    it('should return correct username', async () => {
        const user = await User.findByUser('test1');
        expect(user).toMatch(/test1/);

    })

})