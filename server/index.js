import express from "express";
import twilio from "twilio";
const app = express();
const port = 3001;

const accountSid = "ACa7b88449630e95f90e4c41f01a854a67";
const authToken = "606eef91b93cd8b1cdd3154e5e08fe5c";
const client = twilio(accountSid, authToken);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, DELETE, GET, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/twilio/sms", async (req, res) => {
  try {
    const textMessage = createTextMessageFromCartItems(req.body);
    const response = await client.messages.create({
      body: textMessage,
      from: "+12054486237",
      to: req.query.customerPhoneNumber,
    });
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

const createTextMessageFromCartItems = (body) => {};

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
