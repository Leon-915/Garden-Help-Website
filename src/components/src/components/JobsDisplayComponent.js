'use strict';

import React from 'react';
import $ from 'jquery'
import EachJobsDataComponent from 'components/src/components/EachJobsData';

require('styles/src/components/JobsDisplay.css');

class JobsDisplayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completeData: null
        }
        this.characteristics = [];
        this.getUserObj = null;
        this.userDetails = JSON.parse(this.props.userDetails);
        this.headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.userDetails.tokenData.token,
            'x-key': this.userDetails.user.email
        };

        this._getJobs();
    }
    _create() {
        return $.ajax({
            url: ' http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/jobs/foruser/' + this.userDetails.user._id,
            type: 'GET',
            headers: this.headers,
            beforeSend: function () {
                // this.setState({loading: true});
            }.bind(this)
        })
    }
    _getJobs() {
        var xhr = this._create();
        xhr.done(this._onSuccess.bind(this))
        .fail(this._onError.bind(this))
    }
    _onSuccess(res) {
        this.setState({completeData: res})
    }
    _onError() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="jobsdisplay-component">
            <h1>Your Placed Jobs</h1>
                {this.state.completeData == null ?
                    null :
                    this.state.completeData.data.map(function(object, i){
                        return <EachJobsDataComponent jobsData={object} key={i} />
                    })}
            </div>
        )
    }
}

JobsDisplayComponent.displayName = 'SrcComponentsJobsDisplayComponent';

// Uncomment properties you need
// JobsDisplayComponent.propTypes = {};
// JobsDisplayComponent.defaultProps = {};

export default JobsDisplayComponent;
