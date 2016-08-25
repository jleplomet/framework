
import 'scss/components/index';

import React, {Component, PropTypes} from 'react';

class Index extends Component {

  componentDidMount() {
    console.log("componentDidMount")
  }

  onAbout() {
    this.context.router.push("about");
  }

  render() {
    return (
      <div className={'route-index'}>
        <div className={'index-content-container'}>
          Hello Framework!
          <br />
          <button onClick={e => this.onAbout()}>About</button>
        </div>
      </div>
    )
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
