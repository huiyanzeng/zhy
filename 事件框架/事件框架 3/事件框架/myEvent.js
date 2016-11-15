/**
 * Created by wenyuan on 16/10/18.
 * copyRight @george
 * 正版保证,盗版必究
 */

//数据查询模块
//事件操作模块
//补充模块

var $$ = function () {};

$$.prototype = {

    //  去除字符串当中的空格
    // 左空格
    ltrim:function (str) {
        return str.replace(/(^\s*)/g,'');
    },
    rtrim:function (str) {
        return str.replace(/(\s*$)/g,'');
    },
    trim:function (str) {
        return str.replace(/(\s*)/g,'');
    },
    lrtrim:function (str) {
        return str.replace(/(^\s*)|(\s*$)/gm,"");
    },
    //  框架扩展方法
    $extend:function (dis,src) {
        for(var attr in src)
        {
            dis[attr] = src[attr];
        }

        return dis;
    },

    //取出左空格 右空格 中间空格

    //数据解析方法
    $appendArray:function (disArray,srcArray) {
    for(var i = 0;i < srcArray.length;i++)
    {
        disArray.push(srcArray[i]);
    }
    },

    // 类型判断模块
    $isString:function (str) {
        return typeof str === "string";
    },
    $isNumber:function (num) {
        return typeof num === "number" && isFinite(num);
    },
    $isBoolean: function (bool) {
        return typeof bool === "boolean";
    },
    $isUndefined : function (un) {
        return typeof un === "undefined";
    },
    $isNull : function (nu) {
        return nu === null;
    },
    $isArray:function (arr) {
        if(this.$isNull(arr) || this.$isUndefined(arr))
        {
            return false;
        }

        return arr.constructor === Array;
    },
    $isObject:function (obj) {
        if(this.$isNull(obj) || this.$isUndefined(obj))
        {
            return false;
        }

        return typeof obj === "object";
    }
    //... 布尔值 array数组 函数 
};



//  DOM当中如何知道一个节点是标签??? type = 1

// div > p > span
//
// //  div head
//
// head.children type = 1
// head.children.children
//
// function searchhoudai(head,houdai) {
//     return true;
//     return false;
// }
//
// // div > ul??

var $$ = new $$();
console.log($$);
$$.$extend($$,{
//    数据查询方式
    $:function (str) {
        switch (this.$type(str))
        {
            case "id":
                return $$.$id(str);
                break;
            case "class":
                return $$.$class(str);
                break;
            case "tag":
                return $$.$tag(str);
                break;
            default:
                return "你的条件我做不到啊";
        }
    },
    $type:function (str) {
        if(str.match(/#/))
        {
            return "id";
        }
        else if(str.match(/\./))
        {
            return "class"
        }else{
            return "tag";
        }
    },
//    以id查询的封装
    $id:function (idStr) {

        //首先对id进行 字符串匹配
        var result = idStr.replace(/#/,"");
        return document.getElementById(result);
    },
    $class:function (classStr) {
        var result = classStr.replace(/./,"");
        return document.getElementsByClassName(result);
    },
    $tag:function (tagStr) {
        return document.getElementsByTagName(tagStr);
    },
    $name:function (name) {
        return document.getElementsByName(name);
    },
    //子节点查询
    $tab:function (tabStr) {
        var array = tabStr.match(/\w+/g);
        var father = this.$tag(array[0]);
        var result = [];
        var child = this.$tag(array[1]);
        for(var index = 0;index < child.length;index++)
        {
            if( child[index].parentNode == father[0])
            {
                result.push(child[index]);
            }
        }
        return result;
    },
    // 组查询  div,p,h,span
    $group:function (groupStr) {
        // // id的# 和class的.会被忽略
        // var array = groupStr.match(/\w+/g);
        // console.log(groupStr.split(","));
        // // 这是最对的正则匹配
        // console.log(groupStr.match(/([0-9A-Za-z#._-]+)/g));
        var result = groupStr.match(/([0-9A-Za-z#._-]+)/g);
        var array = [];
        //利用上面查询到的正则 匹配相应的选择方法
        for(var index = 0; index < result.length;index++)
        {
            // if(result[index].match(/#/))
            // {
            //     array.push($$.$id(result[index]));
            // }else if(result[index].match(/\./))
            // {
            //     //分离数组 直接放到 array里面
            //   var temp =  $$.$class(result[index]);
            //   // for(var i = 0;i < temp.length;i++)
            //   // {
            //   //     array.push(temp[i]);
            //   // }
            //
            //   $$.$appendArray(array,temp);
            // }else{
            //     var temp1 =  $$.$tag(result[index]);
            //     //     for(var i1 = 0;i1 < temp1.length;i1++)
            //     //     {
            //     //         array.push(temp1[i1]);
            //     //     }
            //
            //     $$.$appendArray(array,temp1);
            //     }

            switch (result[index])
            {
                case "id":
                    array.push($$.$id(result[index]));
                    break;
                case "class":
                    $$.$appendArray(array,$$.$class(result[index]));
                    break;
                case "tag":
                    $$.$appendArray(array,$$.$tag(result[index]));
                    break;
            }
        }
        return array;
    }
});

// 一个框架其延展性一定要好
//如果未来需要对这个对象进行扩充,怎么想

// 为原对象添加事件扩充方法 
$$.$extend($$,{

    // 事件绑定
        onMany:function (str,type,func) {
        //    (1)给条件 (2)给查询完的结果

        //    (1)如果条件是直接对象
        //    (2)如果条件是字符串

            if($$.$isObject(str))
            {
                $$.on(str,type,func);
            }else{
                var result = $$.$(str);

                // 通过判断是不是数组操作 
                if(!$$.$isArray(result))
                {
                    $$.on(result,type,func);
                }

                for(var i = 0;i < result.length;i++)
                {
                    $$.on(result[i],type,func);
                }
            }
        },
    
        on:function (id,type,func) {
            //id 可能是真正的对象 也可能是字符串
            //type是事件类型
            // func 事件的响应

            // 判断id的类型 找到真正需要添加事件的对象

            // var result = typeof id === "string";
            //
            // var dom = result?this.$id(id):id;

            var dom = this.$isString(id)?this.$id(id):id;

            // 添加事件绑定(其实是原生js当中的事件监听)
            // 记住这里的判断 在以后会经常用 
            if(dom.addEventListener){
                dom.addEventListener(type,func);
            }
            // 兼容IE
            if(dom.attachEvent)
            {
                dom.attachEvent('on' + type,func);
            }
            
        },
    
    // 事件解绑
       un:function (id,type,func) {
           var dom = this.$isString(id)?this.$id(id):id;
           if(dom.removeEventListener){
               dom.removeEventListener(type,func);
           }
           // 兼容IE
           if(dom.detachEvent)
           {
               dom.detachEvent('on' + type,func);
           }
       },

    // 特征事件的封装 单击 双击 三击 四击 。。。拖拽
    click:function (id,func) {
        this.on(id,"click",func);
    },

    dblClick:function (id,func) {
        this.on(id,"dblclick",func);
    },

    triClick:function (id,func) {
        this.on(id,"triclick",func);
    }

//    鼠标事件
//    键盘事件
//    拖拽事件 

});

// css html attr 的设置
$$.$extend($$,{

});

// json等数据获取模块
$$.$extend($$,{

});

// ajax 等设置
$$.$extend($$,{
    myAjax:function(URL,func){
        var xhr = createXHR();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    func(xhr.responseText);
                }else{
                    alert("¥ÌŒÛµƒŒƒº˛£°");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        function createXHR() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    }
});