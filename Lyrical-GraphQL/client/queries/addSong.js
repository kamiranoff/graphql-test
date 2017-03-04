import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id,
      title
    }
  }
`;
