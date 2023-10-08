Vue.component('tabs', {
    name: 'tabs',
    template: '\
		<div class = "tabs">\
			<div class="tabs-bar">\
				<div \
					:class="tabCls(item)" \
					v-for="(item, index) in navList" \
					@click="handleChange(index)">\
					{{item.label}}\
				</div>\
			</div>\
			<div class="tabs-content">\
				<slot></slot>\
			</div>\
		</div>\
	',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getPanes: function () {
            // 获取所有name=“pane”的子节点。
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav: function () {
            // 清空navList
            this.navList = [];
            _this = this;

            // 获取所有pane，填充navList
            this.getPanes().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });

                if (!pane.name) pane.name = index;
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus: function () {
            var panes = this.getPanes();
            var _this = this;

            panes.forEach(function (pane) {
                return pane.show = pane.name === _this.currentValue;
            });
        },
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;

            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }
})