/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if(!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if(!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 显示返回顶部按钮，滑动过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFrame;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
        showBackFun();
    }, false)

    //  document.addEventListener('touchstart',() => {
    //     showBackFun();
    //  },{passive: true})
 
    document.addEventListener('touchmove',() => {
        showBackFun();
    },{passive: true})

    document.addEventListener('touchend', () => {
        oldScrollTop = document.documentElement.scrollTop;
        moveEnd();
    }, {passive: true})

    // 每一帧判断一次屏幕是否停止运动
    const moveEnd = () => {
        requestFrame = requestAnimationFrame(() => {
            if(document.documentElement.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            } else {
                cancelAnimationFrame(requestFrame);
            }
            showBackFun();
        })
    };

    // 判断是否大于目标点500
    const showBackFun = () => {
        if(document.documentElement.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}