// Helper styles for demo
import "./assets/css/helper.css";
import React, { Component } from "react";
import { Formik, Field } from "formik";
import { ReactComponent as Logo } from "./assets/img/logos/tinwave.svg";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : "Required");

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

class Wizard extends React.Component {
  static Page = ({ children, parentState }) => {
    return children(parentState);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    console.log(activePage);
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            {React.cloneElement(activePage, { parentState: { ...props } })}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}

              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={props.isSubmitting}>
                  Submit
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

const App = () => (
  <div className="App">
    <Logo />
    <h1>Floorplan / Sign-up Wizard </h1>
    <Wizard
      initialValues={{
        businessName: "",
        numLocations: "",
        subscriptionType: "",
        tinwavePassBeaconType: false,
        tinwaveTagBeaconType: false,
        firstLocation: "",
        firstAddress: "",
        firstCity: "",
        firstState: "",
        firstZipcode: "",
        secondLocation: "",
        secondAddress: "",
        secondCity: "",
        secondState: "",
        secondZipcode: "",
        firstFloorName: "",
        firstLength: "",
        firstWidth: "",
        firstMeasurement: "",
        firstUrl: "",
        firstOpenFloorPlan: false,
        secondFloorName: "",
        secondLength: "",
        secondWidth: "",
        secondMeasurement: "",
        secondUrl: "",
        secondOpenFloorPlan: false
      }}
      onSubmit={(values, actions) => {
        console.log(actions);
        sleep(300).then(() => {
          window.alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        });
      }}
    >
      <Wizard.Page>
        {props => (
          <React.Fragment>
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
            <div>
              <label>Business Name</label>
              <Field
                name="businessName"
                component="input"
                type="text"
                placeholder="Business Name"
                validate={required}
              />
              <Error name="businessName" />
            </div>
            <div>
              <label>Tinwave Subscription</label>
              <Field
                name="numLocations"
                component="select"
                placeholder="How Many Locations?"
              >
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
                <option value="Five">Five</option>
                <option value="Six">Six</option>
                <option value="More">More</option>
                <Error name="subscriptionType" />
              </Field>
              <div>
                <div>
                  <label>Tinwave Subscription</label>
                  <Field
                    name="subscriptionType"
                    component="select"
                    placeholder="Tinwave Subscription"
                  >
                    <option>Tinwave Subscription</option>
                    <option value="standard">Standard</option>
                    <option value="enterprise">Enterprise</option>
                    <Error name="subscriptionType" />
                  </Field>
                </div>
                <div>
                  <label>TinwavePass</label>
                  <Field name="tinwavepassBeaconType" type="checkbox" />
                </div>
                <div>
                  <label>TinwaveTag</label>
                  <Field name="tinwaveTagBeaconType" type="checkbox" />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Wizard.Page>
      <Wizard.Page
      /*validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.favoriteColor) {
            errors.favoriteColor = "Required";
          }
          return errors;
        }}
      */
      >
        {props => (
          <React.Fragment>
            <div>
              <div>
                <label>Location 1</label>
                <Field
                  name="firstLocationName"
                  component="input"
                  type="text"
                  placeholder="Location Name"
                  validate={required}
                />
                <Error name="firstLocationName" />
                <Field
                  name="firstAddress"
                  component="input"
                  type="text"
                  placeholder="Address"
                  validate={required}
                />
                <Error name="firstAddress" />
                <Field
                  name="firstCity"
                  component="input"
                  type="text"
                  placeholder="City"
                  validate={required}
                />
                <Error name="firstCity" />
                <Field
                  name="firstState"
                  component="input"
                  type="text"
                  placeholder="State"
                  validate={required}
                />
                <Error name="firstState" />
                <Field
                  name="firstZipcode"
                  component="input"
                  type="text"
                  placeholder="Zip Code"
                  validate={required}
                />
                <Error name="firstZipcode" />
              </div>
              <div>
                <label>Location 2</label>
                <Field
                  name="secondLocationName"
                  component="input"
                  type="text"
                  placeholder="Location Name"
                  validate={required}
                />
                <Error name="secondLocationName" />
                <Field
                  name="secondAddress"
                  component="input"
                  type="text"
                  placeholder="Address"
                  validate={required}
                />
                <Error name="secondAddress" />
                <Field
                  name="secondCity"
                  component="input"
                  type="text"
                  placeholder="City"
                  validate={required}
                />
                <Error name="secondCity" />
                <Field
                  name="secondState"
                  component="input"
                  type="text"
                  placeholder="State"
                  validate={required}
                />
                <Error name="secondState" />
                <Field
                  name="secondZipcode"
                  component="input"
                  type="text"
                  placeholder="Zip Code"
                  validate={required}
                />
                <Error name="secondZipcode" />
              </div>
            </div>
          </React.Fragment>
        )}
      </Wizard.Page>
      <Wizard.Page>
        {props => (
          <React.Fragment>
        <div>
          <div>
            <label>Floor 1</label>
            <Field
              name="firstFloorName"
              component="input"
              type="text"
              placeholder="Floor Name"
              validate={required}
            />
            <Error name="firstFloorName" />
            <Field
              name="firstLength"
              component="input"
              type="text"
              placeholder="Length"
              validate={required}
            />
            <Error name="firstLength" />
            <Field
              name="firstWidth"
              component="input"
              type="text"
              placeholder="Width"
              validate={required}
            />
            <Error name="firstWidth" />
            <Field
              name="firstMeasurement"
              component="select"
              placeholder="Measurement"
            >
              <option value="feet">Feet</option>
              <option value="meters">Meters</option>
              <Error name="firstMeasurement" />
            </Field>
            <Field
              name="firstUrl"
              component="input"
              type="text"
              placeholder="Url"
              validate={required}
            />
            <Error name="firstUrl" />
            <label>Open Floor Plan?</label>
            <Field name="firstOpenFloorPlan" type="checkbox"></Field>
          </div>
          <div>
            <label>Floor 2</label>
            <Field
              name="secondFloorName"
              component="input"
              type="text"
              placeholder="Floor Name"
              validate={required}
            />
            <Error name="secondFloorName" />
            <Field
              name="firstLength"
              component="input"
              type="text"
              placeholder="Length"
              validate={required}
            />
            <Error name="secondLength" />
            <Field
              name="width"
              component="input"
              type="text"
              placeholder="Width"
              validate={required}
            />
            <Error name="secondWidth" />
            <Field
              name="secondMeasurement"
              component="select"
              placeholder="Measurement"
            >
              <option value="feet">Feet</option>
              <option value="meters">Meters</option>
              <Error name="secondMeasurement" />
            </Field>
            <Field
              name="secondUrl"
              component="input"
              type="text"
              placeholder="Url"
              validate={required}
            />
            <Error name="secondUrl" />
            <label>Open Floor Plan?</label>
            <Field name="secondOpenFloorPlan" type="checkbox"></Field>
          </div>
        </div>
        </React.Fragment>
        )}
      </Wizard.Page>
    </Wizard>
  </div>
);

function Checkbox({ field, type, checked }) {
  return (
    <label>
      {/* remove {...field} to see changes not propagated */}
      <input {...field} type={type} checked={checked} />
      {field.name}
    </label>
  );
}

export default App;
