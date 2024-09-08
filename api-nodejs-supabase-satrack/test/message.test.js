const request = require('supertest');
const app = require('../src/app.js');
const chai = require('chai');
const expect = chai.expect;

let token;

before(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123'
    });

  token = res.body.token;
});

describe('Message Endpoints', () => {
  it('should post a new message', async () => {
    const res = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'prueba, de publicación de mensaje'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message');
    expect(res.body.data).to.be.an('array');
  });
});
