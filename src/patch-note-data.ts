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
    date: 'June 27, 2026',
    newFeatures: [
      'Implemented transaction history sorting functions.',
      'Completed fund transfer functions and live updates of the transaction history.'
    ]
  },
  {
    date: 'June 24, 2026',
    newFeatures: [
      'Implemented an API GET request to filter transactions by type (withdrawals, deposits, and transfers).',
      'Updated the transaction model to include transaction types.'
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
