// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";

import { logEvent, Result, ErrorResult } from "../util";
import "../styles/common.css";

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
      paymentMethod: null
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { name, postal } = this.state;

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
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      const response = await fetch("/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id
        })
      });

      const serverResponse = await response.json();

      this.handleServerResponse(serverResponse);
    }
  };

  handleServerResponse = serverResponse => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
    } else {
      // Show a success message
    }
  };

  handleCardChange = event => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  };

  render() {
    const { stripe } = this.props;
    const { postal, name, paymentMethod, errorMessage } = this.state;

    return (
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
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="expiry">Card Expiration</label>
        <CardExpiryElement
          id="expiry"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement
          id="cvc"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
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
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
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
const stripePromise = loadStripe("pk_test_8LBSC624FEVsjEEisV9vejXq00OWCLoqcT");
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <InjectedCheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
