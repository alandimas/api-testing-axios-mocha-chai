import axios from 'axios';
import { expect } from 'chai';

describe('GET Single User', () => {
  it('should return user data', async () => {
    const response = await axios.get('https://reqres.in/api/users/2');
    const userData = response.data.data;
    console.log('Response Data:', userData);
    expect(response.status).to.equal(200);
    expect(userData).to.have.property('id');
    expect(userData).to.have.property('email');
    expect(userData).to.have.property('first_name');
    expect(userData).to.have.property('last_name');
    expect(userData).to.have.property('avatar');
  });
});

//npx mocha -r ts-node/register api-test/getSingleUser.test.ts