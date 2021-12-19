import Cors from 'cors';
import axios from 'axios';

const JUICEBOX_CONTRACT = "0xd569d3cce55b71a8a3f3c418c329a66e5f714431";

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }

        return resolve(result)
      })
    })
  }

const handler = async (req, res) => {
    console.log('raised call', req);
    await runMiddleware(req, res, cors);

    /** Read Juicebox contract balance for specified project **/
    const projectId = process.env.PROJECT_ID; // Juicebox project id

    console.log('projectId', projectId);
    const juiceboxContract = JUICEBOX_CONTRACT;
    const contractPayload = {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_call",
        /** here's a breakdown of this request:
            * data: first 4 bytes of the Keccak hash of the ASCII form of the method signature
                followed by the method args padded to 32 bytes.
            * from: address the call is coming from. blackhole address because this is a READ call
            * to: the Juicebox contract
        */
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
            `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
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
                    "0x0", // return 0 when fail
            },
        };
    }

     /** Read Multisig contract balance for specified project **/
    let multisigResponse;

    try {
        multisigResponse = await axios.post(
            `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
            {
                id: 1,
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [process.env.MULTISIG_ADDRESS, "latest"],
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
                    "0x0", // return 0 when fail
            },
        };
    }

    /** Convert Juicebox balance and Multisig balance into USD **/
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
                        USD: "0",
                    },
                },
            },
        };
    }

    const ethToDollarRate = parseFloat(dollarResponse.data.data.rates["USD"]).toFixed(4);

    /** Convert Juicebox value to USD */
    const contractHexWei = contractResponse.data.result;
    const contractWei = parseInt(contractHexWei, 16); // parsing a base 16 number
    const contractEth = (contractWei / 1e18) // divide by 10^18
    const contractDollars = (contractEth * ethToDollarRate)

    /** Convert Multisig value to USD */
    const multisigHexWei = multisigResponse.data.result
    const multisigWei = parseInt(multisigHexWei, 16); // parsing a base 16 number
    const multisigEth = (multisigWei / 1e18) // divide by 10^18
    const multisigDollars = (multisigEth * ethToDollarRate)

    /** Format values */
    const totalEth = (contractEth + multisigEth).toFixed(4)
    const totalDollars = (contractDollars + multisigDollars).toFixed(2)

    console.log(`Sucessfully queried services. ETH: ${totalEth}, USD: ${totalDollars}`);

    res.status(200).json({
        eth: totalEth,
        dollars: totalDollars,
        ethUsdConversion: ethToDollarRate
    });
}

export default handler