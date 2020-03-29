var request = require("request");
var env = require("dotenv-json")();

export function createCustomer(paymentMethod) {
  return request(
    {
      method: "POST",
      url: process.env.SERVER + "/billing/create-customer/",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.ACCESS_ID
      },
      body: paymentMethod
    },
    function(error, response, body) {
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
    }
  );
}

export function designSubscription(requirements) {
  return request(
    {
      method: "POST",
      url: process.env.SERVER + "/billing/design-subscription/",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.ACCESS_ID
      },
      body: requirements
    },
    function(error, response, body) {
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
    }
  );
}
