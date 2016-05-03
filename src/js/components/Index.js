
import styles from 'scss/components/index';

import React, {Component, PropTypes} from 'react';

class Index extends Component {

  componentDidMount() {
    console.log("componentDidMount")
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

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
