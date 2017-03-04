import React, { Component, StyleSheet } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchSong from './../queries/fetchSong';
import LyricList from './LyricList';
import LyricsCreate from './LyricsCreate';

class SongDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">
          back
        </Link>
        <h1>{song.title}</h1>
        <LyricList lyrics={song.lyrics} />
        <LyricsCreate
          id={this.props.params.id}
        />
      </div>

    )
  }
}

export default  graphql(fetchSong,
  {
    options: (props) => (
    { variables: { id: props.params.id } })
  })(SongDetail);
