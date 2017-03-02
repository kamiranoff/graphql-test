import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  mutation AddLyrics($lyrics:String, $id: ID) {
    addLyricToSong(content: $lyrics, songId: $id) {
      lyrics {
        content
      }
    }
  }
`;
