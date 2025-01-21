import axios from 'axios';
import { expect } from 'chai';

describe('PATCH Update User', () => {
  const url = 'https://reqres.in/api/users/2';
  it('should update user successfully', async () => {
    const userData = {
      name: 'Alan Dimas',
      job: 'Quality Assurance'
    };
    const response = await axios.patch(url, userData);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('name', userData.name);
    expect(response.data).to.have.property('job', userData.job);
  });
});

//npx mocha -r ts-node/register api-test/patchUpdateuser.test.ts