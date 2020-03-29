import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import env from './env.json';
class ReviewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: env.SAMPLE_DESIGN_CART.message.products,
      classes: makeStyles(theme => ({
        listItem: {
          padding: theme.spacing(1, 0)
        },
        total: {
          fontWeight: 700
        },
        title: {
          marginTop: theme.spacing(2)
        },
        root: {
          flexGrow: 1
        },
        paper: {
          padding: theme.spacing(30),
          textAlign: "center",
          color: theme.palette.text.secondary
        }
      }))
    };
  }
  render() {
    const { products, classes } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding={true}>
          {products.map(product => (
            <ListItem className={classes.listItem} key={product.product}>
              <div className={classes.root}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <ListItemText
                        primary={product.product}
                        secondary={product.description}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Typography gutterBottom>
                      {"$" +
                        product.pricing.amount / 100 +
                        "x" +
                        product.quantity +
                        " unit = $" +
                        (product.pricing.amount / 100) * product.quantity +
                        "/mo."}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total Per Month" />
            <Typography variant="subtitle1" className={classes.total}>
              $
              {products.reduce(
                (acc, cur) => acc + (cur.pricing.amount / 100) * cur.quantity,
                0
              )}
            </Typography>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}
export default ReviewListing;
