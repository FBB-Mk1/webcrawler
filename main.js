const { getURLsFromHTML, crawlPage } = require("./crawl")

async function main() {

    if (process.argv.length !== 3) {
        console.log("Invalid Input, too many/few arguments")
        process.exit()
    }
    let url
    try {
        url = new URL(process.argv[2])
    } catch (err) {
        console.log(`${err}: Invalid URL`)
    }
    let result = await crawlPage(url, url)

    console.log(result)
    process.exit()

}

main()