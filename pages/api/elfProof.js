import cors from 'cors';
import cache from 'express-redis-cache';

const c = cache();

const run = (req, res) => (fn) => new Promise((resolve, reject) => {
  fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
  )
})

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let elfWhitelist = require('../../data/elfWhitelist.json');
const hashedAddresses = elfWhitelist.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(hashedAddresses, keccak256, { sortPairs: true });


const handler = async (req, res) => {
  const middleware = run(req, res);
  await middleware(cors());
  await middleware(c.route({
      expire: 30
  }))
  /** validate req type **/
  if (req.method !== 'GET') {
    res.status(400).json({});
    return;
  }

  const address = req.query.address;
  if (!address) {
    res.status(400).json({ msg: "address is required"});
    return;
  }

  const hashedAddress = keccak256(address);
  const proof = merkleTree.getHexProof(hashedAddress);
  res.status(200).json({
    proof: proof
  });
}

export default handler
