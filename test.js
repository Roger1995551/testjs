/**
 * 常用工具类
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
     * @param {string[] | Number[]} array 数组
     * @param {string | Number} key 数组内的某个元素
     */
    static containKey(array, key) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                return true
            }
        }
        return false
    }

    /**
     * 数组交集
     * @param {String[]|Number[]} array1 
     * @param {String[]|Number[]} array2 
     */
    static arrayIntersect(array1, array2){
        let array = []
        array1.forEach(arr1=>{
            this.containKey(array2, arr1)? array.push(arr1):"";
        })
        return array
    }

    /**
     * 数组并集
     * @param {String[]|Number[]} array1 
     * @param {String[]|Number[]} array2 
     */
    static arrayUnion(array1, array2){
        let array = []
        array2.forEach(arr2 => {
            array.push(arr2)
        });
        array1.forEach(arr1=>{
            array.push(arr1)
        })
        return array
    }

    /**
     * 数组差集 array1-array2
     * @param {String[]|Number[]} array1 
     * @param {String[]|Number[]} array2 
     */
    static arrayExcept(array1,array2){
        let array = []
        array1.forEach(arr1=>{
            this.containKey(array2, arr1)? "":array.push(arr1);
        })
        return array
    }

    /**
     * 数组a是否包含数组b
     * @param {String[]|Number[]} array1 
     * @param {String[]|Number[]} array2 
     */
    static arrayContains(array1, array2){
        let index = 0;
        array1.forEach(arr1=>{
            this.containKey(array2,arr1) ? index+=1:""
        })
        return index === array2.length
    }

    /**
     * 是否为空
     * @param {*} obj 
     */
    static isNullAndUndefined(obj){
        if(obj == null || obj == undefined){
            return true
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
     * @param {String} key 保存数据的key
     * @param {Object} value  需要保存的数据
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
     * 存数组数据
     * @param {String} key 
     * @param {Object} value 
     * @param {Date} expire 
     */
    setArrayExpire(key, value, expire){
        let array = this.getExpire(key)
        if(!array){
            array = []
        }
        array.push(value);
        this.setExpire(key, array, expire)
    }

    /**
     * 存储键值对数据
     * @param {String} map 存入键值对对象的名字
     * @param {String} key 键名
     * @param {Object} value 值
     * @param {Date} expire 过期时间
     */
    setMapExpire(map, key, value, expire){
        let obj = this.getExpire(map);
        if(!obj){
            obj = {}
        }
        obj[key] = value;
        this.setExpire(map,obj,expire)
    }

    /**
     * 存储的key单独存入数组中进行保存方便后面进行删除操作
     * @param {String} key 存储的key
     */
    setAddKey(key) {
        let list = this.storage.getItem("SaveList")
        if (list) {
            list = JSON.parse(list);
        } else {
            list = []
        }
        Tools.containKey(list, key)? undefined:list.push(key);
        this.storage.setItem("SaveList", JSON.stringify(list))
    }

    /**
     * 获取存储值
     * @param {String} key 存入的key 
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
     * @param {String[]} list 需要删除的多个key 
     */
    removeList(list) {
        list.forEach(arr => {
            this.storage.removeItem(arr)
        });
    }


}