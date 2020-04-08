import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainNavWrap = styled.div`
    box-sizing: border-box;
    background: ${props => props.bg};
    width: 100%;
    margin: 0 auto;
`

const Logo = styled.div`

`

const Nav = styled.nav`
    margin: 0;
    padding: 0;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;

        li {
          list-style-type: none;
          color: ${props => props.fontColor};
          font-size: 1.2em;

          a {
            display: block;
            text-decoration: none;
            color: ${props => props.fontColor};
            padding: 1em;
            transition: all .4s;

            &:hover {
              background: red;
              color: #fff;
            }
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
