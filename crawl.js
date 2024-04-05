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

module.exports = { normalizeURL }