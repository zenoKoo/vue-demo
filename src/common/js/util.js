export default  {
    ceil(num,digit){
        return parseFloat(num).toFixed(digit?digit:0);
    },
    isNull(obj, tip) {
        if (!obj || obj == 'null') {
            if (tip) {
                //doUtil.alert(tip);
            }
            return true;
        } else {
            return false;
        }
    },
    parseTime(time, fmt) {
        Date.prototype.Format = function(fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(), 
                "m+": this.getMinutes(),
                "s+": this.getSeconds(), 
                "q+": Math.floor((this.getMonth() + 3) / 3), 
                "S": this.getMilliseconds()
               };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        };
        if(typeof time == 'string'){
            return time;
        }
        time = new Date(time).Format(fmt);
        return time;
    },
    formatDate(str) {
        var date = new Date(str);
        var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        if (time < 0) {
            return '';
        } else if (time / 1000 < 60) {
            return '刚刚';
        } else if ((time / 60000) < 60) {
            return parseInt((time / 60000),10) + '分钟前';
        } else if ((time / 3600000) < 24) {
            return parseInt(time / 3600000,10) + '小时前';
        } else if ((time / 86400000) < 31) {
            return parseInt(time / 86400000,10) + '天前';
        } else if ((time / 2592000000) < 12) {
            return parseInt(time / 2592000000,10) + '月前';
        } else {
            return parseInt(time / 31536000000,10) + '年前';
        }
    },
    goHref(href,isOpen) {
        if(isOpen){
            window.open(href);
        }else{
            window.location.href = href;
        }
    },
    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    checkPhone(value){
        var reg = /^(13[0-9]|14[7]|15[0-9]|17[0|1|6|7|8|9]|18[0-9])\d{8}$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    checkEmail(str){
       var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
       if(re.test(str)){
           return true;
       } else {
           return false;
       }
   },
    trim(myStr) {
        if (!String.prototype.trim){
            String.prototype.trim = function () {
                var str = this ,
                str = str.replace(/^\s\s*/, '' ),
                ws = /\s/,
                i = str.length;
                while (ws.test(str.charAt(--i)));
                return str.slice(0, i+1);
            };
        }
        return myStr.trim();
    },
    numReg(str,decimal,negative){
        var neg = (arguments[2] || false)?'-?':'';
        var isDec = arguments[1] || 0;
        var dec = isDec?'(\\.\\d{0,'+decimal+'})?':'';
        var regText = '^('+ neg + '\\d+)' + dec + '$';
        var reg = new RegExp(regText,'gim');
        return reg.test(str);
    },
    reunionClassify(classify, detail){
        for(var i=0;i<classify.length;i++){
            var c = classify[i];
            if(!c.children){
                c.children = [];
            }
            for(var j=0;j<detail.length;j++){
                if(c.specName == detail[j].specName){
                    c.children.push(detail[j]);
                }
            }
        }
        return classify;
    },
    encodeURI(data){
        var arg = {};
        for(var key in data){
            if(data[key] != ''){
                arg[key] = encodeURI(data[key]);
            }else{
                arg[key] = data[key];
            }
        }
        return arg;
    },
    checkPwd(data,min,max){
        var regText = '^\\w{'+min+','+max+'}$';
        var reg = new RegExp(regText,'gim');
        if(reg.test(data)){
            return true;
        }else{
            return false;
        }
    },
    checkSubPwd(data, min, max){
        //var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{'+ min +','+ max +'}');
        var reg = new RegExp('(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{'+ min +','+ max +'}');
        if(reg.test(data)){
            return true;
        }else{
            return false;
        }
    },
    alert(info,closeByUser){
        // var idoAlert = $(".ido-alert");
        // idoAlert.show().find('.ido-alert-content').html(info);
        // if(!closeByUser){
        //     setTimeout(function(){
        //         idoAlert.hide();
        //     },2000);
        // }
    }
}