export interface ERC20Transaction {
  blockHash: string
  blockNumber: number
  confirmations: number
  contractAddress: string
  cumulativeGasUsed: number
  from: string
  gas: number
  gasPrice: number
  gasUsed: number
  hash: string
  input: string
  nonce: number
  timeStamp: string
  to: string
  tokenDecimal: number
  tokenName: string
  tokenSymbol: string
  transactionIndex: number
  value: number
}

export interface NormalTransaction {
  blockNumber: number
  timeStamp: string
  hash: string
  nonce: number
  blockHash: string
  transactionIndex: number
  from: string
  to: string
  value: number
  gas: number
  gasPrice: number
  isError: number
  txreceipt_status: number
  input: string
  contractAddress: string
  cumulativeGasUsed: number
  gasUsed: number
  confirmations: number
}
