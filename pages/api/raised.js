import cors from 'cors'
import cache from 'express-redis-cache'

const c = cache()

const run = (req, res) => (fn) => new Promise((resolve, reject) => {
    fn(req, res, (result) =>
        result instanceof Error ? reject(result) : resolve(result)
    )
})


const handler = async (req, res) => {
    const middleware = run(req, res)
    await middleware(cors())
    await middleware(c.route({
        expire: 30
    }))

    const projectId = process.env.projectId;
    const juiceboxContract = "0xd569d3cce55b71a8a3f3c418c329a66e5f714431";

    const contractPayload = {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_call",
        // I didn't know the ABI spec before this (and still only have a cursory understanding), here's a breakdown of this request:
        // data: first 4 bytes of the Keccak hash of the ASCII form of the method signature (I know, it's a lot), followed by the method args padded to 32 bytes.
        // from: address the call is coming from. it can be 0 because we're reading from the contract
        // to: the contract
        params: [
            {
                data: `0x9cc7f708${projectId.toString(16).padStart(64, "0")}`,
                from: "0x0000000000000000000000000000000000000000",
                to: juiceboxContract,
            },
            "latest",
        ],
    };

    let contractResponse;

    try {
        contractResponse = await axios.post(
            `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}`,
            contractPayload
        );
    } catch (e) {
        console.log(
            "Checking Juicebox contract failed. Falling back to 'cached' value. Error follows:"
        );
        console.log(e);
        contractResponse = {
            data: {
                result:
                    "0x000000000000000000000000000000000000000000000001287f7ff0ec2a5c00",
            },
        };
    }

    let multisigResponse;

    try {
        multisigResponse = await axios.post(
            `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}`,
            {
                id: 1,
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [process.env.multisigAddr, "latest"],
            }
        );
    } catch (e) {
        console.log(
            "Checking multisig balance failed. Falling back to 'cached' value. Error follows:"
        );
        console.log(e);
        multisigResponse = {
            data: {
                result:
                    "0x1a34cfb365b875574b",
            },
        };
    }

    let dollarResponse;
    try {
        dollarResponse = await axios.get(
            "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
        );
    } catch (e) {
        console.log(
            "Getting exchange rates from Coinbase failed. Falling back to 'cached' value. Error follows:"
        );
        console.log(e);
        dollarResponse = {
            data: {
                data: {
                    currency: "ETH",
                    rates: {
                        USD: "4685.285",
                    },
                },
            },
        };
    }

    const ethToDollarRate = parseInt(dollarResponse.data.data.rates["USD"]);

    // things are only verbose here because i want people to understand the conversions.
    const contractHexWei = contractResponse.data.result;
    const contractWei = parseInt(contractHexWei, 16);
    const contractEth = (contractWei / 1000000000000000000)
    const contractDollars = (contractEth * ethToDollarRate)

    const multisigHexWei = multisigResponse.data.result
    const multisigWei = parseInt(multisigHexWei, 16)
    const multisigEth = (multisigWei / 1000000000000000000)
    const multisigDollars = (multisigEth * ethToDollarRate)

    const totalEth = (contractEth + multisigEth).toFixed(3)
    const totalDollars = (contractDollars + multisigDollars).toFixed(2)

    console.log(`Sucessfully queried services. ETH: ${totalEth}, USD: ${totalDollars}`);

    res.json({
        eth: totalEth,
        dollars: totalDollars,
        ethUsdConversion: ethToDollarRate
    });

}

export default handler