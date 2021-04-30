import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Runtime } from "../runtime/Runtime";
import createEmployeeRepository from "./createEmployeeRepository";

export default function createProdRuntime(): Runtime {
    const gqlClient = new ApolloClient({
        // Using the Rick & Morty character API as a convenient source of data.
        uri: 'https://rickandmortyapi.com/graphql',
        cache: new InMemoryCache()
      });
    
    const employeeRepository = createEmployeeRepository(gqlClient);

    return {
        getEmployeeRepository: () => employeeRepository
    };
}