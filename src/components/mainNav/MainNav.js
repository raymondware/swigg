import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Logo = styled.div`
  padding: .5em;
`

const Nav = styled.nav`
    box-sizing: border-box;
    background: ${props => props.bg};
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      display: none;

      @media only screen and (max-width: 800px) {
        background: burlywood;
        display: block;
        padding: 1em;
        font-size: 1.5rem;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }

    ul {
      background: ${props => props.bg};
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      transition: visibility 0s, opacity 0.5s linear;

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
            background: ${props => props.fontColor};
            color: ${props => props.bg  };
          }
        }
      }
      
      @media only screen and (max-width: 800px) {
        width: 100%;
        position: absolute;
        top: 4.78em;
        left: 0;
        margin: 0 auto;
        flex-direction: column;
        display: ${elm => elm.toggle ? 'block' : 'none'};
        z-index: 8888;
        
        li {
          display: block;
          margin: 0;
        }
      }

      @media only screen and (max-width: 800px) {
        background: ${props => props.bg};
      }
    }
`

/* props
    - link list as children. Full Ul > Li's expected to be passed
      - This will solve the issue of different forms of routers being used.
    - logo image
*/
const MainNav = props => {
  const [toggle, setToggle] = useState(false)

  const triggerToggle = () => setToggle(!toggle)

  return (
    <Nav {...props} toggle={toggle}>
      <Logo>
        <img src={props.logo.url} alt={props.logo.alt ? props.logo.alt : 'Logo'} />
      </Logo>
      <button onClick={triggerToggle}>+</button>
      {props.children}
    </Nav>
  )
}

MainNav.propTypes = {
  bg: PropTypes.string,
  logo: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  fontColor: PropTypes.string
}

MainNav.defaultProps = {
  bg: '#fff',
  fontColor: '#333'
}

export default MainNav
