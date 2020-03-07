import React from 'react';
import './../Marker.css'
import PropTypes from 'prop-types';
//import { Test } from './Marker.styles';

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

function ss (e){
  console.log('a')
}

Marker.propTypes = {
  // bla: PropTypes.string,
};

Marker.defaultProps = {
  // bla: 'test',
};

export default Marker;
