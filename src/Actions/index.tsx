import { CALL_API } from "../Middleware/api"

import CONFIG from "../Lib/config"

const API_KEY = CONFIG.ETHERSCAN_API_KEY

export const fetchERC20TransactionsAction = (
  address: string,
  sort: string = "desc"
) => (dispatch: any, getState: any) =>
  dispatch(fetchERC20Transactions(address, sort))

const ERC20_TRANSACTIONS_REQUEST = "ERC20_TRANSACTIONS_REQUEST"
const ERC20_TRANSACTIONS_SUCCESS = "ERC20_TRANSACTIONS_SUCCESS"
const ERC20_TRANSACTIONS_FAILURE = "ERC20_TRANSACTIONS_FAILURE"

export const fetchERC20Transactions = (address: string, sort: string) => ({
  [CALL_API]: {
    endpoint: `?module=account&action=tokentx&address=${address}&sort=${sort}&apikey=${API_KEY}`,
    method: "GET",
    types: [
      ERC20_TRANSACTIONS_REQUEST,
      ERC20_TRANSACTIONS_SUCCESS,
      ERC20_TRANSACTIONS_FAILURE
    ],
    schema: "transactions"
  }
})

export const fetchNormalTransactionsAction = (
  address: string,
  sort: string = "desc"
) => (dispatch: any, getState: any) =>
  dispatch(fetchNormalTransactions(address, sort))

const NORMAL_TRANSACTIONS_REQUEST = "NORMAL_TRANSACTIONS_REQUEST"
const NORMAL_TRANSACTIONS_SUCCESS = "NORMAL_TRANSACTIONS_SUCCESS"
const NORMAL_TRANSACTIONS_FAILURE = "NORMAL_TRANSACTIONS_FAILURE"

export const fetchNormalTransactions = (address: string, sort: string) => ({
  [CALL_API]: {
    endpoint: `?module=account&action=txlist&address=${address}&sort=${sort}&apikey=${API_KEY}&page=1&offset=100`,
    method: "GET",
    types: [
      NORMAL_TRANSACTIONS_REQUEST,
      NORMAL_TRANSACTIONS_SUCCESS,
      NORMAL_TRANSACTIONS_FAILURE
    ],
    schema: "transactions"
  }
})

export const fetchBlockAction = (block: string) => (
  dispatch: any,
  getState: any
) => dispatch(fetchBlock(block))

const BLOCK_REQUEST = "BLOCK_REQUEST"
const BLOCK_SUCCESS = "BLOCK_SUCCESS"
const BLOCK_FAILURE = "BLOCK_FAILURE"

export const fetchBlock = (block: string) => ({
  [CALL_API]: {
    endpoint: `?module=block&action=getblockreward&blockno=${block}&apikey=${API_KEY}`,
    method: "GET",
    types: [BLOCK_REQUEST, BLOCK_SUCCESS, BLOCK_FAILURE],
    schema: "block"
  }
})

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE"

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})

export const LOAD_QUERY = "LOAD_QUERY"

export const loadQuery = (query: string) => ({
  type: LOAD_QUERY,
  response: { query, isLoading: true }
})

export const SET_IS_SCANNING = "SET_IS_SCANNING"

export const setIsScanning = (isScanning: boolean) => ({
  type: SET_IS_SCANNING,
  response: { isScanning }
})
