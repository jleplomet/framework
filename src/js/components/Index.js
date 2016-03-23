
import styles from 'scss/components/index';

import React, {Component, PropTypes} from 'react';

export default class Index extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    const {router} = this.context;

    console.log(router);
  }

  render() {
    return (
      <div className={styles.contentHome}>
        <div className={styles.contentContainer}>
          Hello Framework, and World!
        </div>
      </div>
    )
  }
}
