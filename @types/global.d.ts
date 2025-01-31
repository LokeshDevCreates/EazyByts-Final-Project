declare global {
    var _mongoClientPromise: Promise<MongoClient>;
  }
  
  // This is required for the module to work correctly
  export {};
  