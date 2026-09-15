import request from 'supertest';
import app from '../index';
import { response } from 'express';

describe('POST /login', () => {
  it('returns 401 with invalid credentials', async() => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'wrong' });

    expect(response.status).toBe(401);
  });
});


describe('POST /clients', () => {
  it('returns 401 with no auth provided', async() => {
    const response = await request(app)
      .post('/clients')
      .send({ first_name: 'Brandon', last_name: 'Benoit', status: 'active' });
    expect(response.status).toBe(401)

  });

  it('returns 200 with auth provided', async() => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ username: 'Brandon', password: process.env.TEST_PASSWORD })
  
    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({ first_name: 'Brandon', last_name: 'Benoit', status: 'active' });
    
    expect(response.status).toBe(200);
  });

});


describe('GET /services', () => {
  it('returns 200 and array', async() => {
    const response = await request(app)
      .get('/services')
    expect(response.status).toBe(200);
  })

});


describe('POST /services', () => {
  it('returns 401 with no auth provided', async() => {
    const response = await request(app)
      .post('/services')
      .send({ treatment: 'Custom massage', price: '175', duration: '90' })
    
    expect(response.status).toBe(401);

  });

  it('returns 200 with auth provided', async() => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ username: 'Brandon', password: process.env.TEST_PASSWORD })
  
    
      const token = loginResponse.body.token;
    
      const response = await request(app)
        .post('/services')
        .set('Authorization', `Bearer ${token}`)
        .send({ treatment: 'Custom massage', price: '175', duration: '90' })
      expect(response.status).toBe(200)
    });

});


describe('POST /staff', () => {
  it('returns 401 with no auth provided', async() => {
    const response = await request(app)
      .post('/staff')
      .send({ first_name: 'Brandon', last_name: 'Benoit' })
    expect(response.status).toBe(401);
  });
  
  it('returns 200 with auth provided', async() => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ username: 'Brandon', password: process.env.TEST_PASSWORD })
    
    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/staff')
      .set('Authorization', `Bearer ${token}`)
      .send({ first_name: 'Brandon', last_name: 'Benoit' })
    expect(response.status).toBe(200)
  });
})