import React, { Fragment, PureComponent } from 'react';
import { Button, Checkbox, OTPCountdown } from 'homecredit-common';

export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Button>button</Button>
        <Checkbox label='checkbox' />
        <OTPCountdown />
      </Fragment>
    );
  }
}
