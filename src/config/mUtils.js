/**
 * 兼容requestAnimationFrame
 */
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
        if (!name) {
            return
        }
        if (typeof content != 'string') {
            content = JSON.stringify(content)
        }
        try {
            window.localStorage.setItem(name, content)
        } catch (e) {
            alert('您的浏览器缓存超限了，请清楚浏览器缓存')
        }
    }
    /**
     * 获取localStorage
     */
export const getStore = name => {
        if (!name) {
            return
        }
        try {
            return window.localStorage.getItem(name)
        } catch (e) {
            alert('您的浏览器缓存超限了，请清楚浏览器缓存')
        }
    }
    /**
     * 删除localStorage
     */
export const removeStore = name => {
        if (!name) {
            return
        }
        try {
            window.localStorage.removeItem(name)
        } catch (e) {
            alert('您的浏览器缓存超限了，请清楚浏览器缓存')
        }
    }
    /**
     * 获取style样式
     */
export const getStyle = (element, attr, NumberMode = 'int') => {
        let target
        if (attr == 'scrollTop') {
            target = element.scrollTop
        } else if (element.currentStyle) {
            target = element.currentStyle[attr]
        } else {
            target = document.defaultView.getComputedStyle(element, null)[attr]
        }
        return NumberMode == 'float' ? parseFloat(target) : parseInt(target)
    }
    /**
     * 页面到达底部，加载更多
     */
export const loadMore = (element, callback) => {
        let windowHeight = window.screen.height
        height, setTop, paddingBottom, marginBottom, requestFrame, oldScrollTop
        document.body.addEventListener('scroll', () => {
            loadMore()
        }, false)
        element.addEventListener('touchstart', () => {
            height = element.offetHeight
            setTop = element.offsetTop
            paddingBottom = getStyle(element, 'paddingBottom')
            marginBottom = getStyle(element, 'marginBottom')
        }, { passive: true })
        element.addEventListener('touchmove', () => {
            loadMore()
        }, { passive: true })
        element.addEventListener('touchend', () => {
            oldScrollTop = document.body.scrollTop
            moveEnd()
        }, { passive: true })
        const moveEnd = () => {
            requestFrame = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
                    oldScrollTop = document.body.scrollTop
                    loadMore()
                    moveEnd()
                } else {
                    cancelAnimationFrame(requestFrame)
                        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
                    height = element.offetHeight
                    loadMore()
                }
            })
        }
        const loadMore = () => {
            if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
                callback()
            }
        }
    }
    /**
     * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
     */
export const showBack = callback => {
        let requestFrame,
            oldScrollTop;
        document.addEventListener('scroll', () => {
            showBackFun()
        }, false)
        document.addEventListener('touchstart', () => {
            showBackFun()
        }, { passive: true })
        document.addEventListener('touchmove', () => {
            showBackFun()
        }, { passive: true })
        document.addEventListener('touchend', () => {
            oldScrollTop = document.body.scrollTop
            moveEnd()
        })
        const moveEnd = () => {
            requestFrame = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
                    oldScrollTop = document.body.scrollTop
                    moveEnd()
                } else {
                    cancelAnimationFrame(requestFrame)
                }
                showBackFun()
            })
        }
        const showBackFun = () => {
            if (document.body.scrollTop > 500) {
                callback(true)
            } else {
                callback(false)
            }
        }
    }
    /**
     * 运动效果
     * @param {HTMLElement} element   运动对象，必选
     * @param {JSON}        target    属性：目标值，必选
     * @param {number}      duration  运动时间，可选
     * @param {string}      mode      运动模式，可选
     * @param {function}    callback  可选，回调函数，链式动画
     */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer)
        //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration
        duration = 400
    } else if (duration instanceof String) {
        mode = 'ease-out'
        duration = 400
    }
    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode
        mode = 'ease-out'
    }
    const attrStyle = attr => {
            if (attr == 'opacity') {
                return Math.round(getStyle(element, attr, 'float') * 100)
            } else {
                return getStyle(element, attr)
            }
        }
        //字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize)
    const unit = {}
    const initState = {}
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]/gi)[0] || 'px'
        } else {
            unit[attr] = 'px'
        }
        initState[attr] = attrStyle(attr)
    })
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize)
        } else {
            target[attr] = parseInt(target[attr])
        }
    })
    let flag = true
    const rememberSpeed = {}
    //debugger
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0,
                status = false,
                iCurrent = attrStyle(attr) || 0,
                speedBase = 0,
                intervalTime;
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent
                    intervalTime = duration * 5 / 400
                    break
                case 'linear':
                    speedBase = initState[attr]
                    intervalTime = duration * 20 / 400
                    break
                case 'ease-in':
                    let oldSpeed = rememberSpeed[attr] || 0
                    iSpeed = oldSpeed + (target[attr] - initState[attr]) / duration
                    rememberSpeed[attr] = iSpeed
                    break
                default:
                    speedBase = iCurrent
                    intervalTime = duration * 5 / 400
            }
            if (mode != 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
            }
            switch (mode) {
                case 'linear':
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed)
                    break
                default:
                    status = iCurrent != target[attr]
                    break
            }
            if (status) {
                flag = false
                if (attr == 'opacity') {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")"
                    element.style.opacity = (iCurrent + iSpeed) / 100
                } else if (attr == 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px'
                }
            } else {
                flag = true
            }
            if (flag) {
                clearInterval(element.timer)
                if (callback) {
                    callback()
                }
            }
        })
    }, 20)
}
