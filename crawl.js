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

async function crawlPage(url) {
    let response
    try {
        response = await fetch(url)
    } catch (err) {
        console.log(err)
    }
    if (response.status > 400) {
        console.log(`Can't continue due to error: ${response.status}`)
        process.exit()
    }
    if (response.headers.get('content-type').includes('text/html')) {
        const text = await response.text()
        const urls = getURLsFromHTML(text, url)
        console.log(urls)
    } else {
        console.log('not cool')
        process.exit()
    }

}


