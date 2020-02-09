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
    }
`

const MainNav = () => {
  return (
    <MainNavWrap>
      <Logo />

      <Nav>
        <ul>
          <li>hi</li>
        </ul>
      </Nav>
    </MainNavWrap>
  )
}

export default MainNav
