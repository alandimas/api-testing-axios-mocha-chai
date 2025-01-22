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
    const response = await axios.get<ResponseData>(url);
    const userData = response.data?.data;

    expect(response.status).to.equal(200);
    expect(userData).to.have.property('id');
    expect(userData).to.have.property('email');
    expect(userData).to.have.property('first_name');
    expect(userData).to.have.property('last_name');
    expect(userData).to.have.property('avatar');
  });
});

//npx mocha -r ts-node/register api-test/getSingleUser.test.ts