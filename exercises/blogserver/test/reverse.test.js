const listHelper = require('../utils/list_helper')

test('dummy return 1', () => {
    const blogs = 0

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})