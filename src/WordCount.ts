import * as fs from 'fs'

//Not the best option, but it was easier to test functions
mainFunction()
const sortedWordsAndCount: Map<string, number> = new Map()
let wordsBeforeSorting: string[] = []

export function mainFunction() {
    fs.readFile(process.argv[2], function (err, data) {
        //If file was not found, throw error
        if (err) throw err
        processTheData(data.toString())

        //I guess, it would okay to print just this
        //console.log(sortedWordsAndCount)
        //But this looks cleaner I guess
        for (let key of Array.from(sortedWordsAndCount.keys())) console.log(key, sortedWordsAndCount.get(key))
    })
}

export function processTheData(data: String) {
    //If text is there, remove anything that is not necessary - symbols and spaces and so on.
    //'a' is counted as a word https://www.quora.com/Is-a-a-word-or-a-letter-when-used-in-It-was-a-good-day in eng
    //Removed everything that contains numbers
    let arr: string[] = data.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, "").replace(/\s*\b\w*\d\w*\b/g, "").split(' ');

    //Not the best solution, but I will use array because it's easy to sort
    for (let i of arr) wordsBeforeSorting.push(i.toLowerCase())
    wordsBeforeSorting.sort()

    //I will put the words to the dictionary and count the occurrences
    for (let i of wordsBeforeSorting) {
        if (sortedWordsAndCount.has(i)) {
            let countUntilNow: number = sortedWordsAndCount.get(i)!
            sortedWordsAndCount.set(i, countUntilNow + 1)
        } else sortedWordsAndCount.set(i, 1)
    }
    return sortedWordsAndCount
}

