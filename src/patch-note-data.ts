export const patchNotes: any[] = [
  {
    date: 'July 11, 2026',
    newFeatures: [
      'Withdraw Funds page is complete! Logged in users can withdraw money from their checking account.',
      'Withdrawal transaction history will be displayed on the Withdraw Funds page.'
    ],
    bugFixes: [
      'Checking balance is automatically updated after successful a deposit is made. It is no longer required to refresh the page to get the updated balance.',
      'Transaction type for withdrawals have been changed to reflect its type accurately.'
    ]
  },
  {
    date: 'July 5, 2026',
    newFeatures: [
      'Subtract transfer amount from the source account and add it to the desination account.'
    ]
  },
  {
    date: 'July 4, 2026',
    bugFixes: [
      'Prevent transactions from being duplicated when visiting the deposit or withdraw funds page.'
    ]
  },
  {
    date: 'July 2, 2026',
    bugFixes: [
      'Display a 0 if the logged in user\'s checking balance cannot be retrieved.'
    ]
  },
  {
    date: 'July 1, 2026',
    newFeatures: [
      'Implemented an API call to get an account\'s savings balance.'
    ]
  },
  {
    date: 'June 30, 2026',
    newFeatures: [
      'Implemented an API call to retrieve the checking balance of a logged in account.'
    ]
  },
  {
    date: 'June 29, 2026',
    bugFixes: [
      'Modify the component alignment per page.'
    ]
  },
  {
    date: 'June 28, 2026',
    newFeatures: [
      'The transfer service will fetch the transaction history after a successful user login. This prevents the transaction history page from having zero transactions loaded after the first visit.',
      'Added a deposit funds page.'
    ],
    bugFixes: [
      'After the user logs in, the transfer service is only triggered after the account is retrieved.'
    ]
  },
  {
    date: 'June 27, 2026',
    newFeatures: [
      'Users can now sort the transaction history by the sending and receiving account number, cash amount, type, and date.',
      'Implemented transaction history sorting functions.',
      'Completed fund transfer functions and live updates of the transaction history.',
      'Users can now transfer funds to another account (if it exists).'
    ]
  },
  {
    date: 'June 25, 2026',
    newFeatures: [
      'Fund transfer inputs are now validated and will not accept invalid special characters or letters.',
      'Transaction history has a new and improved appearance.',
      'Browser will redirect to the login page when a website visitor is not logged in and attempts to visit the fund transfer page.'
    ],
    bugFixes: [
      'Authenticated users will now have their JWT user session token stored and validated upon visiting the fund transfer page.'
    ]
  },
  {
    date: 'June 24, 2026',
    newFeatures: [
      'Implemented an API GET request to filter transactions by type (withdrawals, deposits, and transfers).',
      'Updated the transaction model to include transaction types.',
      'Transaction history page will be dynamically populated with the data retrieved from the back-end API.',
      'Updated the date model to be a string instead of a complex object of containing strings and integers.'
    ],
    bugFixes: [
      'After the user successfully logs in, the browser will redirect to the home page instead of remaining on the log in page.',
      'DOM retains object data after a page refresh by using Angular @for async pipes.'
    ]
  },
  {
    date: 'June 23, 2026',
    newFeatures: [
      'Implemented an API GET request to search accounts their account number.'
    ]
  },
  {
    date: 'June 22, 2026',
    newFeatures: [
      'Migrated from server-side rendering (SSR) to client-side rendering (CSR).',
      'Separated the Angular frontend and the REST API backend.'
    ],
    bugFixes: [
      'Solved TypeScript/ESM module resolution issues while coding the backend.'
    ]
  },
  {
    date: 'June 21, 2026',
    bugFixes: [
      'Debugged a server-side rendering (SSR) middleware issue that would intercept API requests before arriving at Express routes.'
    ]
  },
  {
    date: 'June 20, 2026',
    bugFixes: [
      'Fixed hashing authentication errors on user login.'
    ]
  },
  {
    date: 'June 19, 2026',
    newFeatures: [
      'Added widgets.'
    ]
  }
];
