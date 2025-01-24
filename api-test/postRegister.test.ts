import axios from 'axios';
import { expect } from 'chai';

describe('POST Register', () => {
  const url = 'https://reqres.in/api/register';

  it('should register successfully', async () => {
    const userData = { email: 'eve.holt@reqres.in', password: 'pistol' };

    try {
      const response = await axios.post(url, userData);

      // Menampilkan respons JSON untuk pendaftaran sukses
      console.log('Registration Successful Response:', JSON.stringify(response.data, null, 2));

      // Validasi status dan properti dalam respons
      expect(response.status).to.equal(200); // Status code untuk registrasi berhasil
      expect(response.data).to.have.property('id');
      expect(response.data).to.have.property('token');
    } catch (error: any) {
      console.error('Error during successful registration:', error.message);
      throw error;
    }
  });

  it('should return error for invalid data', async () => {
    const userData = { email: 'alan_dimas@linked.in' }; // Password tidak disertakan

    try {
      await axios.post(url, userData);
    } catch (error: any) {
      // Menampilkan respons error JSON untuk data tidak valid
      console.log('Invalid Data Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status dan properti error
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });

  it('should return error for existing user', async () => {
    const userData = { email: 'joglo@jakarta' }; // Email tidak valid, simulasi untuk error

    try {
      await axios.post(url, userData);
    } catch (error: any) {
      // Menampilkan respons error JSON untuk pengguna yang sudah ada atau data tidak valid
      console.log('Existing User Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status dan properti error
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });
});


//npx mocha -r ts-node/register --reporter spec api-test/postRegister.test.ts