// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import ReviewListing from "./ReviewListing";
import createReactClass from "create-react-class";
import env from './env.json';
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
import "./assets/css/loaders/loader-square.css"
import getAllUrlParams from './request_helper';


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

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      postal: "",
      errorMessage: null,
      subDesign: null,
      paymentMethod: null,
      ACCESS_TOKEN: getAllUrlParams().id_token
    };
  }

  componentDidMount() {
    this.setState({
      name: "",
      postal: "",
      errorMessage: null,
      subDesign: null,
      paymentMethod: null,
      ACCESS_TOKEN: getAllUrlParams().id_token
    });
  }
  /*hard-coded for now, will be generated by form wizard */
  listing = async event => {
    const ACCESS_TOKEN = this.state.ACCESS_TOKEN;
    event.preventDefault();
    const response = await fetch(
      env.PROD_SERVER + "/billing/design-subscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN
        },
        body: JSON.stringify({
          id: env.SAMPLE_DESIGN_REQUIREMENTS
        })
      }
    );
    this.state.subDesign = response.message;
  };

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
const ACCESS_TOKEN = "eyJraWQiOiJLZ1BNM2hPTFhScUQ3R2hET3ZBRkJWYWpueEg3TFwvXC9MMU5DQTNMb1RhOUk9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiVHhjd0tESmRaV0hRMkkxOHV6a1pMZyIsInN1YiI6IjVlODUyNGUyLWFjOTctNDE3ZS1hZWEwLWIyYTdlMzE5MjlkYiIsImF1ZCI6IjJwOWpiZ2NtYW4xZXJ2OTM3M2FzaTlyczIwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiNzhmODQ3NmItMGViYi00NWZmLTk0ODktYTIyNGM4MDc3NDYzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODU2OTAzMDQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzdwOGRBUzNSOCIsImNvZ25pdG86dXNlcm5hbWUiOiI1ZTg1MjRlMi1hYzk3LTQxN2UtYWVhMC1iMmE3ZTMxOTI5ZGIiLCJleHAiOjE1ODU2OTM5MDQsImlhdCI6MTU4NTY5MDMwNSwiZW1haWwiOiJhdm5lcm1haWJlcmdAZ21haWwuY29tIn0.HVG1CQHMDcyTKikvw2V9YybpAYsBv-3VCDOuP9nUm2SoVntmGU4bRFRfD3SxC3iXe3w-l4Y_MGE9OndfIHINX4BI-zKHS2pxUIBOoqwuDqZHUGtX-Sr6tNNScRNLrQlSWD5mjmF4hvMKFWlr5KfhKRw6YBOV4OXVTNhqF6FFAhRxC6es4MmM7PjhTM0aYzaGCN6b8fo0sw5OIIlR04uoQ67cnEI0MKnd1uY8gbiJ1B9nKWoi_L50Ydd8zxkObOxmhjrOlAF2PeHezaMMlHXuMWuG4MVS2L7LN48n0kl9UapMUAQEiGqB07DtaQytM82OsRLfrYevHtp-WCMg5nBjOA"; //this.state.ACCESS_TOKEN;
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
          mode : "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": ACCESS_TOKEN
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
    const { postal, name, paymentMethod, errorMessage, ACCESS_TOKEN } = this.state;

    return (
      <div>
    {console.log(ACCESS_TOKEN)}
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
          <button type="submit" class="SubmitButton" onSubmit={this.handleSubmit} disabled={!stripe}>
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
    <MyDiv>
      <ReviewListing />
      <Elements stripe={stripePromise}>
        <InjectedCheckoutForm />
      </Elements>
    </MyDiv>
  );
}

var MyDiv = createReactClass({
  render: function() {
    return <div>{this.props.children}</div>;
  }
});

export default App;
