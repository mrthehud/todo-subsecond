const fetch = require('node-fetch')

module.exports = class HttpTodoList {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  async addTodo({ text }) {
    const res = await fetch(this._baseUrl + '/todos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    if(res.status !== 201)
      throw new Error('Failed to create TODO')
  }

  async getItems() {
    throw new Error('TODO')
  }
}