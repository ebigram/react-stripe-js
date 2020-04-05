// Helper styles for demo
import * as React from "react";
import * as ReactDOM from "react-dom";
//import App from "./Split-Card";
import * as serviceWorker from './serviceWorker';
import App from "./GettingStarted"
import "react-bootstrap"
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
