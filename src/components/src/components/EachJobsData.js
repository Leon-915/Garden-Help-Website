'use strict';

import React from 'react';
import $ from 'jquery';

class EachJobsDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactnumber: '',
            _id: '',
            location: '',
            propertydetails: '',
            lastmaintained: '',
            propertysize: '',
            workhours: '',
            greenwasteremoval: '',
            jobdate: '',
            images: '',
            jobaddress: ''
        }
        this.setStateFunction.bind(this);
        this.mapObject.bind(this);

        $(document).on('click', '.accordian', function() {
            $('.activeJob').removeClass('activeJob');
            $(this).next('div').addClass('activeJob');
        });
    }
    mapObject(object, callback) {
      return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
      });
    }
    componentDidMount() {
        var self = this;
        this.mapObject(this.props.jobsData, function (key, value) {
            self.setStateFunction(key, value);
        })
    }
    setStateFunction(key, value) {
        switch(key) {
            case 'contactnumber':
                this.setState({ contactnumber: value });
                break;
            case '_id':
                this.setState({ _id: value });
                break;
            case 'location':
                this.setState({ location: value });
                break;
            case 'propertydetails':
                this.setState({ propertydetails: value });
                break;
            case 'lastmaintained':
                this.setState({ lastmaintained: value });
                break;
            case 'propertysize':
                this.setState({ propertysize: value });
                break;
            case 'workhours':
                this.setState({ workhours: value });
                break;
            case 'greenwasteremoval':
                var getGreenwasteremoval = (value == false ? 'No' : 'Yes');
                this.setState({ greenwasteremoval: getGreenwasteremoval });
                break;
            case 'jobdate':
                var newDate = new Date(value).toLocaleString().split(',')[0];
                this.setState({ jobdate: newDate });
                break;
            case 'jobaddress':
                this.setState({ jobaddress: value });
                break;
            case 'images':
                var image = (value[0] == undefined ? 'no-image' : value[0]);
                if(image == 'no-image') {
                    this.setState({ images: 'no-image' });
                } else {
                    this.setState({ images: `https://s3-eu-west-1.amazonaws.com/gardenhelp/property/images/${image}` });
                }

                break;
        }
    }
    render() {
        return (
            <div className="jobsWrapper">
                <input id={'radioJob' + this.state._id} type="radio" name="jobLabel" />
                <label className="accordian" htmlFor={'radioJob' + this.state._id} aria-label>Job ID - {this.state._id}</label>
                <div className="eachJobs">
                    <div className="leftJob">
                        {this.state.images == 'no-image'
                        ?
                        'No - Image'
                        :
                        <img src={this.state.images} />}
                    </div>
                    <div className="rightJob">
                        <h3>Location</h3>
                        <p className="details_copy">{this.state.location}</p>
                        <h3>Tell us a bit about your property what would you like us to do?</h3>
                        <p className="details_copy">{this.state.propertydetails}</p>
                        <h3>When your property was last maintained?*</h3>
                        <p className="details_copy">{this.state.lastmaintained}</p>
                        <h3>What is your property size?*</h3>
                        <p className="details_copy">{this.state.propertysize}</p>
                        <h3>Number of hours?</h3>
                        <p className="details_copy">{this.state.workhours}</p>
                        <h3>Green waste removed?*</h3>
                        <p className="details_copy">{this.state.greenwasteremoval}</p>
                        <h3>Date of service (mm/dd/yyyy)</h3>
                        <p className="details_copy">{this.state.jobdate}</p>
                        <h3>Contact Number</h3>
                        <p className="details_copy">{this.state.contactnumber}</p>
                        <h3>Address</h3>
                        <p className="details_copy">{this.state.jobaddress}</p>
                    </div>
                </div>
            </div>
        );
    }
}

EachJobsDataComponent.displayName = 'SrcComponentsEachJobsDataComponent';

// Uncomment properties you need
// EachJobsDataComponent.propTypes = {};
// EachJobsDataComponent.defaultProps = {};

export default EachJobsDataComponent;
