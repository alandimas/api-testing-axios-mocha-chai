const axios = require("axios");
const {expect} = require("chai");

describe("GET API Request", async() => {
    it("should be able to get user list", async() => {
        const res = await axios.get('https //reqres.in/api/users page=2');
        console.log(res.data);
    })
})
//npx mocha ./api-test/get_request.js --timeout=30000