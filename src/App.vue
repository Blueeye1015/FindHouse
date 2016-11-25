<template>
	<div @click="updateNote" id="qa-block">
		<transition name="slide-fade">
			<h1 v-if="showNote">{{ title }}</h1>
		</transition>
		<transition name="slide-fade">
			<div v-if="showAnwser" id="anwsers">
				<p class="anwser" v-for="(item, index) in this.currentAnwser" @click="pushAnwser(index)">{{ item }}</p>
			</div>
		</transition>
	</div>
</template>

<script>
	import questions from './question'
	import anwsers from './anwser'

	const arr = [
		'无繁琐，只有妙不可言',
		'正在处理一些事情...',
	]

	arr.push(...questions)

	const end = arr.length

	export default {
		data() {
			return {
				title: 'Hi',
				showNote: true,
				showAnwser: false,
				currentAnwser: [],
				userChoose: [],
				num: 0
			}
		},
		methods: {
			updateNote: function() {
				this.showNote = false
				this.showAnwser = false

				if ( this.num === end ) {
					this.$http.get('/', this.userChoose).then((respone) => { // 这里改一下api地址
						console.log(respone) // 这个回调可以做api打完之后的事情
					})
				}

				// 目前预设的开场白是2句，所以是this.num - 2。如果你们加了开场白，需要改一下
				if ( this.num - 2 >= 0 ) {
					this.currentAnwser = anwsers[this.num - 2]
					setTimeout(() => { this.showAnwser = true }, 1500)
				}

				this.title = arr[this.num++]
				setTimeout(() => { this.showNote = true }, 1000)
			},
			pushAnwser: function(anwser) {
				this.userChoose.push(anwser)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	#qa-block
		font-size 1.5em
		text-align center
		position absolute
		top 0
		bottom 0
		left 0
		right 0
		margin auto
		height 240px
		width 70%
		.anwser
			font-size 1.2em

	.slide-fade-enter-active
		transition all .4s ease
	.slide-fade-leave-active
		transition all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)
	.slide-fade-enter, .slide-fade-leave-active
		padding-left 10px
		opacity 0
</style>
