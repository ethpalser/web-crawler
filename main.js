const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')

function main() {
    if (argv.length < 3 || argv.length > 3) {
        console.error('Invalid arguments'
        + '\nOne and only one argument must be provided, as the base url to crawl'
        + '\n\tEx. npm start https://google.com')
        return
    }
    const baseURL = argv[2]
    if (!URL.canParse(baseURL)) {
        console.error('Invalid URL'
        + '\nThe URL must be in a format accepted by a browser'
        + '\n\tEx. https://www.google.com'
        + '\n\tEx2. http://google.com/support/'
        + '\n\tEx3. www.google.com')
        return
    }
    console.log(`Running web crawler at ${baseURL}`)
    const resp = crawlPage(baseURL)
    console.log(resp)
}

main()