import bodyParser from "body-parser";
import express from "express";
import twilio from "twilio";
import cors from "cors";

const app = express();
const port = 4000;

// @purpose: map to keep track of orders that need to be sent to the restaurant
// orders will be deleted 10 minutes after it has been made
let masterOrderMap = {};

const accountSid = process.env.TWILIO_KINGDO_ACCOUNT_SID;
const authToken = process.env.TWILIO_KINGDO_AUTH_TOKEN;
const restaurantNumber = process.env.KINGDO_RESTAURANT_NUMBER;
const frontendUrl = process.env.KINGO_FRONTEND_BASEURL;
const client = twilio(accountSid, authToken);

// @purpose: used for local dev testing
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const middleward = (req, res, next) => {
  if (req.get("origin") !== frontendUrl) {
    return res.status(400).send("You are not allowed to access this API");
  }
  next();
};

app.use(middleward);

// @purpose: tester endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// @purpose: receives the list of items in body and we to sendable text
app.post("/twilio/sms", async (req, res) => {
  try {
    const textMessage = createTextMessageFromCartItems(
      req.body,
      req.query.firstName,
      req.query.transportationMethod
    );
    const response = await client.messages.create({
      body: textMessage,
      from: "+18305496515",
      to: req.query.customerPhoneNumber,
    });

    masterOrderMap[req.query.customerPhoneNumber] = {
      order: req.body,
      personName: `${req.query.firstName} ${req.query.lastName}`,
      transportationMethod: req.query.transportationMethod,
      address:
        req.query.transportationMethod === "delivery"
          ? req.query.deliveryAddress
          : "",
    };
    // if response is correct, we add it to to map and wait for response
    // else (being a non registered number) we sent it straight to the restaurant
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.post("/twilio/sms/response/confirm", async (req, res) => {
  // Init the messaging response
  const MessagingResponse = twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();
  try {
    if (req.body.Body !== "CONFIRM" && !masterOrderMap[req.body.From]) {
      throw Error("bad_reply");
    }
    const orderInfo = masterOrderMap[req.body.From];
    const confirmedMessage = `Thank you for confirming your order. Your order is being prepared and we will send you when it is ready for ${
      orderInfo.transportationMethod === "deliver" ? "delivery" : "pick up"
    }`;

    // send the message
    twiml.message(confirmedMessage);
    // send text to the restaurant
    const response = await client.messages
      .create({
        body: createTextMessageFromCartItemsToRestaurant(orderInfo),
        from: "+18305496515",
        to: restaurantNumber,
      })
      .then((response) => {
        delete masterOrderMap[req.body.From];
      });

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    if (error.message === "bad_reply") {
      twiml.message("Sorry but you sent a bad reply.");
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    } else {
      twiml.message("Sorry but something went wrong.");
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    }
  }
});

const createTextMessageFromCartItems = (
  { stackItems, cartItemsAmount },
  firstName,
  transportationMethod
) => {
  let masterString = `Hi ${firstName},\n\nThis text message was sent to you to confirm the placement of your order. It is to be ${
    transportationMethod === "delivery" ? "delivered" : "picked up"
  }. You have a total of ${cartItemsAmount} items. Here is your order information:\n`;
  let listOfItemsString = "";
  let confirmationString = `Please reply CONFIRM so we can start preparing your order.\n\nThank you for supporting us. We'll see you soon!`;
  stackItems.forEach((item) => {
    const itemString = makeItem(item.item, item.quantity);
    listOfItemsString += itemString;
    listOfItemsString += "\n";
  });
  listOfItemsString += "\n";
  masterString += listOfItemsString;
  masterString += confirmationString;
  return masterString;
};

const createTextMessageFromCartItemsToRestaurant = ({
  order,
  personName,
  transportationMethod,
  address,
}) => {
  let masterString = `New ${transportationMethod} order:\n\nName: ${personName}\n\n${
    transportationMethod === "delivery" ? `Address: ${address}\n\n` : ""
  }`;
  let listOfItemsString = "";
  order.stackItems.forEach((item) => {
    const itemString = makeItem(item.item, item.quantity);
    listOfItemsString += itemString;
    listOfItemsString += "\n";
  });
  listOfItemsString += "\n";
  masterString += listOfItemsString;
  return masterString;
};

const makeItem = ({ name, price, menuItemNumber }, quantity) => {
  return `\t\n ${menuItemNumber}: ${name}\t\n ${price}\t\n Quantity: ${quantity}`;
};

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
