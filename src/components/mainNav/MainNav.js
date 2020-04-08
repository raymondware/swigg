import React from 'react'
import styled from 'styled-components'

const MainNavWrap = styled.div`
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

          a {
            text-decoration: none;
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

      <Nav>
        {props.children}
      </Nav>
    </MainNavWrap>
  )
}

export default MainNav
