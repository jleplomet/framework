
import styles from 'scss/components/index';

import React, {Component} from 'react';

export default class Index extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigate('/about?foo=bar')
    }, 1500);
  }

  render() {
    return (
      <div className={styles.contentHome}>
        HELLO Index
      </div>
    )
  }
}

