import React from 'react';
import { HOC } from 'formsy-react';

const Text = ({
  name,
  label = '',
  placeholder = '',
  showRequired,
  showError,
  getErrorMessage,
  getValue,
  setValue
}) =>

<div className={(showRequired() ? 'required' : showError() ? 'error' : null)}>
  <label>{label}</label>
  <span className='field'>
    <input name={name} type='text' placeholder={placeholder} value={getValue()} onChange={(e) => setValue(e.target.value)}/>
  </span>
  <span className='errorMessage'>{getErrorMessage()}</span>
</div>

export default HOC(Text);
