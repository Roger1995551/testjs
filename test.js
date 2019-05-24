class Tools {
    constructor() {

    }
    /**
     * 判断是否以某个字符串开头
     * @param str {string} 需要判断的字符串
     * @param startStr {string} 开头的字符串
     */
    startWith(str, startStr) {
        return str.substr(0, startStr.length) === startStr
    }

    /**
     * 判断是否以某个字段结尾
     * @param str {string} 需要判断的字符串
     * @param endStr {string} 结尾的字符串
     */
    endWith(str, endStr) {
        return str.substr(str.length - endStr.length) === endStr
    }

    /**
     * 判断数组里面是否存在某个元素
     * @param array {Array} 数组
     * @param key {any} 数组内的某个元素
     */
    containKey(array, key) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                return true
            }
        }
        return false
    }
}

class Storage {
    constructor() {
        this.storage = window.localStorage
        this.keyList = []
    }
    /**
     * 添加数据并设置保存时长
     * @param key {any} 保存数据的key
     * @param value {any} 需要保存的数据
     * @param expire {Date} 设置失效时间 
     */
    setExpire(key, value, expire) {
        let obj = {
            data: value,
            time: Date.now(),
            expire: expire
        };
        this.keyList.push(key)
        this.storage.setItem(key, JSON.stringify(obj));
    }

    getExpire(key) {
        let val = this.storage.getItem(key);
        if (!val) {
            return val;
        }
        val = JSON.parse(val);
        if (Date.now() - val.time > val.expire) {
            this.storage.removeItem(key);
            return null;
        }
        return val.data;
    }

    removeAll() {
        this.keyList.forEach(key => {
            this.storage.removeItem(key)
        });
    }
}
