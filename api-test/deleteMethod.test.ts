import axios from 'axios';
import { expect } from 'chai';

describe('DELETE User - Reqres API', () => {
  const url = 'https://reqres.in/api/users/2'; // Endpoint untuk menghapus user

  it('should delete user successfully', async () => {
    try {
      const response = await axios.delete(url);

      // Menampilkan respons JSON di terminal
      console.log('Delete User Response:', JSON.stringify(response.data, null, 2));

      // Validasi status HTTP
      expect(response.status).to.equal(204); // Status 204 menandakan sukses tanpa konten
    } catch (error: any) {
      console.error('Error during user deletion:', error.message);
      throw error;
    }
  });

  it('should return error for invalid user ID', async () => {
    const invalidUrl = 'https://reqres.in/api/users/9999'; // ID pengguna tidak valid

    try {
      await axios.delete(invalidUrl);
    } catch (error: any) {
      // Menampilkan respons error JSON di terminal
      console.log('Invalid User ID Error Response:', JSON.stringify(error.response?.data, null, 2));

      // Validasi status HTTP untuk error
      expect(error.response.status).to.equal(404); // 404 untuk user tidak ditemukan

      // Memastikan respons error kosong
      expect(error.response.data).to.be.empty;
    }
  });
});
//npx mocha -r ts-node/register --reporter spec api-test/deleteMethod.test.ts