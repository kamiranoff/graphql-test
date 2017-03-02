import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

import fetchSong from '../queries/fetchSong';
import addLyrics from '../queries/addLyrics';

class LyricsCreate extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = { lyrics: props.lyrics };
  }

  onChange(lyrics) {
    this.setState({
      lyrics
    });
  }

  onSubmit(event) {
    event.preventDefault();

    console.log(this.state.lyrics);
    const lyrics = this.state.lyrics;
    this.props.mutate({
      variables: {
        lyrics,
        id: this.props.id,
      }
    })
      .then(() => {
        this.setState({lyrics: ''});
    });
  }

  render() {
    return (
      <form onSubmit={() => this.onSubmit(event)}>
        <label>Add Lyrics</label>
        <input
          placeholder="Add a lyric"
          onChange={(event) => this.onChange(event.target.value)}
        />
        <button
          onSubmit={() => this.onSubmit(event)}
          className="btn-floating btn-large teal lighten-2 waves-effect waves-light right"
        ><i className="material-icons">add</i>
        </button>
      </form>
    );
  }
}

export default graphql(addLyrics)(LyricsCreate);
