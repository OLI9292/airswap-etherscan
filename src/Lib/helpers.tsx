import mergeWith from "lodash/mergeWith"

export const convertValueToEth = (value: number): number =>
  value / 1000000000000000000

// lodash/merge would not replace a non-empty list with an empty list
export const _mergeWith = (state: any, response: any) =>
  mergeWith(
    {},
    state,
    response,
    (srcValue: any, objValue: any, key: string): any => {
      if (Array.isArray(objValue)) {
        return objValue
      }
    }
  )
