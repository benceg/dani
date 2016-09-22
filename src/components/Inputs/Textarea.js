import React from 'react';
import { HOC } from 'formsy-react';

const Textarea = ({
  name,
  label,
  showRequired,
  showError,
  getErrorMessage,
  getValue,
  setValue
}) =>

<div className={(showRequired() ? 'required' : showError() ? 'error' : null)}>
  <label>{label}</label>
  <span className='field'>
    <textarea name={name} value={getValue()} onChange={(e) => setValue(e.target.value)} />
  </span>
  <span className='errorMessage'>{getErrorMessage()}</span>
</div>

export default HOC(Textarea);
