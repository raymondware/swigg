import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainNavWrap = styled.div`
    box-sizing: border-box;
    background: ${props => props.bg};
    width: 100%;
    margin: 0 auto;
    padding: 5px;
    display: grid;
`

const Logo = styled.div`

`

const Nav = styled.nav`

    ul {
        list-style: none;

        li {
          list-style-type: none;
          color: ${props => props.fontColor};

          a {
            text-decoration: none;
            color: ${props => props.fontColor};
          }
        }
    }
`

/* props
    - link list as children. Full Ul > Li's expected to be passed
      - This will solve the issue of different forms of routers being used.
    - logo image
*/
const MainNav = props => {
  return (
    <MainNavWrap {...props}>
      <Logo />

      <Nav {...props}>
        {props.children}
      </Nav>
    </MainNavWrap>
  )
}

MainNav.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.element.isRequired,
  fontColor: PropTypes.string
}

MainNav.defaultProps = {
  bg: '#fff',
  fontColor: '#333'
}

export default MainNav
