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
  if (sampleAccounts) {
    res.send(sampleAccounts);
  }
  else {
    res.status(400).send('Could not retrieve all accounts!');
  }
});

// login
app.post("/api/users/login", (req, res) => {
  // destructure the request body
  let {email, password} = req.body;

  let account = sampleAccounts.find(account => account.email === email && account.password === password);

  if (account) {
    res.send(generateTokenResponse(account));
  }
  else {
    res.status(400).send("Account name or password is invalid!");
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
  let accountNum = req.params.accountNum;
  let account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  if (account) {
    res.send(account);
  }
  else {
    res.status(400).send(`Could not retrieve the account ${accountNum}!`);
  }
});

// get checking balance
app.get("/api/checking/:accountNum", (req, res) => {
  let accountNum = req.params.accountNum;
  let account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  if (account) {
    res.send(account.checkingBalance);
  }
  else {
    res.status(400).send(`Could not retrieve the checking balance of the account ${accountNum}!`);
  }
});

// get savings balance
app.get("/api/savings/:accountNum", (req, res) => {
  let accountNum = req.params.accountNum;
  let account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  if (account) {
    res.send(account.savingsBalance);
  }
  else {
    res.status(400).send(`Could not retrieve the savings balance of the account ${accountNum}!`);
  }
});

// get transaction history
// account may have no transactions on record, so response may be an empty list
app.get("/api/transaction-history/:accountNum", (req, res) => {
  let accountNum = req.params.accountNum;
  let account = sampleAccounts.find(account => account.accountNumber === parseInt(accountNum));

  if (account) {
    if (account.transactions) {
      res.send(account.transactions);
    }
    else {
      res.send([]);
    }
  }
  else {
    res.status(400).send(`Could not retrieve the transaction history of the account ${accountNum}!`);
  }
});

// filter transaction history by type (transfer, withdrawal, deposit)
app.post("/api/transaction-history/:accountNum/filter", (req, res) => {
  let {type} = req.body;
  if (type != 'Withdrawal' || type != 'Deposit' || type != 'Transfer') {
    res.status(400).send(`Could not filter transaction history by type! Invalid filter type (${type}).`);
  }

  let searchTerm = req.params.accountNum;
  let account = sampleAccounts.find(account => account.accountNumber === parseInt(searchTerm));
  if (!account) {
    res.status(400).send(`Could not filter transaction history by type! The account (${searchTerm}) does not exist.`);
  }

  if (account.transactions) {
    res.send(account.transactions.filter((transaction: Transaction) => transaction.type === type));
  }
  else {
    res.send([]);
  }
});

// transfer money
app.post("/api/transfer", (req, res) => {
  let { srcAccountNum, dstAccountNum, amount, type, date } = req.body;
  // console.log(`${srcAccountNum} sending $${amount} to ${dstAccountNum}`);

  let srcAccount = sampleAccounts.find(account => account.accountNumber == srcAccountNum);
  if (!srcAccount) {
    res.status(400).send(`Could not process the transaction! The source account number is invalid (${srcAccountNum}).`);
  }

  let dstAccount = sampleAccounts.find(account => account.accountNumber == dstAccountNum);
  if (!dstAccount) {
    res.status(400).send(`Could not process the transaction! The destination account number is invalid (${dstAccountNum}).`);
  }

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

  // verify the new transaction was appended to the source account's transaction history
  let found = srcAccount.transactions.find((transaction: Transaction) => transaction.dstAccountNum == dstAccountNum && transaction.amount == amount && transaction.date == date);

  if (found) {
    if (dstAccount !== srcAccount || type == 'Withdrawal') {
      srcAccount.checkingBalance -= amount;
      // console.log(`new balance of src acc: ${srcAccount.checkingBalance}`)
    }

    if (type == 'Transfer' || type == 'Deposit') {
      dstAccount.checkingBalance += amount;
    }

    // console.log(`new balance of dst acc: ${dstAccount.checkingBalance}`);

    // return the new transaction
    res.send(found);
  }
  else {
    res.status(400).send('Could not process transaction!');
  }
});

app.post("/api/withdraw", (req, res) => {
  let { srcAccountNum, dstAccountNum, amount, type, date } = req.body;
  // console.log(`${srcAccountNum} sending $${amount} to ${dstAccountNum}`);
  let srcAccount = sampleAccounts.find(account => account.accountNumber == srcAccountNum);

  if (!srcAccount) {
    res.status(400).send(`Could not process the transaction! The source account number is invalid (${srcAccountNum}).`);
  }

  if (!srcAccount.transactions) {
    srcAccount.transactions = [];
  }

  let newTransaction = {
    srcAccountNum: srcAccountNum,
    dstAccountNum: dstAccountNum,
    type: type,
    amount: amount,
    date: date
  };

  srcAccount.transactions.push(newTransaction);

  // verify the new transaction was appended to the source account's transaction history
  let found = srcAccount.transactions.find((transaction: Transaction) => transaction.srcAccountNum == srcAccountNum && transaction.amount == amount && transaction.date == date);

  if (found) {
    srcAccount.checkingBalance -= amount;
    // console.log(`new balance of acc after withdrawal: ${srcAccount.checkingBalance}`);

    // return the new transaction
    res.send(found);
  }
  else {
    res.status(400).send('Could not process transaction!');
  }
});

app.post("/api/deposit", (req, res) => {

});

app.get("/api/get", (req, res) => {

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
