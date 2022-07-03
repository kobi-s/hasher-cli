const { getHeaders } = require('../config')
const config = require('../config/account_config.json')
const axios = require('axios')
const Table = require('cli-table');
const chalk = require('chalk')
const fs = require('fs')
const FormData = require('form-data');
const handleError = require('../helper/errorHandler');

async function startNewCampigan(params) {
    try {
        const { data } = await uploadHashFile(params['hash-file-key'])

        params['hash-file-key'] = data.key
        params['client'] = 'cli'
        params['hashcat_config'] = {}
    
        return axios({
            method: 'post',
            url: config.server + '/cli',
            headers: await getHeaders(),
            data: {
                method: 'StartCampigan',
                params: params
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function getCampigans() {
    return axios({
        method: 'post',
        url: config.server + '/cli',
        headers: await getHeaders(),
        data: {
            method: 'GetCampigans'
        }
    }).then((response) => {
        if (response.data && response.data['data']) {

            var table = new Table({
                head:
                    [chalk.cyanBright("#ID"),
                    chalk.cyanBright("Name"),
                    chalk.cyanBright("Algorithem"),
                    chalk.cyanBright("Instance Type"),
                    chalk.cyanBright("Instances"),
                    chalk.cyanBright("Total"),
                    chalk.cyanBright("Recoverd"),
                    chalk.cyanBright("Status  "),
                    chalk.cyanBright("Created At"),
                    chalk.cyanBright("Est. Done")
                ]
            });
            
            response.data['data'].forEach(c => {
                if(c['campaign_status'] == 'active') {
                   c['campaign_status'] += '✂️'
                }
                table.push(Object.values(c));
            })
            console.log(table.toString());
        }
    }).catch(err => {
        handleError(err)
    })
}


async function getNewCampiganHelpers() {
    return axios({
        method: 'post',
        url: config.server + '/cli',
        headers: await getHeaders(),
        data: {
            method: 'GetCampiganHelpers'
        }
    })
}


async function uploadHashFile(pathFile) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pathFile))

    try {
        return await axios.post(config.server + '/cli/upload', formData, {
            headers: {
                ...await getHeaders(),
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        })
    } catch (error) {
        return console.log('Error: There is a problem uploading your file');
    }
}


async function deleteCampigan(ids) {
    const _ids = ids.split(",")
    try {
        return axios({
            method: 'post',
            url: config.server + '/cli',
            headers: await getHeaders(),
            data: {
                method: 'DeleteCampigan',
                params: {
                    ids: _ids
                }
            }
        })
    } catch (error) {
        console.log(error.error.message);
    }

}

async function getCampaiganHarvest(id) {

    return axios({
        method: 'post',
        url: config.server + '/cli',
        headers: await getHeaders(),
        data: {
            method: 'Harvest',
            params: {
                id: id
            }
        }
    }).then((response) => {
        if (response.data.data) {
            response.data.data.forEach(v => {
                console.log(v.value);
            })
        } else {
            console.log('Nothing to harvest yet.');
        }
    })
    .catch(err => {
        console.log('Nothing to harvest yet.');
    })
}

async function cancelCampaigan(id) {
    return axios({
        method: 'post',
        url: config.server + '/cli',
        headers: await getHeaders(),
        data: {
            method: 'CancelCampaigan',
            params: {
                id: id
            }
        }
    })
}


module.exports = {
    startNewCampigan,
    getCampigans,
    getNewCampiganHelpers,
    uploadHashFile,
    deleteCampigan,
    getCampaiganHarvest,
    cancelCampaigan
}