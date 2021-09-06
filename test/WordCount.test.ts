const WordCount = require('../src/WordCount')
import * as fs from 'fs'

let expected = new Map()
let path = "test/files/file.txt"

describe('Will write the actual words into the file and then test', () => {
    afterEach(() => {
        //fs.unlinkSync("./test/testfiles/file.txt"); can delete the file after testing
        expected = new Map()
    })

    test("Test with 3 hello's", async () => {
        expected.set("hello", 3)
        let actual = "Hello hELLO hello"

        createFile(actual)
        expect(WordCount.myMainMethod("./" + path)).toEqual(expected)
    })

    test("Test with words and symbols", async () => {
        expected.set("me", 3)
        let actual = "Me! Me: mE?"

        createFile(actual)
        expect(WordCount.myMainMethod("./" + path)).toEqual(expected)
    })
})


function createFile(text: string) {
    //Should also catch errors, but I'm keeping it simple
    fs.writeFileSync(path, text)
}