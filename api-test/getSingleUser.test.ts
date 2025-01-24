import axios from 'axios';
import { expect } from 'chai';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ResponseData {
  data: UserData;
}

describe('GET Single User', () => {
  const url = 'https://reqres.in/api/users/2';

  it('should get single user', async () => {
    try {
      const response = await axios.get<ResponseData>(url);
      const userData = response.data?.data;

      console.log('Response Data:');
      console.log(JSON.stringify(response.data, null, 2));

      console.log('\nUser Data:');
      console.log(JSON.stringify(userData, null, 2));

      expect(response.status).to.equal(200);
      expect(userData).to.have.property('id');
      expect(userData).to.have.property('email');
      expect(userData).to.have.property('first_name');
      expect(userData).to.have.property('last_name');
      expect(userData).to.have.property('avatar');
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  });
});
//npx mocha -r ts-node/register --reporter spec api-test/getSingleUser.test.ts