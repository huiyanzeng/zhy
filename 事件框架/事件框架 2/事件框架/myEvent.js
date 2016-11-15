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
    //  框架扩展方法
    $extend:function (dis,src) {
        for(var attr in src)
        {
            dis[attr] = src[attr];
        }

        return dis;
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

$$.$extend($$,{
//    数据查询方式
//    以id查询的封装
    $id:function (idStr) {
        return document.getElementById(idStr);
    },
    $class:function (classStr) {
        return document.getElementsByClassName(classStr);
    },
    $tag:function (tagStr) {
        return document.getElementsByTagName(tagStr);
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
    }
});

// 一个框架其延展性一定要好
//如果未来需要对这个对象进行扩充,怎么想

// 为原对象添加事件扩充方法 
$$.$extend($$,{

    // 事件绑定
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

});