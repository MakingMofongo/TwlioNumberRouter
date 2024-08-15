const express = require("express");
const twilio = require("twilio");
const { findNumbers } = require("./findNumber");

const app = express();
const port = 3000;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(express.json());

app.post("/incomingPhoneNumber", async (req, res) => {
    try {
        const { country, voiceUrl } = req.body;

        // Call the findNumber function to get a phone number
        const number = await findNumbers(country);

        const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
            phoneNumber: number,
            voiceUrl: voiceUrl,
        });

        res.json({ accountSid: incomingPhoneNumber.accountSid });
    } catch (error) {
        res.status(500).json({ error: "Failed to create incoming phone number" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});