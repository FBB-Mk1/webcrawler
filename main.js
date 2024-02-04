const { getURLsFromHTML } = require("./crawl")

function main() {

    if (process.argv.length !== 3) {
        console.log("Invalid Input, need a valid URL")
        process.exit()
    }

    try {
        const url = new URL(process.argv[2])
        fetch(url).then(data => {
            data.text().then(text => {
                const urls = getURLsFromHTML(text, url)
                console.log(urls)
            })
        })
    } catch (err) {
        console.log(err)
    }


}

main()