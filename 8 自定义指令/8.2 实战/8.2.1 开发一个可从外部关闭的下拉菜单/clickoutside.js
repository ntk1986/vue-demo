Vue.directive('clickoutside', {
    // 指令第一次绑定元素时，给自定义指令绑定点击事件
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            //    判断是否点击在el范围内
            if (el.contains(e.target)) {
                return false;
            }

            //    如果点击在el范围之外，判断自定义指令是否包含expression
            if (binding.expression) {
                //    如果包含expression，执行
                binding.value(e);
            }
        }

        el.__vueClickOutside__ = documentHandler;
        // 指令绑定元素时，添加点击事件
        document.addEventListener('click', documentHandler)
    },
    // 指令与元素解绑时，注销点击事件
    unbind: function (el, binding) {
        //  指令解绑元素时，移除点击事件
        document.removeEventListener('click', el.__vueClickOutside__);
        //  删除事件，清理内存
        delete el.__vueClickOutside__;
    }
});