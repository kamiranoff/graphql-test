import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

import fetchSongsQuery from './../queries/fetchSongs';

class SongCreate extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{
        query: fetchSongsQuery
      }]
    }).then(() => {
      hashHistory.push('/')
    });
  }

  render() {
    return (
      <div>
        <Link to="/">
          back
        </Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={event => (
              this.setState({ title: event.target.value }))
            }
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id,
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
