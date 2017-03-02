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
      },
      // refetchQueries: [{
      //   query: fetchSong,
      // }]
    })
      .then(() => {
      hashHistory.push('/')
    });
  }

  render() {
    return (
      <form onSubmit={() => this.onSubmit(event)}>
        <textarea
          defaultValue={this.state.lyrics}
          onChange={(event) => this.onChange(event.target.value)}
        >
        </textarea>
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
