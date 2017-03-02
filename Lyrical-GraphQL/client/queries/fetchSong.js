import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      title
      lyrics {
        content
      }
    }
  }
`;
