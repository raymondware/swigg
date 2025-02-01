import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 10px 16px;

  /* Add your styled-components styles here */
  ${props => props.primary && `
    color: white;
    background-color: #1ea7fd;
  `}

  ${props => !props.primary && `
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  `}

  ${props => props.size === 'small' && `
    font-size: 12px;
    padding: 8px 12px;
  `}

  ${props => props.size === 'large' && `
    font-size: 16px;
    padding: 12px 24px;
  `}
`;

export const Button = ({ primary, size, label, ...props }) => {
  return (
    <StyledButton
      type="button"
      primary={primary}
      size={size}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  size: 'medium',
  onClick: undefined,
};
