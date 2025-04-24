// const { MongoClient } = require('mongodb');

// async function main() {
//   const uri = 'mongodb://localhost:27017'; // Use your MongoDB URI here
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();

//     const database = client.db('locations'); // Name of your database
//     const collection = database.collection('locations'); // Name of your collection

//     // Data to insert
//     const locations = [
//       { name: "Coal & Coffee", type: "Cafe", area: "Gulshan 1" },
//       { name: "North End Coffee Roasters", type: "Cafe", area: "Dhanmondi" },
//       { name: "Bunka", type: "Restaurant", area: "Gulshan 1", cuisine: "Japanese" },
//       { name: "Suhrawardy Udyan", type: "Park", area: "Shahbagh" },
//       { name: "New Market", type: "Shopping Mall", area: "New Market Area" },
//       { name: "Shilpakala Academy", type: "Cultural Space", area: "Segunbagicha" },
//       { name: "The Living Room", type: "Bar", area: "Banani" },
//       { name: "Blockbuster Cinemas", type: "Movie Theater", area: "Jamuna Future Park" },
//       { name: "Old Dhaka Street Food", type: "Food Street", area: "Old Dhaka" },
//       { name: "Nandan Park", type: "Amusement Park", area: "Purbachal" }
//     ];

//     // Insert the data into the collection
//     const result = await collection.insertMany(locations);
//     console.log(`${result.insertedCount} locations were inserted`);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);
