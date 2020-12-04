const {Schema, model} = require('pg')

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    dateUpdate: {type: Date},
    priority: {type: Number, required: true},
    status: {type: Number, required: true},
    creatorId: {type: Number, required: true},
    employeeId: {type: Number, required: true}
})

module.exports = model('Task', schema)