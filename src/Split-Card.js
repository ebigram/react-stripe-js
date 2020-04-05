// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import ReviewListing from "./ReviewListing";
import createReactClass from "create-react-class";
import env from "./env.json";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import "./assets/css/2-Card-Detailed.css";
import "./assets/css/common.css";
import "./assets/css/custom.css";
import "./assets/css/loader-typing.css";
import "./assets/css/loaders/loader-clock.css";
import "./assets/css/loaders/loader-pulse.css";
import "./assets/css/loaders/loader-square.css";
import getAllUrlParams, { designSubscription } from "./request_helper";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      postal: "",
      errorMessage: null,
      ACCESS_TOKEN: getAllUrlParams().id_token,
      subDesign: null,
      paymentMethod: null
    };
    /*
  componentDidMount() {
    const { ACCESS_TOKEN } = this.state;
    this.setState({
      name: "",
      postal: "",
      errorMessage: null,
      subDesign: this.listing(),
      paymentMethod: null
    });
  }
  */
}
 componentDidMount(){

    //const { ACCESS_TOKEN } = this.state.ACCESS_TOKEN;
    const ACCESS_TOKEN = getAllUrlParams().id_token;
    console.log("token", ACCESS_TOKEN);
    //return designSubscription(ACCESS_TOKEN,env.SAMPLE_DESIGN_REQUIREMENTS);
    fetch(env.PROD_SERVER + "/billing/design-subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ACCESS_TOKEN
      },
      body: JSON.stringify(env.SAMPLE_DESIGN_REQUIREMENTS)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("response",response);
        this.setState({ subDesign: response.message });
      }).catch(console.log);
  }
  /*hard-coded for now, will be generated by form wizard */

  handleSubmit = async event => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    //const { name, postal } = this.state;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        // Include any additional collected billing details.
        name: "Jenny Rosen"
      }
    });

    this.handlePaymentMethodResult(result);
  };

  handlePaymentMethodResult = async result => {
    const { ACCESS_TOKEN } = this.state;
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
      console.log(result.error);
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      console.log("token: " + ACCESS_TOKEN);
      console.log("server: " + env.PROD_SERVER);
      console.log(result.paymentMethod);
      const response = await fetch(
        "https://api.tinwave.com/billing/create-customer",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ACCESS_TOKEN
          },
          body: JSON.stringify({
            id: result.paymentMethod.id
          })
        }
      );

      this.handleServerResponse(response);
    }
  };

  handleServerResponse = serverResponse => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
      console.log("payment failure!");
    } else {
      console.log(serverResponse.body);
    }
  };

  handleCardChange = event => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  };

  render() {
    const { stripe } = this.props;
    const {
      name,
      postal,
      errorMessage,
      ACCESS_TOKEN,
      subDesign,
      paymentMethod
    } = this.state;
    console.log("design:", this.state.subDesign);

    return (
      <div>
        <MyDiv>
          <ReviewListing subDesign={subDesign}/>
        </MyDiv>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            required
            placeholder="Jenny Rosen"
            value={name}
            onChange={event => {
              this.setState({ name: event.target.value });
            }}
          />
          <label htmlFor="cardNumber">Card Number</label>
          <CardNumberElement id="cardNumber" options={ELEMENT_OPTIONS} />
          <label htmlFor="expiry">Card Expiration</label>
          <CardExpiryElement id="expiry" options={ELEMENT_OPTIONS} />
          <label htmlFor="cvc">CVC</label>
          <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
          <label htmlFor="postal">Postal Code</label>
          <input
            id="postal"
            required
            placeholder="12345"
            value={postal}
            onChange={event => {
              this.setState({ postal: event.target.value });
            }}
          />
          <button
            type="submit"
            className="SubmitButton"
            onSubmit={this.handleSubmit}
            disabled={!stripe}
          >
            Submit Payment
          </button>
        </form>
      </div>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_hV8n8eS7Z70CXGZdwldg0WAM00hwEvxvbv");
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

function App() {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm />
    </Elements>
  );
}

var MyDiv = createReactClass({
  render: function() {
    return <div>{this.props.children}</div>;
  }
});

export default App;