// Reference to the collection you want to create or use
const myCollection = db.collection('my_collection_name');

// Add a document to the collection
myCollection.add({
  field1: 'value1',
  field2: 'value2',
  // Add more fields as needed
})
.then(docRef => {
  console.log('Document written with ID: ', docRef.id);
})
.catch(error => {
  console.error('Error adding document: ', error);
});