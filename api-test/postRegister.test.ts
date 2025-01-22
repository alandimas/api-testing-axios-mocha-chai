import axios from 'axios';
import { expect } from 'chai';

describe('POST Register', () => {
  const url = 'https://reqres.in/api/register';

  it('should register successfully', async () => {
    const userData = { email: 'eve.holt@reqres.in', password: 'pistol' };
    const response = await axios.post(url, userData);
    expect(response.status).to.equal(200); // Status code untuk registrasi berhasil
    expect(response.data).to.have.property('id');
    expect(response.data).to.have.property('token');
  });

  it('should return error for invalid data', async () => {
    try {
      const userData = { email: 'alan_dimas@linked.in' };
      await axios.post(url, userData);
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });

  it('should return error for existing user', async () => {
    try {
      const userData = { email: 'joglo@jakarta' };
      await axios.post(url, userData);
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });
});

//npx mocha -r ts-node/register api-test/postRegister.test.ts