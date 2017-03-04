import React, { Component } from 'react';


class LyricList extends Component {

  _renderLyrics() {
    return this.props.lyrics.map(lyric => {
      return (
        <li key={lyric.id} className="collection-item">
          {lyric.content}
          <i className="material-icons right">star</i>
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

export default LyricList;
