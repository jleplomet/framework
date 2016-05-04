
import styles from 'scss/components/about';

import React, {Component, PropTypes} from 'react';

class About extends Component {

  componentDidMount() {
    console.log("componentDidMount")
  }

  render() {
    return (
      <div className={styles.contentAbout}>
        <div className={styles.contentContainer}>
          Hello About!
        </div>
      </div>
    )
  }
}

About.contextTypes = {
  router: PropTypes.object
}

export default About;
