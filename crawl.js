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

async function crawlPage(baseURL, currentURL, pages) {
    const objBaseURL = new URL(baseURL)
    const objCurrentURL = new URL(currentURL)
    if (objCurrentURL.hostname !== objBaseURL.hostname) {
        return pages
    }
    const normCurrentURL = normalizeURL(currentURL)
    if (pages[normCurrentURL] != null) {
        pages[normCurrentURL]++
        return pages
    }
    pages[normCurrentURL] = 1

    console.log(`Crawling at url: ${currentURL}`)
    let resp = null
    try {
        resp = await fetch(currentURL, {method: 'GET'})
    } catch (err) {
        console.log(`${err.message}`)
        return pages
    }
    if (resp.status >= 400) {
        console.log(`The response from ${currentURL} returned status: ${resp.status}`)
        return pages
    }
    if (!resp.headers.get('content-type').includes('text/html')) {
        console.log(`The response from ${currentURL} is not HTML`)
        return pages
    }
    const body = await resp.text();
    const nextURLs = getURLsFromHTML(body, baseURL)
    for (const url of nextURLs) {
        await crawlPage(baseURL, url, pages)
    }
    return pages
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage }