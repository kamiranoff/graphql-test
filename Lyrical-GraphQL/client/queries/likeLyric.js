import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  mutation LikeLyric($id: ID){
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
