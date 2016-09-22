import React, { Component } from 'react';

import { Form } from 'formsy-react';

import {
  Text,
  Email,
  Textarea
} from '../Inputs';

if (process.env.WEBPACK) require('./stylesheet.styl');

class ContactForm extends Component {

  constructor() {
    super();
    this.state = {canSubmit: false}
  }

  enableButton() {
    this.setState({canSubmit: true});
  }

  disableButton() {
    this.setState({canSubmit: false});
  }

  render() {

    const {
      action,
      method,
      handleSubmit
    } = this.props;

    const {
      canSubmit
    } = this.state;

    return (
      <Form
        className='ContactForm'
        action={action}
        method={method}
        encType='application/x-www-form-urlencoded'
        onValidSubmit={fields => handleSubmit(fields)}
        onInvalid={() => this.disableButton()}
        onValid={() => this.enableButton()}
      >
        <Text name='name' label='Name' value='' placeholder='Name' validationError='This field is required' required />
        <Email name='from' label='Email' value='' placeholder='Email' validations='isEmail' required />
        <Text name='subject' label='Subject' value='' placeholder='Subject' validationError='This field is required' required />
        <Textarea name='message' label='Message' value='' placeholder='Message' validationError='This field is required' required />
        <div className='submit'>
          <label />
          <span>
            {(process.env.WEBPACK
              ? <button type='submit' disabled={!canSubmit}>Send</button>
              : <input type='submit' value='Send' />
            )}
          </span>
        </div>
      </Form>
    )

  }

}

export default ContactForm;
