import { processTheData } from "../src/WordCount"

let expected = new Map()
describe('Testing the data processing', () => {
    afterEach(() => {
        // code to run before each test
        expected.clear()
    })
    test("first with 3 hello's", async () => {
        expected.set("hello", 3)
        expect(processTheData("Hello hEllo HeLLo!")).toEqual(expected)
    })
    test("test random text with symbols", async () => {
        expected.set("aabits", 3)
        expect(processTheData("aabits? aabits! aabits:")).toEqual(expected)
    })

})