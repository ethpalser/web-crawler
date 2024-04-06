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

async function crawlPage(currentURL) {
    let resp = null
    try {
        resp = await fetch(currentURL, {method: 'GET'})
    } catch (err) {
        console.log(`${err.message}`)
        return
    }
    console.log(resp)
    if (resp.status >= 400) {
        console.log(`An error occurred with status ${resp.status} at ${currentURL}`)
        return
    }
    if (!resp.headers.get('content-type').includes('text/html')) {
        console.log(`Response from ${currentURL} is not HTML`)
        return
    }
    return resp.text()
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage }