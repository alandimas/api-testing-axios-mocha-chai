import axios from 'axios';
import { expect } from 'chai';
const { Faker } = require('@faker-js/faker/.'); 

describe('PUT Update User - GoRest API', () => {
  const url = 'https://gorest.co.in/public/v2/users/7726632'; // Endpoint untuk update user
  const token = 'a0c59800596acf5528b351e743492432379af37be9d0d756ee5698919b7918f3'; // Ganti dengan akses token API Gorest Terbaru

  it('should update user successfully', async () => {
    const updatedUserData = {
      name: 'Alan Dimas',
      email: `alan_dimas@green.test`, // Email harus unik
      gender: 'male',
      status: 'inactive',
    };

    try {
      const response = await axios.put(url, updatedUserData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      // Menampilkan respons JSON di terminal
      console.log('Update User Successful Response:', JSON.stringify(response.data, null, 2));

      // Validasi status HTTP
      expect(response.status).to.equal(200);

      // Validasi properti di dalam respons
      expect(response.data).to.have.property('id');
      expect(response.data).to.have.property('name', updatedUserData.name);
      expect(response.data).to.have.property('email', updatedUserData.email);
      expect(response.data).to.have.property('gender', updatedUserData.gender);
      expect(response.data).to.have.property('status', updatedUserData.status);
    } catch (error: any) {
      console.error('Error during user update:', error.message);
      throw error;
    }
  });

  it('should return error for invalid user ID', async () => {
    const invalidUrl = 'https://gorest.co.in/public/v2/users/9999999'; // ID pengguna tidak valid
    const updatedUserData = {
      name: 'Invalid User',
      email: `invalid_user_${Date.now()}@example.com`,
      gender: 'female',
      status: 'inactive',
    };

    try {
      await axios.put(invalidUrl, updatedUserData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      // Menampilkan respons error JSON di terminal
      console.log('Invalid User ID Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status HTTP untuk error
      expect(error.response.status).to.equal(404);

      // Memastikan pesan error sesuai ekspektasi
      expect(error.response.data).to.have.property('message', 'Resource not found');
    }
  });

  it('should return error for missing authorization token', async () => {
    const updatedUserData = {
      name: 'No Token User',
      email: `notoken_user_${Date.now()}@example.com`,
      gender: 'male',
      status: 'active',
    };

    try {
      await axios.put(url, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      // Menampilkan respons error JSON di terminal
      console.log('Missing Authorization Token Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status HTTP untuk error
      expect(error.response.status).to.equal(401);

      // Memastikan pesan error sesuai ekspektasi
      expect(error.response.data).to.have.property('message', 'Authentication failed');
    }
  });
});
//npx mocha -r ts-node/register --reporter spec api-test/putUpdateuser.test.ts