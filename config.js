const fs = require('fs')
const path = require("path")

function setConfig(answers) {
    fs.writeFile(path.join(__dirname, '_config/account_config.json'), JSON.stringify(answers, null, 2), 'utf8', (err, data) => {
        if (err) console.log(err);
    })
}

async function getHeaders() {
    const conf = fs.readFileSync(path.join(__dirname,'_config/account_config.json'), { encoding: 'ascii' })
    const parsed = JSON.parse(conf)
    return ({
        'X-PRODUCT-KEY': parsed.product_key,
        'X-TOKEN': parsed.token
    })
}

module.exports = {
    setConfig,
    getHeaders
}