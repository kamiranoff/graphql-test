import axios from 'axios';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from 'graphql';


const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }
});


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data);
      }
    }
  }
});


// Entry point of the data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // es6 --> resolve: resolve(){}
      resolve(parentValue, args) { // args ->
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) { // args ->
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

const graphqlSchema = new GraphQLSchema({
  query: RootQuery
});

export default graphqlSchema;