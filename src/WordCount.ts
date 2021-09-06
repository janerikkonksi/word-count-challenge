import * as fs from 'fs'

//https://www.reddit.com/r/typescript/comments/ar2t11/semicolons_yea_or_nay/  - decided not to use this time :)

export const myMainMethod =  (path: string) => {
    const sortedWordsAndCount: Map<string, number> = new Map()
    let wordsBeforeSorting: string[] = []
    let data

    try {
        data = fs.readFileSync(path, 'utf-8')

        //If text is there, remove anything that is not necessary
        //'a' is counted as a word https://www.quora.com/Is-a-a-word-or-a-letter-when-used-in-It-was-a-good-day in eng
        //First replace removes any spaces, second one removes symbols and the third removes words that have numbers.
        let arr: string[] = data.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/[&\/\\#,+()$~%.'":*?!<>{};]/g, "").replace(/\s*\b\w*\d\w*\b/g, "").split(' ')

        //Not the best solution, but I will use array because it's easy to sort
        for (let i of arr) wordsBeforeSorting.push(i.toLowerCase())
        wordsBeforeSorting.sort()

        //I will put the words to the dictionary and count the occurrences
        wordsBeforeSorting.forEach((word) => {
            sortedWordsAndCount.set(word, sortedWordsAndCount.get(word) ? sortedWordsAndCount.get(word)! + 1 : 1)
        });

        //I guess, it would okay to print just this
        //console.log(sortedWordsAndCount)
        //But this looks cleaner I guess
        for (let key of Array.from(sortedWordsAndCount.keys())) console.log(key, sortedWordsAndCount.get(key))
    }
    //If file was not found, throw error
    catch (err) { console.log(err) }

    //console.log(sortedWordsAndCount)
    return sortedWordsAndCount
}

//Not the best option, but it was easier to test function
//At first I had 3 separate methods - fileread, dataprocessing and main. It would be more correct to test the methods separately, but this way it was easier to grasp the program.
myMainMethod(process.argv[2]);
