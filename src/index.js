import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/Main';
import BannerComponent from 'components/src/components/BannerComponent';
import HowToComponent from 'components/src/components/HowToComponent';
import ServicesComponent from 'components/src/components/ServicesComponent';
import ServicesTypesComponent from 'components/src/components/ServicesTypesComponent';
import ServicesDetailsComponent from 'components/src/components/ServicesDetailsComponent';
import TestimonialsComponent from 'components/src/components/TestimonialsComponent';
import AboutusComponent from 'components/src/components/AboutusComponent';
import JobsDisplayComponent from 'components/src/components/JobsDisplayComponent';
import ResetPassword from 'components/src/components/ResetPasswordComponent';
import CustomerReview from 'components/src/components/CustomerReviewComponent';
import AllServices from 'components/src/components/sevices/AllServices';

const app = document.getElementById('app');

const Home = () => (
  <div>
      <BannerComponent />
      <HowToComponent />
      <ServicesComponent />
      <ServicesTypesComponent />
      <ServicesDetailsComponent />
      <CustomerReview/>
      <TestimonialsComponent />
  </div>
);

const Services = () => (
	<div>
		<AllServices/>
	</div>
);

const About = () => (
  <div>
    <AboutusComponent />
  </div>
);

const Jobs = () => (
  <div>
    <JobsDisplayComponent userDetails={sessionStorage['user']}/>
  </div>
);

// Render the main component into the dom
ReactDOM.render(
    <Router>
         <App>
            <Route exact path="/rahul" component={Home}/>
            <Route path="/rahul/services" component={Services}/>
            <Route path="/rahul/about" component={About}/>
            <Route path="/rahul/jobs" component={Jobs}/>
            <Route path="/rahul/password/reset/:data" component={ResetPassword}/>
        </App>
    </Router>,
app);
