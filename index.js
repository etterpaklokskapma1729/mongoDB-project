const {MongoClient} = require('mongodb');
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFusion2';



// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
 

//     const client = new MongoClient(uri, { useNewUrlParser : true, useUnifiedTopology : true });
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
//         await  listDatabases2(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

// async function listDatabases2(client){
//     let dbname1 = await client.db().dishes.find();
//     console.log(dbname1)
// }

// main().catch(console.error);

MongoClient.connect(url).then((client, err) => {

    assert.equal(err, null);

    console.log('Connected Successfull To Server');

    var db = client.db(dbname);

    dboper.insertDocument(db, { name : "Vadonut", description : 'Test'}, "menu")
    .then((result) => {

        // console.log('Insert Document:\n', result.ops);
        console.log(result)
        return dboper.findDocument(db, "menu")
    })
    .then((docs) => {
        console.log('Found Documents:\n', docs);

        return dboper.updateDocument(db, { $set: {name : "Vadonut", description : "Updated Test" } }, { $set: {description : "Updated Test"} }, "menu");
    })
    .then((result) => {
        console.log(result);
        console.log('Updated Document:\n', result);

        return dboper.findDocument(db, "menu")
    })
    .then((docs) => {
        console.log('Found Documents:\n', docs);

        return db.dropCollection("menu")
    })
    .then((result) => {
        console.log('Dropped Collection: ', result);

        client.close();
    }).catch((err) =>  console.log(err));
})
.catch((err) => console.log(err));
