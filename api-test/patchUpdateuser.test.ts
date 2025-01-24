import axios from 'axios';
import { expect } from 'chai';

describe('PATCH Update User', () => {
  const url = 'https://reqres.in/api/users/2';

  it('should update user successfully', async () => {
    const userData = {
      name: 'Alan Dimas',
      job: 'Quality Assurance',
    };

    try {
      const response = await axios.patch(url, userData);
      console.log('Response Data:');
      console.log(JSON.stringify(response.data, null, 2));

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('name', userData.name);
      expect(response.data).to.have.property('job', userData.job);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  });
});

//npx mocha -r ts-node/register --reporter spec api-test/patchUpdateuser.test.ts