import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import likeLyric from '../queries/likeLyric';


class LyricList extends Component {

  _onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        _typename: 'Mutation',
        likeLyric: {
          id: id,
          _typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  _isLikedClassName(likes) {
    return likes > 0 ? 'liked' : null;
  }

  _renderLyrics() {
    return this.props.lyrics.map(lyric => {
      return (
        <li key={lyric.id} className="collection-item">
          {lyric.content}
          <div className="right">
            <span
              className={this._isLikedClassName(lyric.likes)}
              style={{ marginRight: '5px' }}
            >
              {lyric.likes}
            </span>
            <i
              className={`material-icons ${this._isLikedClassName(lyric.likes)}`}
              onClick={() => this._onLike(lyric.id, lyric.likes)}
            >star</i>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this._renderLyrics()}
      </ul>
    );
  }
}

export default graphql(likeLyric)(LyricList);
