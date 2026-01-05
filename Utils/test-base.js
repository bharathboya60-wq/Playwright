import { test } from '@playwright/test';

const Customtest = test.extend({
    placeOrderData : {
    product : "ADIDAS ORIGINAL",
    loginMail : "Thalaivar@shivaji.com",
    Password : "Thalaivar@27"
    }
});

module.exports = {Customtest};