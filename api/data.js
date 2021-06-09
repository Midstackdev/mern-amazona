import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Smithy',
            email: 'admin@alo.com',
            password: bcrypt.hashSync('password', 8),
            isAdmin: true
        },
        {
            name: 'Ella',
            email: 'ella@alo.com',
            password: bcrypt.hashSync('password', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            _id: '1',
            name: 'Ash slim trouser',
            category: 'Pants',
            image: '/images/p1.JPG',
            price: 120,
            countInStock: 12,
            brand: 'Marks and Spenser',
            rating: 4.5,
            numReviews: 12,
            description: 'Nice pants for the office'
        },
        {
            _id: '2',
            name: 'Coffee slim trouser',
            category: 'Pants',
            image: '/images/p2.JPG',
            price: 100,
            countInStock: 32,
            brand: 'Marks and Spenser',
            rating: 5,
            numReviews: 10,
            description: 'Nice pants for the office'
        },
        {
            _id: '3',
            name: 'Black slim trouser',
            category: 'Pants',
            image: '/images/p3.JPG',
            price: 90,
            countInStock: 0,
            brand: 'Marks and Spenser',
            rating: 4.5,
            numReviews: 23,
            description: 'Nice pants for the office'
        },
        {
            _id: '4',
            name: 'Khaki slim trouser',
            category: 'Pants',
            image: '/images/p4.JPG',
            price: 150,
            countInStock: 23,
            brand: 'Marks and Spenser',
            rating: 3.5,
            numReviews: 34,
            description: 'Nice pants for the office'
        },
        {
            _id: '5',
            name: 'Blue-black slim trouser',
            category: 'Pants',
            image: '/images/p5.JPG',
            price: 120,
            countInStock: 13,
            brand: 'Marks and Spenser',
            rating: 4.5,
            numReviews: 10,
            description: 'Nice pants for the office'
        },
        {
            _id: '6',
            name: 'Blue slim trouser',
            category: 'Pants',
            image: '/images/p6.JPG',
            price: 120,
            countInStock: 7,
            brand: 'Marks and Spenser',
            rating: 2.5,
            numReviews: 10,
            description: 'Nice pants for the office'
        },
    ]
}

export default data