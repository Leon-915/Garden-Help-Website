import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costFinal: this.props.costFinal
        }
    }

    onToken = (token) => {
        axios.post('https://wt-df7029a086c64436fe6477bd63b9291b-0.run.webtask.io/save-stripe-token', {
            stripeToken: token.id,
            amount: this.state.costFinal * 100,
            currency: "EUR"
        })
        .then((response) => {
            console.log(this.props);
            this.props.parentMethod();
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentWillReceiveProps() {
        this.setState({costFinal: this.props.costFinal});
    }

    // ...

    render() {
        return (
            // ...
            <StripeCheckout
            amount={this.state.costFinal * 100}
            currency="EUR"
            token={this.onToken}
            stripeKey="pk_test_cFEZgPraP5ny24rcFsvC1Jl1"
            />
        )
    }
}
