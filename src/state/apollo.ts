import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "http://localhost:3001/api/v1/" });

// Setup client with rest link
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
});

export default client;
