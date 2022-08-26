function snapshot(e) {
    const o = {}
    let deep = 0
    debug(o, e)
    function debug(o, obj) {
        Object.setPrototypeOf(o, { constructor: obj.__proto__.constructor })
        for (const a in obj) {
            let b = obj[a]
            if (
                typeof b === 'string' ||
                typeof b === 'boolean' ||
                typeof b === 'number' ||
                typeof b === 'undefined' ||
                typeof b === 'symbol' ||
                typeof b === 'bigint' ||
                typeof b === 'function' ||
                b === null ||
                b instanceof EventTarget ||
                deep >= 10 // 以防万一
            )
                o[a] = obj[a]
            else {
                o[a] = {}
                deep++
                debug(o[a], b)
            }
        }
    }
    return o
}

exports.snapshot = snapshot