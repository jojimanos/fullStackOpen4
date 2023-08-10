const mostLikedAuthor = require('../utils/mostLikedAuthor')

test('get the author with most blogs', () => {

    const blogs = [
        {
            author: "Guenon",
            title: "Vedanta",
            url: "url",
            likes: 20
        },
        {
            author: "Guenon",
            title: "The Cross",
            url: "url",
            likes: 20
        },
        {
            author: "Mishima",
            title: "Steel",
            url: "url",
            likes: 30
        }
    ]

    const result = mostLikedAuthor.mostLikedAuthor(blogs)

    expect(result).toEqual({author: "Guenon", blogs: 2})
})