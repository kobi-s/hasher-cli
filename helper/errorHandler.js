function handleError(error) {
    if(error.response && error.response.status) {
        switch (error.response.status) {
            case 401:
                console.log('[ERR] Unauthorized request - Check your credentials')
                break;

            case 500:
                console.log('[ERR] Server Error')
                break;

            default:
                break;
        }
    }

    if(!error.response) {
        console.log('[ERR] Error with client. Is the server address set correctly?')
    }
}

module.exports = handleError