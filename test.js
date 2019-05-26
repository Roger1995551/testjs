/**
 * 常用工具实现类
 */
class Tools {
    /**
     * 判断是否以某个字符串开头
     * @param {string} str 需要判断的字符串
     * @param {string} startStr 开头的字符串
     */
    static startWith(str, startStr) {
        return str.substr(0, startStr.length) === startStr
    }

    /**
     * 判断是否以某个字段结尾
     * @param {string} str 需要判断的字符串
     * @param {string} endStr 结尾的字符串
     */
    static endWith(str, endStr) {
        return str.substr(str.length - endStr.length) === endStr
    }

    /**
     * 判断数组里面是否存在某个元素
     * @param {Array} array 数组
     * @param {any} key 数组内的某个元素
     */
    static containKey(array, key) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                return true
            }
        }
        return false
    }
}

/**
 * 浏览器本地存储类
 */
class Storage {
    constructor() {
        this.storage = window.localStorage
    }
    /**
     * 添加数据并设置保存时长
     * @param {any} key 保存数据的key
     * @param {any} value  需要保存的数据
     * @param {Date} expire 设置失效时间 
     */
    setExpire(key, value, expire) {
        let obj = {
            data: value,
            time: Date.now(),
            expire: expire
        };
        this.setAddKey(key)
        this.storage.setItem(key, JSON.stringify(obj));
    }

    /**
     * 存储的key单独存入数组中进行保存方便后面进行删除操作
     * @param {*} key 存储的key
     */
    setAddKey(key) {
        let list = this.storage.getItem("SaveList")
        if (list) {
            list = JSON.parse(list);
        } else {
            list = []
        }
        list.push(key)
        this.storage.setItem("SaveList", JSON.stringify(list))
    }

    /**
     * 获取存储值
     * @param {*} key 存入的key 
     */
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

    /**
     * 删除所有通过方法添加的存储
     */
    removeAll() {
        let list = this.storage.getItem("SaveList");
        if (!list) {
            return list
        }
        list = JSON.parse(list)
        this.removeList(list)
        this.storage.setItem("SaveList", JSON.stringify([]))
    }

    /**
     * 删除指定集合的key
     * @param {Array} list 
     */
    removeList(list) {
        list.forEach(arr => {
            this.storage.removeItem(arr)
        });
    }


}