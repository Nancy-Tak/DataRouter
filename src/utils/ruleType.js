/**
 * 表单验证规则（for Ant）
 *
 * by koen
 * 2016/9/28
 */

// Ant 验证中默认可用的 type 类型有：
//
// string: Must be of type string. This is the default type.
// number: Must be of type number.
// boolean: Must be of type boolean.
// method: Must be of type function.
// regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
// integer: Must be of type number and an integer.
// float: Must be of type number and a floating point number.
// array: Must be an array as determined by Array.isArray.
// object: Must be of type object and not Array.isArray.
// enum: Value must exist in the enum.
// date: Value must be valid as determined by Date
// url: Must be of type url.
// hex: Must be of type hex.
// email: Must be of type email.

// 自定义数据类型
const dataType = {
    // 任意字符
    "any": {
        reg: /[\w\W]+/
    },
    // 4-20任意字符
    // "*4-20": /^[\w\W]{4,20}$/,
    // 数字
    "number": {
        reg: /^\d+$/,
        errMsg: '只能是整数'
    },
    // 中文
    "cn": {
        reg: /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/,
        errMsg: '只能是中文'
    },
    // 英文/数字组合
    "en-num": {
        reg: {
            // 自定义 test 方法
            test: function(value) {
                return /[a-zA-Z]+(?=[0-9]+)|[0-9]+(?=[a-zA-Z]+)/.test(value) &&　value.replace(/[a-zA-Z]/g, '').replace(/[0-9]/g, '') === '';
            }
        },
        errMsg: '必须是英文字母、数字组合'
    },
    // 邮政编码
    "post": {
        reg: /^[0-9]{6}$/,
        errMsg: '邮政编码格式不正确'
    },
    // url
    "url": {
        reg: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
        errMsg: 'url格式不正确'
    },
    //idcard
    "id-card":{
        reg:/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
        errMsg: '身份证号码格式不正确'
    },

    /********************数由********************/
    //中文、英文字符
    "cn+en": {
        reg: /^[\u4e00-\u9fa5a-zA-Z]+$/,
        errMsg: "中英文字符"
    },
    //英文字母（区分大小写）、数字，可含半角标点符号•.,-_~ *()!@#$%^&
    "password":{
        reg:/^[a-zA-Z0-9_\-~\*\(\)\!@\#\$%\^\.•,&]+$/,
        errMsg:'英文字母（区分大小写）、数字，可含半角标点符号•.,-_~ *()!@#$%^&'
    },
    //中文字符、半角标点符号•.,-_~ *()
    "cn+str": {
        reg: /^[\u4e00-\u9fa5_\-~\*\(\)\.•,]+$/,
        errMsg: "中文字符、半角标点符号•.,-_~ *()"
    },
    //中英文字符、半角标点符号•.,-_~ *()
    "cn+en+str": {
        reg: /^[\u4e00-\u9fa5_\-~\*\(\)\.•,a-zA-Z]+$/,
        errMsg: "中英文字符、半角标点符号•.,-_~ *()"
    },
    //英文字母（区分大小写）、数字、中文字符
    "cn+en+num": {
        reg: /^[\u4e00-\u9fa50-9a-zA-Z]+$/,
        errMsg: "英文字母（区分大小写）、数字、中文字符"
    },
    // 手机
    "mobile": {
        reg: /^13[0-9]{9}$|^14[5|7|9][0-9]{8}$|^15[0-9]{9}$|^17[0|1|3|5|6|7|8][0-9]{8}$|^18[0-9]{9}$/,
        errMsg: '手机格式不正确'
    },
    // email
    "email": {
        reg: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        errMsg: '邮箱格式不正确'
    },
    //座机号码
    "telephone":{
        reg: /^(\d|-){1,30}$/,
        errMsg: '数字和符号-'
    },
    //产品价格
    "productPrice":{
        reg: /^[1-9]\d{0,18}(.\d{0,2})?$/,
        errMsg: '产品价格不正确,1-19位可精确到小数点后两位'
    },

};

// 生成 Ant 验证规则 rule
export default function getRule(type, errMsg) {
    const validate = dataType[type];
    if(validate){
        return {
            validator: function(rule, value, callback) {
                // console.log(rule)
                if (!value) {
                    callback();
                } else {
                    if(!validate.reg.test(value)){
                        callback([new Error(errMsg || validate.errMsg)]);
                    }else{
                        callback();
                    }
                }
            }
        }
    }
}
