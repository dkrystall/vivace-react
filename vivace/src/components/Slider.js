import React from 'react';

export default ({value, min, max, onChange}) => <input type={'range'} min={min} max={max} value={value} onChange = {(e) => onChange(e.target.value)}/>;