const mongoose = require('mongoose')

const url = `mongodb+srv://thivankas:${password}@cluster0.fbgbcsu.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = mongoose.Schema({ name    : String,number  : String })

const Person = mongoose.model('Person',personSchema)

if(name && number) { const person = new Person({ name    : name, number  : number, }); person.save().then((result) => { console.log(`Added ${result.name} number ${result.number} to phonebook`); mongoose.connection.close()}) } else { Person.find({}).then((result) => { console.log('phonebook : '); result.forEach((record) => { console.log(`${record.name} ${record.number}`) }); mongoose.connection.close() })}