const { getURLsFromHTML, crawlPage } = require("./crawl")

function main() {

    if (process.argv.length !== 3) {
        console.log("Invalid Input, need a valid URL")
        process.exit()
    }
    let url
    try {
        url = new URL(process.argv[2])
    } catch (err) {
        console.log(err)
    }

    crawlPage(url)




}

main()