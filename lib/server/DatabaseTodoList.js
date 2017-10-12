const Sequelize = require('sequelize');

module.exports = class DatabaseTodoList {

  constructor() {
    const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/todo-subsecond'
    this._sequelize = new Sequelize(databaseUrl, { logging: false, operatorsAliases: false })

    this.Todo = this._sequelize.define('todo', {
        text: Sequelize.STRING,
        done: Sequelize.BOOLEAN,
    })
  }

  async start(truncate) {
    if (truncate) {
      await this._sequelize.sync({ force: true })
    }
  }

  async addTodo({ text }) {
    await this.Todo.create({ text })
  }

    async markAsDone(index) {
        const record = (await this.Todo.all())[index]
        // console.log('record:', record)
        record.done = true;
        await record.save()
    }

  async getTodos() {
    return this.Todo.all().map(cheese => ({
        text: cheese.text,
        done: cheese.done,
    }))
  }
}
