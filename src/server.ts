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

// get all accounts
app.get("/api/accounts", (req, res) => {
  res.send(sampleAccounts);
});

// login
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

// register
app.post("/api/users/register", (req, res) => {

});

// delete account
app.delete("/api/accounts/:accountNum", (req, res) => {

});

// get account
app.get("/api/accounts/:accountNum", (req, res) => {
  let searchTerm = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));

  res.send(account);
});

// get checking balance
app.get("/api/checking/:accountNum", (req, res) => {
  let accountNum = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  res.send(account.checkingBalance);
});

// get savings balance
app.get("/api/savings/:accountNum", (req, res) => {
  let accountNum = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  res.send(account.savingsBalance);
});

// get transaction history
// account may have no transactions on record, so response may be undefined as intended
app.get("/api/transaction-history/:accountNum", (req, res) => {
  let searchTerm = req.params.accountNum;
  const account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));

  res.send(account.transactions);
});

// filter transaction history by type (transfer, withdrawal, deposit)
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

// transfer money
app.post("/api/transfer", (req, res) => {
  let { srcAccountNum, dstAccountNum, amount, type, date } = req.body;
  // console.log(`${srcAccountNum} sending $${amount} to ${dstAccountNum}`);
  let srcAccount = sampleAccounts.find(account => account.accountNumber == srcAccountNum);
  let dstAccount = sampleAccounts.find(account => account.accountNumber == dstAccountNum);

  if (!srcAccount.transactions) {
    srcAccount.transactions = [];
  }

  if (dstAccount !== srcAccount && !dstAccount.transactions) {
    dstAccount.transactions = [];
  }

  let newTransaction = {
    srcAccountNum: srcAccountNum,
    dstAccountNum: dstAccountNum,
    type: type,
    amount: amount,
    date: date
  };

  srcAccount.transactions.push(newTransaction);
  if (dstAccount !== srcAccount) {
    dstAccount.transactions.push(newTransaction);
  }

  let found = srcAccount.transactions.find((transaction: Transaction) => transaction.dstAccountNum == dstAccountNum && transaction.amount == amount && transaction.date == date);

  if (found) {
    // return the new transaction
    res.send(found);
  }
  else {
    res.status(400).send('Could not process transaction!');
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
