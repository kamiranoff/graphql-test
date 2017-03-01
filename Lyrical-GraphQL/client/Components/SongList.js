import React, { Component, StyleSheet } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchSongsQuery from './../queries/fetchSongs';
import deleteSongQuery from './../queries/deleteSong';

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
    }).then(() => this.props.data.refetch()); // refetch is an alternative to refetchQueries:
  }

  renderSongs() {

    const liStyle = {
      justifyContent: 'space-between',
    };

    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li
          className="collection-item valign-wrapper"
          style={liStyle}
          key={id}>
          {title}
          <a className="btn-floating right red accent-2">
            <i
              className="material-icons"
              onClick={() => this.onSongDelete(id)}
            >
              delete
            </i>
          </a>
        </li>
      )
    })
  }

  render() {

    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>

        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to={"/songs/new"}
          className="btn-floating btn-large teal lighten-2 waves-effect waves-light right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}


export default graphql(deleteSongQuery)(
  graphql(fetchSongsQuery)(SongList)
);
