import { expect } from 'chai'
import Twitter from 'twitter'

describe('Auth with Twitter', () => {
	it('should auth with twitter and fetch followers for jkol36', done => {
		let client = new Twitter({
			consumer_key:process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token_key:process.env.ACCESS_TOKEN,
			access_token_secret:process.env.ACCESS_TOKEN_SECRET
		})
		client.get('followers/ids', {screen_name:'jkol36'}, function(error, followers, response) {
			console.log(followers)
			expect(followers).to.not.be.null
			done()
		})
	})
})
