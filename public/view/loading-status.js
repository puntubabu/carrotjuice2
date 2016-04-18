import React, { Component } from 'react'
import './loading-status.css'

export default class LoadingStatusView extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let is_initializing = this.props.model.is_initializing
    let has_inflight_requests = this.props.model.inflight_requests > 0
    let div_class = is_initializing ? 'loading-status-initializing' :
        'loading-status-requests';

    return (is_initializing || has_inflight_requests) ?
        (<div className={div_class}>
        <div className="centering-container">
          <p className="lead loading-status">
            Loading...
          </p>
        </div>
      </div>)
     : null
  }
}
