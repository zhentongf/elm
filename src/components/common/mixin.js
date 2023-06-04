export const loadMore = {
    directives: {
        // 滚动到距离底部100px以内就调用loadMore
        'load-more': {
            bind: (el, binding) => {
                let oldScrollTop;
                let requestFrame;
                let scrollEl;
                let scrollType = el.attributes.scrollType && el.attributes.scrollType.value;
                if(scrollType == 2) {
                    // 2 代表此元素内部滚动
                    scrollEl = el;
                    // 监听内部滚动
                    el.addEventListener('scroll', () => {
                        loadMore();
                    }, false)
                } else {
                    // 其他或 1 代表整个页面滚动
                    scrollEl = document.documentElement;
                }
                
                el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

                el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
				}, false)

                const moveEnd = () => {
					requestFrame = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFrame);
							loadMore();
						}
					})
				}

                const loadMore = () => {
                    if(scrollEl.scrollHeight - scrollEl.clientHeight - scrollEl.scrollTop < 100) {
                        // 调用loadMore
                        binding.value();
                    }
                }
            },
        },
    },
}