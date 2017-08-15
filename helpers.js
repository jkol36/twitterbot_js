import twitter from 'twitter'
const Promise = require('bluebird')


export function fetchFollowers(username, twitterAccount, cursor) {
	return new Promise((resolve, reject)=> {
		twitterAccount.get('followers/ids', {screen_name:username, cursor:cursor}, function(error, followers, response) {
			resolve({followers:followers.ids, cursor:followers.next_cursor})
		})
	})
}

export function fetchFollowerCountRatio(username, twitterAccount) {
	return new Promise((resolve, reject)=> {
		twitterAccount.get('users/show', {screen_name: username}, function(error, response){
			let friendsCount = response.friends_count
			let followersCount = response.followers_count
			resolve(friendsCount/followersCount)
		})
	})
}

export function followFriends(ids, twitterAccount) {
	return new Promise((resolve, reject)=> {
		Promise.map((ids), (id)=> {
			return followUser(id, twitterAccount)
		})
		.then(followedUsers => resolve(followedUsers))
		.catch(err => reject(err))
	})

}

export function favoriteTweets(ids, twitterAccount) {
	let promises = []
	ids.forEach((tweetId)=> {
		promises.push(favoriteTweet(tweetId))
	})
	Promise.all(promises)
	.then(results=> results)
}

export function spamFollowers(followers, message) {
	followers.forEach(follower => {
		Promise.delay(1000)
		.then(() => sendDM(follower, message))
		.then(done => console.log(done))
	})
}

function followUser(userId, twitterAccount) {
		return new Promise((resolve, reject)=> {
			twitterAccount.post('friendships/create', {user_id:userId}, function(error, followedUser, response){
				if(!!error) {
					reject(error)
				}
				else {
					resolve(userId)
				}
		})
	})
}

function sendDM(follower, message) {
	return new Promise((resolve, reject)=> {
		resolve('sent message', message)
	})
}

function favoriteTweet(tweetId, twitterAccount) {
	return new Promise((resolve, reject)=> {
		twitterAccount.post('favorites/create', {id:tweetId}, function(error, tweetFavorited, response){
			if(!!error) {
				console.log('could not favorite', tweetId)
				reject(tweetId)
			}
			else {
				resolve(tweetId)
			}
		})
	})
}