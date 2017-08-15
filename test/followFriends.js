import { expect } from 'chai'
import Twitter from 'twitter'
import {fetchFollowers} from '../helpers'


describe('Follow Friends', () => {
	it('should follow bovada followers from jkol36', done => {
		let client = new Twitter({
			consumer_key:process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token_key:process.env.ACCESS_TOKEN,
			access_token_secret:process.env.ACCESS_TOKEN_SECRET
		})


	})
})