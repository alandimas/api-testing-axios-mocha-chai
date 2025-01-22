import axios from 'axios';
import { expect } from 'chai';

describe('POST Login', () => {
  const url = 'https://reqres.in/api/login';

  it('should login successfully', async () => {
    const userData = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
    const response = await axios.post(url, userData);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('token');
  });

  it('should return error for invalid credentials', async () => {
    try {
      const userData = { email: 'alan_dimas@linked.in', password: 'loginsalah' };
      await axios.post(url, userData);
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });

  it('should return error for missing credentials', async () => {
    try {
      const userData = { email: 'alan_dimas@linked.in' };
      await axios.post(url, userData);
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('error');
    }
  });
});

//npx mocha -r ts-node/register api-test/postLogin.test.ts