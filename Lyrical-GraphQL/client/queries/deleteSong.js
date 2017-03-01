import gql from 'graphql-tag';

// gql: GraphGL query helper
export default gql`
   mutation DeleteSong($id: ID) {
     deleteSong(id: $id) {
       id
     }
   }
`;
