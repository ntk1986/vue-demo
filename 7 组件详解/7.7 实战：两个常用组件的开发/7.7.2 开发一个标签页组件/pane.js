Vue.component('pane', {
    name: 'pane',
    template: '\
		<div class="pane" v-show="show">\
			<slot></slot>\
		</div>',
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            show: true
        };
    },
    methods: {
        // pane组件更新，触发tabs组件更新tabs-bar
        updateNav: function () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label: function () {
            this.updateNav();
        }
    },
    // 初始化pane组件的时候，通知tabs组件更新tabs-bar
    mounted: function () {
        this.updateNav();
    }
})