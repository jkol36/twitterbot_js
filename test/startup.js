require('dotenv').config()
import {expect} from 'chai'

describe('Startup', () => {
	it('should load twitter credentials', done => {
		expect(process.env.CONSUMER_KEY).to.not.be.null
		expect(process.env.CONSUMER_SECRET).to.not.be.null
		expect(process.env.ACCESS_TOKEN).to.not.be.null
		expect(process.env.ACCESS_TOKEN_SECRET).to.not.be.null
		done()

	})
})