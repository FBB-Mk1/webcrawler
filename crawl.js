module.exports = {
    normalizeURL,
    getURLsFromHTML
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


// main()
// async function main() {

//     const url = 'http://blog.boot.dev'
//     const body = await JSDOM.fromURL(url).then(dom => {
//         return dom.serialize()
//     });
//     console.log(getURLsFromHTML(body, url))
// }