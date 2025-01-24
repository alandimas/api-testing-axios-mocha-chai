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
  const url = 'https://kitabisa.xyz/user';

  it('should get all users successfully', async () => {
    const response = await axios.get<UsersData>(url);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('page');
    expect(response.data).to.have.property('per_page');
    expect(response.data).to.have.property('total');
    expect(response.data).to.have.property('total_pages');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.be.an('array');
    expect(response.data.data.length).to.be.above(2);
  });
  it('should return error for invalid page', async () => {
    try {
      await axios.get('https://kitabisa.xyz/user?page=1000');
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
    }
  });
});
//npx mocha -r ts-node/register --reporter spec api-test/getUserkitabisa.test.ts