const { test, describe } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');

describe('Autenticacion', () => {

    describe('POST /auth/login', () => {

        test('login con credenciales incorrectas devuelve 401', async (t) => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'noexites@restaurante.com',
                    password: 'mala'
                });
            assert.strictEqual(response.status, 401);
        });

        test('login sin body devuelve error', async (t) => {
            const response = await request(app)
                .post('/auth/login')
                .send({});

            assert.strictEqual(response.status, 400);
        });
    });

    describe('Rutas protegidas', () => {

        test('POST /menu  sin token devuelve 401', async (t) => {
            const response = await request(app).post('/menu').send({
                nombre: 'Test',
                precio: 10
            });
            assert.strictEqual(response.status, 401);
        });

        test('GET /menu sin token devuelva 200', async (t) => {
            const response = await request(app).get('/menu');
            assert.strictEqual(response.status, 200);
        });
    });

});

