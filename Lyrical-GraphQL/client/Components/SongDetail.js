import React, { Component, StyleSheet } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchSong from './../queries/fetchSong';
import LyricsCreate from './LyricsCreate';

class SongDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('constructor', this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h1>{this.props.data.song.title}</h1>
        {this.props.data.song.lyrics[0] && this.props.data.song.lyrics[0].content}
        <LyricsCreate
          lyrics={this.props.data.song.lyrics[0] && this.props.data.song.lyrics[0].content}
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
