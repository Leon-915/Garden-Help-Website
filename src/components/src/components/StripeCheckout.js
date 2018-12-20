import React from 'react';
var ReactStripeElements = require('react-stripe-elements');

const {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe
} = ReactStripeElements;

const handleBlur = () => {
};
const handleChange = () => {
    // const handleChange = change => {
};
// const handleClick = () => {
// };
const handleFocus = () => {
};
const handleReady = () => {
};

const createOptions = (fontSize) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, Menlo, monospace',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#9e2146'
            }
        }
    };
};

var submitFinalForm;

class _SplitForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = ev => {
        ev.preventDefault();
        this.props.stripe.createToken().then(payload => {
            if (!('error' in payload)) {
                this._element1.clear();
                submitFinalForm(payload);
            }
        });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <label>
                Card details
                <CardElement
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onReady={handleReady}
                  {...createOptions(this.props.fontSize)}
                  elementRef={(c) => this._element1 = c}
                />
              </label>
              <button>Pay</button>
            </form>
        );
    }
}
const SplitForm = injectStripe(_SplitForm);

class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
            elementFontSize: window.innerWidth < 450 ? '14px' : '14px'
        };
        window.addEventListener('resize', () => {
            if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
                this.setState({elementFontSize: '14px'});
            } else if (
                window.innerWidth >= 450 &&
                this.state.elementFontSize !== '14px'
            ) {
                this.setState({elementFontSize: '14px'});
            }
        });
    }

    render() {
        const {elementFontSize} = this.state;
        return (
            <div className='Checkout'>
                <Elements>
                    <SplitForm fontSize={elementFontSize} />
                </Elements>
            </div>
        );
    }
}
export default class TakeMoney extends React.Component {
    constructor(props) {
        super(props);
        submitFinalForm = this.props.parentMethod;
    }
    render() {
        return (
            <StripeProvider apiKey='pk_test_r2K748ZXpVCqVfgE06LRaNFC'>
                <Checkout />
            </StripeProvider>
        );
    }
}
