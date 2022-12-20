const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

// exports.dropCollection = (db, collection, callback) => {
//     const coll = db.collection(collection);
//     return coll.deleteMany({});
// };

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(
        { _id: new ObjectId() },
        document,
        { upsert: true }
    );

};
