
import styles from 'scss/components/index';

import React, {Component, PropTypes} from 'react';

class Index extends Component {

  componentDidMount() {
    console.log("componentDidMount")
  }

  onAbout() {
    console.log("onAbout");

    this.context.router.push("about");
  }

  render() {
    return (
      <div className={styles.contentHome}>
        <div className={styles.contentContainer}>
          Hello Framework, and Jeff!
          <br />
          <button onClick={this.onAbout.bind(this)}>About</button>
        </div>
      </div>
    )
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
