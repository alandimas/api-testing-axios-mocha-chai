import axios from 'axios';
import { expect } from 'chai';

describe('POST Login', () => {
  const url = 'https://reqres.in/api/login';

  it('should login successfully', async () => {
    const userData = { email: 'eve.holt@reqres.in', password: 'cityslicka' };

    try {
      const response = await axios.post(url, userData);

      // Menampilkan respons JSON di terminal
      console.log('Login Successful Response:', JSON.stringify(response.data, null, 2));

      // Validasi status dan properti dalam respons
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('token');
    } catch (error: any) {
      console.error('Error during login:', error.message);
      throw error;
    }
  });

  it('should return error for invalid credentials', async () => {
    const userData = { email: 'alan_dimas@linked.in', password: 'loginsalah' };

    try {
      await axios.post(url, userData);
    } catch (error: any) {
      // Menampilkan respons error JSON di terminal
      console.log('Invalid Credentials Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status dan properti error
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });

  it('should return error for missing credentials', async () => {
    const userData = { email: 'alan_dimas@linked.in' }; // Password tidak disertakan

    try {
      await axios.post(url, userData);
    } catch (error: any) {
      // Menampilkan respons error JSON di terminal
      console.log('Missing Credentials Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status dan properti error
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });
});


//npx mocha -r ts-node/register --reporter spec api-test/postLogin.test.ts