var app = new Vue({
	el: '#app',
	data: {
		// 在实际业务中，这个列表是通过Ajax从服务端动态获取的，这里只做示例，构建列表数据。
		list: [{
				id: 1,
				name: 'iphone 7',
				price: 6188,
				count: 1
			},
			{
				id: 2,
				name: 'iPad Pro',
				price: 5888,
				count: 1
			},
			{
				id: 3,
				name: 'MacBook Pro',
				price: 21488,
				count: 1
			}
		],
		pickedList: [],
		selectAllChecked: false,
		selectAll: [0, 1, 2]
	},
	computed: {
		selectedMoney: function() {
			var selectedMoney = 0;
			for (var i = 0; i < this.pickedList.length; i++) {
				var index = this.pickedList[i];
				selectedMoney += this.list[index].price * this.list[index].count;
			}
			return selectedMoney;
		}
	},
	methods: {
		handleReduce: function(index) {
			// 防御性代码，当数量为1时，禁止减少，直接返回。
			if (this.list[index].count === 1) return;
			this.list[index].count--;
		},
		handleAdd: function(index) {
			this.list[index].count++;
		},
		handleRemove: function(index) {
			// splice(index:number, num:number), index：需要删除元素的下标，num：删除元素的个数
			this.list.splice(index, 1);
		}
	}
})