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
                type: 'transfer',
                amount: 952,
                date: {
                    dayOfWeek: 'Monday',
                    month: 'June',
                    dayOfMonth: 21,
                    year: 2026,
                    hour: 11,
                    minute: 17,
                    second: 2,
                    meridiem: 'AM',
                    timezone: 'GMT+01:00'
                }
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 1212121212,
                type: 'transfer',
                amount: 20,
                date: {
                    dayOfWeek: 'Friday',
                    month: 'February',
                    dayOfMonth: 10,
                    year: 2026,
                    hour: 14,
                    minute: 53,
                    second: 47,
                    meridiem: 'PM',
                    timezone: 'GMT+01:00'
                }
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'withdrawal',
                amount: 1,
                date: {
                    dayOfWeek: 'Wednesday',
                    month: 'September',
                    dayOfMonth: 10,
                    year: 2026,
                    hour: 14,
                    minute: 53,
                    second: 47,
                    meridiem: 'PM',
                    timezone: 'GMT+01:00'
                }
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'withdrawal',
                amount: 8,
                date: {
                    dayOfWeek: 'Saturday',
                    month: 'December',
                    dayOfMonth: 25,
                    year: 2025,
                    hour: 24,
                    minute: 33,
                    second: 14,
                    meridiem: 'AM',
                    timezone: 'GMT+01:00'
                }
            },
            {
                srcAccountNum: 5555555555,
                dstAccountNum: 5555555555,
                type: 'deposit',
                amount: 97,
                date: {
                    dayOfWeek: 'Tuesday',
                    month: 'October',
                    dayOfMonth: 23,
                    year: 2023,
                    hour: 22,
                    minute: 18,
                    second: 55,
                    meridiem: 'PM',
                    timezone: 'GMT+01:00'
                }
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
                type: 'transfer',
                amount: 952,
                date: {
                    dayOfWeek: 'Monday',
                    month: 'June',
                    dayOfMonth: 21,
                    year: 2026,
                    hour: 11,
                    minute: 17,
                    second: 2,
                    meridiem: 'AM',
                    timezone: 'GMT+01:00'
                }
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
                type: 'transfer',
                amount: 20,
                date: {
                    dayOfWeek: 'Friday',
                    month: 'February',
                    dayOfMonth: 10,
                    year: 2026,
                    hour: 14,
                    minute: 53,
                    second: 47,
                    meridiem: 'PM',
                    timezone: 'GMT+01:00'
                }
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
