
import 'scss/components/about';

import React, {Component, PropTypes} from 'react';

class About extends Component {

  componentDidMount() {
    console.log("componentDidMount")
  }

  onBack() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div className={'route-about'}>
        <div className={'about-content-container'}>
          Hello About!
          <br />
          <button onClick={e => this.onBack()}>Back</button>
        </div>
      </div>
    )
  }
}

About.contextTypes = {
  router: PropTypes.object
}

export default About;
