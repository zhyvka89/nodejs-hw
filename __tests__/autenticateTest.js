const { Unauthorized } = require('http-errors')
const autenticate = require('../middleware/autenticate')
const jwt = require('jsonwebtoken')
require('dotenv').config()

describe('Autenticate Test', () => {
  const mockResponse = {}
  const mockNext = jest.fn()
  test('with authorization header', () => {
    const user = {
      _id: '5'
    }
    const payload = {
      id: user._id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    const mockRequest = {
      headers: {
        autorization: `Bearer ${token}`
      }
    }
    autenticate(mockRequest, mockResponse, mockNext)
    expect(mockRequest.headers.autorization).toEqual(`Bearer ${token}`)
  })
  test('without autorization header', () => {
    const mockRequest = {
      headers: {}
    }
    autenticate(mockRequest, mockResponse, mockNext)
    expect(autenticate).toThrowError(new Unauthorized('Invalid token'))
  })
})
