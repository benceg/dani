import React from 'react';
import { HOC } from 'formsy-react';

import ReactAutosizeTextarea from 'react-autosize-textarea';

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
    <ReactAutosizeTextarea name={name} value={getValue()} onChange={(e) => setValue(e.target.value)} rows={5} />
  </span>
  <span className='errorMessage'>{getErrorMessage()}</span>
</div>

export default HOC(Textarea);
