const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { connect } = require('http2');

const url = 'mongodb://localhost:27017/';
const dbname = conFusion

MongoClient.connect(url, (err, client) => {
    
    assert.equal(err, null);

    console.log('Connected correctly to Server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name":"Uthappizza", "description":"test"}, (err, res) => {

        assert.equal(err, null);

        console.log('After Insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
           assert.equal(err, null);
           
           console.log('Found:\n');
           console.log(docs)

           db.collection.remove('dishes', (err, res) => {
                assert.equal(err, null);

                client.close();
           });
        });

    });
     

})