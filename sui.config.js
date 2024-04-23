const getFullNodeURL = (url) => (
  networkConfig[url]
)

const networkConfig = {
  'localhost': 'sample-localhost-url',
  'devnet': 'https://fullnode.devnet.sui.io:443',
  'testnet': 'https://fullnode.testnet.sui.io:443'
}
