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

    for (let key in arguments[1]) {
        if (arguments[1].hasOwnProperty(key)) {
            if (arguments[1][key] instanceof Array) {
                arguments[0][key] = [];
                for (let i = 0; i < arguments[1][key].length; ++i) {
                    arguments[0][key].push({});
                    smartAssign(arguments[0][key][i], arguments[1][key][i]);
                }
            }
            else if (typeof arguments[1][key] === 'object') {
                if (!arguments[0].hasOwnProperty(key) || typeof arguments[0][key] !== 'object') {
                    arguments[0][key] = {};
                }
                smartAssign(arguments[0][key], arguments[1][key]);
            }
            else {
                if (Object.assign) {
                    let temp = {};
                    temp[key] = arguments[1][key];
                    Object.assign(arguments[0], temp);
                }
                else {
                    arguments[0][key] = arguments[1][key];
                }
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