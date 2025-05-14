import request from 'supertest';
import app from '../server';
import { AuthTest } from './test-utils';

// npx jest -t "[Login]" 
describe('[Login] POST /api/register', () => {
    beforeAll(async () => {
        await AuthTest.deleteAll();
    });

    afterEach(async () => {
        await AuthTest.deleteAll();
    });

    it('success - should return user data', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({
                name: 'Raka Febrian Syahputra',
                nim: '222410101050',
                password: 'password',
                role: 'student',
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(201);
        expect(res.body.message).toBeDefined();
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.nim).toBe('222410101050');
        expect(res.body.data.name).toBe('Raka Febrian Syahputra');
        expect(res.body.data.role).toBe('student');
    });

    it('failed - should fail for user is already exists', async () => {
        await AuthTest.create({
            name: 'Raka Febrian Syahputra',
            nim: '222410101050',
            password: 'password',
            role: 'student',
        });
        const res = await request(app)
            .post('/api/register')
            .send({
                name: 'Raka Febrian Syahputra',
                nim: '222410101050',
                password: 'password',
                role: 'student',
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body.errors.name).toBe('Validation Error');
        expect(res.body.errors.message).toBe('NIM is already exists');
    });
});

// npx jest -t "[Register]" 
describe('[Register] POST /api/login', () => {
    beforeAll(async () => {
        await AuthTest.create({
            name: 'Raka Febrian Syahputra',
            nim: '222410101050',
            password: 'password',
            role: 'student',
        });
    });

    afterEach(async () => {
        await AuthTest.deleteAll();
    });

    it('success - should return token', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                'nim': '222410101050',
                'password': 'password'
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body.message).toBeDefined();
        expect(res.body.token).toBeDefined();
    });

    it('failed - should fail for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                "nim": "222410101050",
                "password": "wrong"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body.errors.name).toBe('Validation Error');
        expect(res.body.errors.message).toBe('Invalid credentials');
    });
});