/**
nexmo context: 
you can find this as the second parameter of rtcEvent funciton or as part or the request in req.nexmo in every request received by the handler 
you specify in the route function.

it contains the following: 
const {
        generateBEToken,
        generateUserToken,
        logger,
        csClient,
        storageClient
} = nexmo;

- generateBEToken, generateUserToken,// those methods can generate a valid token for application
- csClient: this is just a wrapper on https://github.com/axios/axios who is already authenticated as a nexmo application and 
    is gonna already log any request/response you do on conversation api. 
    Here is the api spec: https://jurgob.github.io/conversation-service-docs/#/openapiuiv3
- logger: this is an integrated logger, basically a bunyan instance
- storageClient: this is a simple key/value inmemory-storage client based on redis

*/


const DATACENTER = `https://api.nexmo.com`
const NUMBER_TO_CALL = ``


const voiceEvent = async (req, res, next) => {
    const { logger, csClient } = req.nexmo;

    try {

        res.json({})

    } catch (err) {

        logger.error("Error on voiceEvent function")
    }

}

const voiceAnswer = async (req, res, next) => {
    const { logger, csClient,config } = req.nexmo;
    logger.info("req", { req_body: req.body })
    const connectAction = {
        "action": "connect",
        "from": `${NUMBER_TO_CALL}`,
        "endpoint": [
            {
                "type": "phone",
                "number": `${req.body.to}`,
                "onAnswer": {
                    "url": `${config.server_url}/api/ncco2`
                }
            }
        ]
    }

    try {


        return res.json([
            {
                "action": "talk",
                "text": `Hello , This Is an NCCO Demo`
            },
            {
                "action": "talk",
                text: `Your number is ${req.body.from.split("").join(" ")}`
            },
            {
                "action": "talk",
                text: `And you are colling the number ${req.body.to.split("").join(" ")}`
            },
            {
                "action": "talk",
                text: `Have a nice day, now we are gonna hangup`
            }
        ])

    } catch (err) {

        logger.error("Error on voiceAnswer function")
    }

}

const route = (app, express) => {
    app.get('/api/ncco2', async (req, res) => {
        const {
            logger,
            csClient,
            storageClient,
            config
        } = req.nexmo;

        // logger.error({ user }, "STORAGE")
        res.json([
            {
                "action": "talk",
                "text": "Can you confirm you were involved in a csr accident? PLEASE."
            }
        ])

    })
}


module.exports = {
    voiceEvent,
    voiceAnswer,
    route
}