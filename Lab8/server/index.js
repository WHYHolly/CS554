const { ApolloServer} = require("apollo-server");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");


const UnsplashAPI = require("./datasources/photo");
const { RedisCache } = require('apollo-server-cache-redis');

const cache = new RedisCache({
  host: 'localhost',
  port: 6379
})

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context:{ cache },
  dataSources: () => ({
    UnsplashAPI: new UnsplashAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
