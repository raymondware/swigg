import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const Container = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding};
  ${props => props.customStyles}
`;

export const ProductSkeleton = ({ width = '300px', padding = '20px' }) => (
  <Container width={width} padding={padding}>
    <Skeleton
      width="100%"
      height="300px"
      margin="0 0 15px 0"
      borderRadius="8px"
    />
    <Skeleton
      width="70%"
      height="24px"
      margin="0 0 10px 0"
    />
    <Skeleton
      width="40%"
      height="16px"
      margin="0 0 15px 0"
    />
    <Skeleton
      width="100%"
      height="40px"
    />
  </Container>
);

export const CardSkeleton = ({ width = '300px', padding = '20px' }) => (
  <Container
    width={width}
    padding={padding}
    customStyles="border: 1px solid #eee; border-radius: 8px;"
  >
    <Skeleton
      width="100%"
      height="200px"
      margin="0 0 15px 0"
      borderRadius="8px"
    />
    <Skeleton
      width="85%"
      height="24px"
      margin="0 0 10px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 5px 0"
    />
    <Skeleton
      width="60%"
      height="16px"
    />
  </Container>
);

export const BlogPostSkeleton = ({ width = '600px', padding = '20px' }) => (
  <Container width={width} padding={padding}>
    <Skeleton
      width="100%"
      height="300px"
      margin="0 0 20px 0"
      borderRadius="8px"
    />
    <Skeleton
      width="85%"
      height="32px"
      margin="0 0 15px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 8px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 8px 0"
    />
    <Skeleton
      width="75%"
      height="16px"
      margin="0 0 20px 0"
    />
  </Container>
);

export const CartItemSkeleton = ({ width = '100%', padding = '15px' }) => (
  <Container
    width={width}
    padding={padding}
    customStyles="display: flex; align-items: center;"
  >
    <Skeleton
      width="80px"
      height="80px"
      margin="0 15px 0 0"
      borderRadius="4px"
    />
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton
        width="90%"
        height="20px"
        margin="0 0 8px 0"
      />
      <Skeleton
        width="60%"
        height="16px"
      />
    </div>
  </Container>
);

export const ProfileSkeleton = ({ width = '300px', padding = '20px' }) => (
  <Container width={width} padding={padding}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Skeleton
        width="120px"
        height="120px"
        circle
        margin="0 auto 15px"
      />
      <Skeleton
        width="70%"
        height="24px"
        margin="0 auto 8px"
      />
      <Skeleton
        width="40%"
        height="16px"
        margin="0 auto"
      />
    </div>
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 8px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 8px 0"
    />
    <Skeleton
      width="60%"
      height="16px"
    />
  </Container>
);

const templatePropTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
};

ProductSkeleton.propTypes = templatePropTypes;
CardSkeleton.propTypes = templatePropTypes;
BlogPostSkeleton.propTypes = templatePropTypes;
CartItemSkeleton.propTypes = templatePropTypes;
ProfileSkeleton.propTypes = templatePropTypes;
