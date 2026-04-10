const { test, describe } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');

describe('Rutas del menu', () => {

    test('GET /menu  devuelva 200 y un array', async (t) => {
        const response = await request(app).get('/menu');
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));
    });

    test('GET /menu/buscar sin ? nombre= devuelve 400', async (t) => {
        const response = await request(app).get('/menu/buscar');
        assert.strictEqual(response.status, 400);
    });

    test('GET /menu/:id con id invalido devuelva 500', async (t) => {
        const response = await request(app).get('/menu/id-que-no-existe');
        assert.strictEqual(response.status, 500);
    });

    test('GET /menu devuelva  el menu correcto', async (t) => {
        const response = await request(app).get('/menu');
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));
    });
});