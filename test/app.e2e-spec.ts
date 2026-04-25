import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from "../src/common/http-exception.filter";


describe('Restaurante NestJS - Integración', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Test1-Flujo de autentcacion", () => {
    it("POST /auth/register → 201 con usuario sin password", async () => {
      const res = await request(app.getHttpServer())
        .post("/auth/register")
        .send({ name: "Mesero Test", email: "test5259@rest.com", password: "123456" });

      expect(res.status).toBe(201);
      expect(res.body.password).toBeUndefined();
    });

    it("POST /auth/register email duplicado → 409", async () => {
      const res = await request(app.getHttpServer())
        .post("/auth/register")
        .send({ name: "Otro", email: "test5259@rest.com", password: "123456" });
      expect(res.status).toBe(409);
    });

    it("POST /auth/login → 200 con access_token", async () => {
      const res = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "test5259@rest.com", password: "123456" });
      expect(res.status).toBe(200);
      expect(res.body.accessToken).toBeDefined();
      token = res.body.accessToken;
    });

    it("POST /auth/login contraseña incorrecta → 401", async () => {
      const res = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "test5259@rest.com", password: "incorrecta" });
      expect(res.status).toBe(401);
    });
  });


  describe("Test 2 — Flujo de validaciones", () => {

    it("POST /auth/register body vacío → 400", async () => {
      const res = await request(app.getHttpServer()).post("/auth/register").send({});
      expect(res.status).toBe(400);
    });

    it("POST /api/pedidos sin token → 401", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/pedidos")
        .send({ tipo: "para_llevar" });
      expect(res.status).toBe(401);
    });

    it("POST /api/pedidos con token y tipo inválido → 400", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/pedidos")
        .set("Authorization", `Bearer ${token}`)
        .send({ tipo: "invalido" });
      expect(res.status).toBe(400);
    });

  });

});
