import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import addLyrics from '../queries/addLyrics';

class LyricsCreate extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = { lyric: '' };
  }

  onChange(lyric) {
    this.setState({
      lyric
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const lyric = this.state.lyric;
    this.props.mutate({
      variables: {
        lyric,
        id: this.props.id,
      }
    })
      .then(() => {
        this.setState({lyric: ''});
    });
  }

  render() {
    return (
      <form onSubmit={() => this.onSubmit(event)}>
        <label>Add Lyrics</label>
        <input
          placeholder="Add a lyric"
          onChange={(event) => this.onChange(event.target.value)}
          value={this.state.lyric}
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
