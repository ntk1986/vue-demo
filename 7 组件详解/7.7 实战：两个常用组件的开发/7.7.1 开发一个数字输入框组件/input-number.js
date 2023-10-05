// 校验字符串value是否可以转Number类型
function isValueNumber(value) {
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
	template: '\
		<div class="input-number">\
			<input\
				type="text"\
				:value="currentValue"\
				@change="handleChange">\
			<button\
				@click="handleDown"\
				:disabled="currentValue <= min">-</button>\
			<button\
				@click="handleUp"\
				:disabled="currentValue >= max">+</button>\
		</div>',
	// props是单向数据流，无法在组件内直接修改
	// 我们在组件内声明一个data，默认引用props内value的值，然后在组件内维护这个data
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data: function() {
		return {
			currentValue: this.value
		}
	},
	// data内赋值只解决了初始化的问题，父组件内修改value，input-number内的currentValue无法更新。
	// watch选项用来监听某个prop或data的改变，当它们发生变化时，就会触发watch配置的函数。
	watch: {
		// 监听data{currentValue}，有变动时触发绑定function
		currentValue: function() {
			// 响应父组件的事件，第一个参数是事件名称，第二个参数开始就是携带参数
			// input是特殊的事件，父组件可以是@input，也可以是v-model（理解为语法糖）
			this.$emit('input', this.currentValue)
		},
		// 监听props{value}，父组件value修改时，触发绑定function
		value: function(val) {
			// 将父组件传过来的value，过滤后赋值给data（currentValue）。
			this.updateValue(val);
		}
	},
	methods: {
		// 用来过滤正确的currentValue
		updateValue: function(val) {
			if (val > this.max) val = this.max;
			if (val < this.min) val = this.min;
			this.currentValue = val;
		},
		handleDown: function() {
			if (this.currentValue <= this.min) return;
			this.currentValue -= 1;
		},
		handleUp: function() {
			if (this.currentValue >= this.max) return;
			this.currentValue += 1;
		},
		handleChange: function(event) {
			var val = event.target.value.trim();
			var max = this.max;
			var min = this.min;

			if (isValueNumber(val)) {
				val = Number(val);
				this.currentValue = val;
				if (val > max) {
					this.currentValue = max;
				} else if (val < min) {
					this.currentValue = min;
				}
			} else {
				// 如果输入值不是数字类型，使用currnetValue替换输入的字符串
				event.target.value = this.currentValue;
			}
		}
	},
	mounted: function() {
		// 在组件实例初始化的时候，对value进行过滤
		this.updateValue(this.value);
	}
})