export const sampleAccounts: any[] = [
    {
        accountNumber: 5555555555,
        email: 'jdoe123@mymail.com',
        password: '4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e',
        firstName: 'John',
        lastName: 'Doe',
        checkingBalance: 24563,
        savingsBalance: 156798,
        transactions: [
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 7429995109,
                type: 'Transfer',
                amount: 952,
                date: 'Sunday, June 21, 2026, 04:17:02 GMT-07:00'
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 1212121212,
                type: 'Transfer',
                amount: 20,
                date: 'Monday, February 9, 2026, 16:26:42 GMT-08:00'
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'Withdrawal',
                amount: 8,
                date: 'Friday, December 26, 2025, 00:33:14 GMT-08:00'
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'Withdrawal',
                amount: 1,
                date: 'Wednesday, September 10, 2025, 14:53:47 GMT-07:00'
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'Deposit',
                amount: 97,
                date: 'Monday, October 23, 2023, 22:18:55 GMT-07:00'
            }
        ]
    },
    {
        accountNumber: 7429995109,
        email: 'jsmith@realmail.com',
        password: '8a5de6c53d649ae79d24cb64751443413156c659efa356bff2014d3ef40a1477',
        firstName: 'Jane',
        middleName: 'Capo',
        lastName: 'Smith',
        checkingBalance: 60721,
        savingsBalance: 821112,
        transactions: [
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 7429995109,
                type: 'Transfer',
                amount: 952,
                date: 'Sunday, June 21, 2026, 04:17:02 GMT-07:00'
            }
        ]
    },
    {
        accountNumber: 1212121212,
        email: 'noxusforever@mymail.com',
        password: 'a015d8406205ad1e6b8f76e55a7e7aeb85211a32e55f497ca1dbd78aac5c2666',
        firstName: 'Darius',
        lastName: 'Noxus',
        checkingBalance: 503,
        savingsBalance: 2407,
        transactions: [
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 1212121212,
                type: 'Transfer',
                amount: 20,
                date: 'Tuesday, February 10, 2026, 14:53:47 GMT-08:00'
            }
        ]
    },
    {
        accountNumber: 8945613373,
        email: 'bronzehero2021@lanecamp.com',
        password: '21bc36666163ff49018c0a51ba21d164582f3562ad147676b15f411b5f279e89',
        firstName: 'Teemo',
        lastName: 'Shrewm',
        checkingBalance: 972
    }
];
