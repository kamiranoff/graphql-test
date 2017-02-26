import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  {
    songs {
      title,
      id
    }
  }

`;
