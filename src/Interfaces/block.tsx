export interface Uncle {
  miner: string
  unclePosition: number
  blockReward: number
}

export interface Block {
  blockNumber: number
  timeStamp: number
  blockMine: string
  blockReward: number
  uncles: Uncle[]
  uncleInclusionReward: number
}
