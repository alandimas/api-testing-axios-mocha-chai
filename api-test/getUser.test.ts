import axios from 'axios';
import { expect } from 'chai';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

describe('GET All Users', () => {
  const url = 'https://reqres.in/api/users';

  it('should get all users successfully', async () => {
    try {
      const response = await axios.get<UsersData>(url);
      console.log('Response Data:');
      // Menampilkan JSON respons di terminal dengan format rapi
      console.log(JSON.stringify(response.data, null, 2));
      // Validasi status kode
      expect(response.status).to.equal(200);
      // Validasi properti dalam respons
      expect(response.data).to.have.property('page');
      expect(response.data).to.have.property('per_page');
      expect(response.data).to.have.property('total');
      expect(response.data).to.have.property('total_pages');
      expect(response.data).to.have.property('data');
      // Validasi properti "data" sebagai array dan panjangnya
      expect(response.data.data).to.be.an('array');
      expect(response.data.data.length).to.be.above(2);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  });

  it('should return error for invalid page', async () => {
    try {
      await axios.get('https://reqres.in/api/users?page=1000');
    } catch (error: any) {
      console.log('Error Response:');
      console.log(JSON.stringify(error.response.data, null, 2));
      expect(error.response.status).to.equal(404);
    }
  });
});
//npx mocha -r ts-node/register --reporter spec api-test/getUser.test.ts