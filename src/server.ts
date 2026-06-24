import express from 'express';
import cors from 'cors';
import { sampleAccounts } from './data';
import jwt from 'jsonwebtoken';
import { secretKey } from './credentials';
import { Transaction } from './app/shared/models/transaction';

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

app.get("/api/accounts/:accountNum", (req, res) => {
  let searchTerm = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));

  res.send(account);
});

// account may have no transactions on record, so response may be undefined as intended
app.get("/api/transaction-history/:accountNum", (req, res) => {
  let searchTerm = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));

  res.send(account.transactions);
});

app.get("/api/transaction-history/:accountNum/filter", (req, res) => {
  let {type} = req.body;
  let searchTerm = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));

  if (account.transactions) {
    res.send(account.transactions.filter((transaction: Transaction) => transaction.type == type));
  }
  else {
    res.status(400).send("Invalid transaction filter type!");
  }
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
