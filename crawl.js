module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}

const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    let fullUrl = new URL(url)
    let hostname = fullUrl.host
    let pathname = fullUrl.pathname
    if (pathname[pathname.length - 1] == "/") {
        pathname = pathname.slice(0, [pathname.length - 1])
    }
    return (hostname + pathname)
}


function getURLsFromHTML(htmlBody, baseURL) {
    const links = []
    const dom = new JSDOM(htmlBody)
    const elements = dom.window.document.querySelectorAll('a')
    for (let el of elements) {
        if (el.href.slice(0, 1) === '/') {
            try {
                links.push(new URL(el.href, baseURL).href)
            } catch (err) {
                console.log(`${err.message}: ${el.href}`)
            }
        } else {
            try {
                links.push(new URL(el.href).href)
            } catch (err) {
                console.log(`${err.message}: ${el.href}`)
            }
        }
    }
    return links
}

async function crawlPage(baseURL, currentURL, pages = {}) {

    // Make sure the currentURL is on the same domain as the baseURL.If it's not, just return the current pages. We don't want to crawl the entire internet, just the domain in question.
    if (baseURL.hostname !== currentURL.hostname) {
        return pages
    }
    // Get a normalized version of the currentURL.
    const currentNormalized = normalizeURL(currentURL)
    // If the pages object already has an entry for the normalized version of the current URL, just increment the count and return the current pages.
    if (currentNormalized in pages) {
        pages[currentNormalized] += 1
        return pages
    }
    // Otherwise, add an entry to the pages object for the normalized version of the current URL, and set the count to 1 as long as the current url isn't the base url (the first page we're crawling). 
    // Set it to 0 if it is the base url.
    else {
        if (normalizeURL(baseURL) !== currentNormalized) {
            pages[currentNormalized] = 1
        } else {
            pages[currentNormalized] = 0
        }
    }
    // If we've gotten here, we haven't yet made a request to the current URL, so let's do that, and maybe add a console.log so you can watch your crawler go in real-time.
    try {
        console.log(`fetching: ${currentURL.href}`)
        const response = await fetch(currentURL)
        // Assuming all went well with the fetch request, get all the URLs from the response body HTML
        if (response.ok) {
            let urls
            if (response.headers.get('content-type').includes('text/html')) {
                const text = await response.text()
                urls = getURLsFromHTML(text, currentURL)
            }
            if (urls) {
                // Recursively crawl each URL you found on the page and update the pages to keep an aggregate count
                for (let url of urls) {
                    next = new URL(url)
                    await crawlPage(baseURL, next, pages)
                }
            }
        }
    } catch (err) {
        console.log(`${err}: ${currentNormalized}`)
    }
    // Finally, return the updated pages object
    return pages;

}



