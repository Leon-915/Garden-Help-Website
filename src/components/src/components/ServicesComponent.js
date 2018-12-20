'use strict';

import React from 'react';

require('styles/src/components/Services.css');

class ServicesComponent extends React.Component {
    render() {
        return (
            <div className="wrapper_inner"><div className="services_desc" id="services_section">
            <h2>services</h2>
            <p>Garden Help understands the effort that goes into looking after your garden. Our team of gardeners and landscapers will always be on time, deliver exceptional service to help you with your garden project.</p>
            </div>

            </div>
        );
    }
}

ServicesComponent.displayName = 'SrcComponentsServicesComponent';

// Uncomment properties you need
// ServicesComponent.propTypes = {};
// ServicesComponent.defaultProps = {};

export default ServicesComponent;
