
import styles from 'scss/components/index';

import React, {Component} from 'react';

export default class Index extends Component {


  render() {
    console.log(this.props);

    return (
      <div className={styles.contentHome}>
        HELLO Jeff
      </div>
    )
  }
}

