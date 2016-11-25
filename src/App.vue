<template>
	<div @click="updateNote" id="qa-block">
		<transition name="slide-fade">
			<h1 v-if="showNote">{{ title }}</h1>
		</transition>
	</div>
</template>

<script>
	import questions from './question'
	import anwsers from './anwser'

	const arr = [
		'接下来会有一些小问题',
		'不要慌张~',
	]

	arr.push(...questions)
	console.log(questions)
	console.log(anwsers)

	export default {
		data() {
			return {
				title: '你好',
				showNote: true,
				num: 0
			}
		},
		methods: {
			updateNote: function() {
				this.showNote = false
				this.title = arr[this.num++]
				setTimeout(() => { this.showNote = true }, 1000)
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
	.slide-fade-enter-active
		transition all .4s ease
	.slide-fade-leave-active
		transition all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)
	.slide-fade-enter, .slide-fade-leave-active
		padding-left 10px
		opacity 0
</style>
