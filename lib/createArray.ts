import { Unit } from "./Unit"


export let createArray = (n: number): Array<Unit> => {
    // Max stack size exceeded
    //return n == 0 ? [] : [{}].concat(createArray(n - 1))
    let result = Array<Unit>()
    for(let c = 0; c < n; c++) {
        result.push({})
    }
    return result
}