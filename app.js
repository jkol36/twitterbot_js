import Twitter from 'twitter'
import {fetchFollowers, followFriends, fetchFollowerCountRatio, spamFollowers} from './helpers'

const jkol36 = new Twitter({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})



let cursorMapper = {}

function getInfluencer() {
	let influencers = ['nodejs']
	return influencers[Math.round(Math.random() * (influencers.length - 0) + 0)]
}

function test() {
	fetchFollowerCountRatio('wizkhalifa', jkol36)
	.then((ratio)=> console.log(ratio))
}
function startPromiseChain() {
	console.log('starting')
	let timer = new Date()
	let influencer = getInfluencer()
	console.log(influencer)
	let cursor 
	if(cursorMapper[influencer] != undefined) {
		cursor = cursorMapper[influencer]
	}

	console.log(cursor)
	fetchFollowers(influencer, jkol36, cursor)
	.then(result => {
		console.log(result)
		let {followers, cursor} = result
		cursorMapper[influencer] = cursor
		console.log('new cursor', cursorMapper[influencer], followers)
		if(cursor != 0) {
			followFriends(followers, jkol36)
			.then(() => {
				timer = new Date() - timer
				let now = new Date()
				if(timer > 10000) {
					startPromiseChain()
				}
				else {
					console.log('running')
					setTimeout(() => startPromiseChain(), 10000 - timer)
				}
			})
			.catch(err => {
				setTimeout(() => startPromiseChain(), 34000)
			})
		}
	})
}

startPromiseChain()
