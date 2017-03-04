import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
  mutation AddLyrics($lyric:String, $id: ID) {
    addLyricToSong(content: $lyric, songId: $id) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;
