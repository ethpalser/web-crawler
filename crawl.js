const jsodom = require('jsdom')
const { JSDOM } = jsodom

function normalizeURL(url) {
    if (typeof url !== 'string' && !(url instanceof String)) {
        throw new Error('Invalid Argument')
    }
    try {
        const urlObj = new URL(url)
        const normalizedUrl = `${urlObj.hostname}${urlObj.pathname != '/' ? urlObj.pathname : ''}`
        return normalizedUrl
    } catch(err) {
        throw new Error(`${err.message}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const aTags = dom.window.document.querySelectorAll('a')
    const urls = []
    for (a of aTags) {
        const link = a.href
        if (URL.canParse(link)) {
            urls.push(link)
        } else if (URL.canParse(link, baseURL)) {
            urls.push(new URL(link, baseURL).href)
        }
    }
    return urls
}

module.exports = { normalizeURL, getURLsFromHTML }