module.exports = {
    printReport
}

function sortByCount(pages) {
    let sortedList = []
    for (let key in pages) {
        sortedList.push([key, pages[key]])
    }
    return sortedList.sort((x, y) => {
        return y[1] - x[1]
    })
}

function printReport(pages) {
    const sortedPages = sortByCount(pages)
    for (let page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}