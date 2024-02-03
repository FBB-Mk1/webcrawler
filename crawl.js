module.exports = {
    normalizeURL
}

function normalizeURL(url) {
    let fullUrl = new URL(url)
    let hostname = fullUrl.host
    let pathname = fullUrl.pathname
    if (pathname[pathname.length - 1] == "/") {
        pathname = pathname.slice(0, [pathname.length - 1])
    }
    return (hostname + pathname)
}
