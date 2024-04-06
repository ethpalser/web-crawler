function printReport(pages) {
    console.log('Starting report...')
    const sortArrPages = sortObjectKeysByValue(pages)
    for (const url of sortArrPages) {
        console.log(`Found ${pages[url]} internal links to ${url}`)
    }
}

function sortObjectKeysByValue(pages, ascending = false) {
    if (typeof pages !== 'object') {
        throw new Error('Invalid argument')
    }
    const arrPages = []
    for (const key of Object.keys(pages)) {
        arrPages.push(key)
    }

    let sorting = true
    while (sorting) {
        sorting = false
        for (let i = 1; i < arrPages.length; i++) {
            if ((ascending && pages[arrPages[i-1]] > pages[arrPages[i]])
                || (!ascending && pages[arrPages[i-1]] < pages[arrPages[i]])) {
                const tmp = arrPages[i]
                arrPages[i] = arrPages[i-1]
                arrPages[i-1] = tmp
                sorting = true
            }
        }
    }
    return arrPages
}

module.exports = { printReport, sortObjectKeysByValue }