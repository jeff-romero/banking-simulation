import express from 'express';
import cors from 'cors';
import { sampleAccounts } from './data';
import jwt from 'jsonwebtoken';
import { secretKey } from './credentials';

const app = express();
app.use(express.json());

app.use(cors({
  credentials:true,
  origin:[`http://localhost:4200`]
}));

app.get("/api/accounts", (req, res) => {
  res.send(sampleAccounts);
});

app.post("/api/users/login", (req, res) => {
  // destructure the request body
  const {email, password} = req.body;
  // console.log(req.body);

  const account = sampleAccounts.find(account => account.email === email && account.password === password);

  if (account) {
    res.send(generateTokenResponse(account));
  }
  else {
    res.status(400).send("Account name or password is not valid!");
  }
});

app.get("/api/transaction-history", (req, res) => {
  res.send("Transaction history");
});

const generateTokenResponse = (account:any) => {
  const token = jwt.sign({
    email:account.email
  }, secretKey, {
    expiresIn:"30d"
  });

  account.token = token;
  return account;
}

const port = 5000;
app.listen(port, () => {
    console.log(`Website hosted on http://localhost:${port}`);
});
