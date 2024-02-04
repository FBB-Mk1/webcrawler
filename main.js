const { getURLsFromHTML, crawlPage } = require("./crawl")
const { printReport } = require("./report.js")

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
    let pages = await crawlPage(url, url)

    printReport(pages)
    process.exit()

}

main()