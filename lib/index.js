/**
 * Created by liutiantian on 2017/7/6.
 */
function smartAssign() {
    if (arguments && arguments.length === 1) {
        return arguments[0];
    }

    if (typeof arguments[1] === 'function' || typeof arguments[2] === 'function') {
        throw new TypeError('smartAssign does not accept function type parameter.');
    }

    const keys = {}
    for (const key in arguments[0]) {
        keys[key] = 0
    }
    for (const key in arguments[1]) {
        keys[key] = 1
    }
    for (let key in keys) {
        if (arguments[1][key] instanceof Array) {
            arguments[0][key] = [];
            if (Object.assign) {
                Object.assign(arguments[0][key], arguments[1][key]);
            }
            else {
                for (let i = 0; i < arguments[1][key].length; ++i) {
                    if (['string', 'boolean', 'number', 'undefined'].indexOf(typeof arguments[1][key][i]) > -1) {
                        arguments[0][key].push(arguments[1][key][i]);
                    }
                    else if (typeof arguments[1][key][i] === 'function') {
                        let fun = smartAssign(
                            {},
                            {
                                fun: undefined,
                            },
                            {
                                fun: arguments[1][key][i],
                            }
                        );
                        arguments[0][key].push(fun.fun);
                    }
                    else {
                        arguments[0][key].push({});
                        smartAssign(arguments[0][key][i], arguments[1][key][i]);
                    }
                }
            }
        }
        else if (typeof arguments[1][key] === 'object' && arguments[1][key] !== null && !(arguments[1][key] instanceof Date) && !(arguments[1][key] instanceof File)) {
            if (!arguments[0].hasOwnProperty(key) || typeof arguments[0][key] !== 'object') {
                arguments[0][key] = {};
            }
            smartAssign(arguments[0][key], arguments[1][key]);
        }
        else {
            if (Object.assign) {
                let temp = {};
                temp[key] = arguments[1][key];
                console.log("temp: ", temp)
                console.log("arguments[0] 1: ", arguments[0])
                Object.assign(arguments[0], temp);
                console.log("arguments[0] 2: ", arguments[0])
            }
            else {
                arguments[0][key] = arguments[1][key];
            }
        }
    }
    if (arguments.length > 2) {
        let parameters = [arguments[0]];
        for (let i = 2; i < arguments.length; ++i) {
            parameters.push(arguments[i]);
        }
        smartAssign.apply(this, parameters);
    }
    return arguments[0];
}

module.exports = smartAssign;