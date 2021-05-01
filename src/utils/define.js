/// グローバル定数を定義する
const define = (name, value) => {
    Object.defineProperty(window, name, {
        get: function () { return value; },
        set: function () { throw (name + ' is already defined !!'); },
    });
}

export default define;