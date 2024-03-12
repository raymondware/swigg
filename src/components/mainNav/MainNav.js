import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Logo = styled.div`
  padding: .5em;
`

const Nav = styled.nav`
  position: relative;
  box-sizing: border-box;
  background: ${props => props.bg};
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.6s;

  button {
    display: none;

    @media only screen and (max-width: ${props => props.breakPoint}) {
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
          color: ${props => props.bg};
        }
      }
    }
    
    @media only screen and (max-width: ${props => props.breakPoint}) {
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

    @media only screen and (max-width: ${props => props.breakPoint}) {
      background: ${props => props.bg};
    }
  }
  
  ${props => props?.sticky ? stickyStyles : null}
  ${props => props?.customStyles ? props.customStyles : null}
`

const stickyStyles = `
    position: fixed;
    z-index: 9999;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.15);
    transition: all 0.6s;
`

const MainNav = props => {
  const navBar = useRef(null)
  const [toggle, setToggle] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    if (props.isSticky) {
      window.addEventListener('scroll', () => {
        console.log(navBar)
        if (window.scrollY > 0 && sticky === false) {
          setSticky(true)
        } else {
          setSticky(false)
        }
      })
    }
  }, [])

  const triggerToggle = () => setToggle(!toggle)

  return (
    <Nav ref={navBar} {...props} toggle={toggle} sticky={sticky}>
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
  fontColor: PropTypes.string,
  breakPoint: PropTypes.string,
  isSticky: PropTypes.bool
}

MainNav.defaultProps = {
  bg: '#fff',
  fontColor: '#333',
  breakPoint: '800px',
  isSticky: false
}

export default MainNav
