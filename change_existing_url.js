const express = require("express");
const twilio = require("twilio");

const app = express();
const port = 3000;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(express.json());

app.post("/updatePhoneNumber", async (req, res) => {
    const { assistantURL } = req.body;

    try {
        const incomingPhoneNumber = await client
            .incomingPhoneNumbers("PN82b92bb370e00e5c303a2096c1316268")
            .update({ voiceUrl: assistantURL });

        res.json(incomingPhoneNumber.friendlyName);
    } catch (error) {
        res.status(500).json({ error: "Failed to update phone number" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// to test using curl:
// curl -X POST http://localhost:3000/updatePhoneNumber -H "Content-Type: application/json" -d "{\"assistantURL\":\"https://www.your-voice-url.com/example\"}"