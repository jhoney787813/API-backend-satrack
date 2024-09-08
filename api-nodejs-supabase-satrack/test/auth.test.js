import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app'; // Asegúrate de exportar `app` desde `src/app.js`

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message');
    expect(res.body.user).to.be.an('object');
  });

  it('should log in and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
