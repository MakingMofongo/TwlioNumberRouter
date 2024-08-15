const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function findNumbers(countryCode) {
    const locals = await client.availablePhoneNumbers(countryCode).local.list({
        limit: 20,
    });

    locals.forEach((l) => console.log(l.friendlyName));
}

module.exports = {
    findNumbers
};
