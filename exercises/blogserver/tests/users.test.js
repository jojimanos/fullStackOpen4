const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const initialDatabase = [
    {
        userName: "garu",
        name: "garuda",
        hashpassword: "$2b$10$KzpOpvKCTFUYTFytfduytduyt^%&^%&TFTzan2T.DTYDITFYTDFIYFIVU46BbQW"
    },
    {
        userName: "gar",
        name: "garfield",
        hashpassword: "iugouyfgyoug648764756465TFTzan2T.giufiytfiytdurydutrd^%&^&%#$%#$%#*^%$^W"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialDatabase[0])
    await userObject.save()
    userObject = new User(initialDatabase[1])
    await userObject.save()
})

describe('test for the users functionalities', () => {
    test('username under two chatacters is not saved', async () => {

        const invalidUser =
        {
            userName: "ar",
            name: "aragorn",
            password: "123456"
        }

        const newUser = await api.post('/api/users').send(invalidUser)
        
        expect(newUser.status).toBe(400)
        expect(newUser.body.error).toBe("User validation failed: userName: Path `userName` (`ar`) is shorter than the minimum allowed length (3).")
    })
    test('empty username returns status 400', async () => {

        const invalidUser =
        {
            name: "aragorn",
            password: "123456"
        }

        const newUser = await api.post('/api/users').send(invalidUser)

        expect(newUser.status).toBe(400)
        expect(newUser.body.error).toBe("User validation failed: userName: Path `userName` is required.")
    })
}
)