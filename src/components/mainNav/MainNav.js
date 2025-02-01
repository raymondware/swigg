import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Swigg logo with glowing effect as a data URI
const DEFAULT_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxmaWx0ZXIgaWQ9Imdvb2QiIHg9Ii04IiB5PSItOCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI2MCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiLz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJvdmVyIi8+PC9maWx0ZXI+PGxpbmVhckdyYWRpZW50IGlkPSJnbG93IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmYTUwMDtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmNjYwMDtzdG9wLW9wYWNpdHk6MSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMTExMTEiIHJ4PSI4Ii8+PHRleHQgeD0iNjAiIHk9IjI0IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNnbG93KSIgZmlsdGVyPSJ1cmwoI2dvb2QpIj5Td2lnZzwvdGV4dD48L3N2Zz4='

const NavContainer = styled.nav`
  position: ${props => props.isSticky ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.bg};
  box-shadow: ${props => props.isSticky ? props.theme.shadows.md : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  border-bottom: ${props => props.showBorder ? `1px solid ${props.theme.colors.gray[200]}` : 'none'};
  ${props => props.customStyles}
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
`

const Logo = styled.div`
  img {
    display: block;
    max-height: ${props => props.logoHeight || '40px'};
    width: auto;
    transition: max-height 0.3s ease;
  }

  ${props => props.isSticky && `
    img {
      max-height: ${props.stickyLogoHeight || '32px'};
    }
  `}
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  color: ${props => props.fontColor};
  font-size: ${props => props.theme.typography.fontSizes.xl};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${props => props.breakPoint}) {
    display: block;
  }
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.breakPoint}) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: ${props => props.bg};
    box-shadow: ${props => props.theme.shadows.md};
    transform: ${props => props.slideDirection === 'top' 
      ? `translateY(${props.isOpen ? '0' : '-100%'})`
      : `translateY(${props.isOpen ? '0' : '100%'})`
    };
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
  }
`

const NavItem = styled.li`
  a {
    display: block;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    color: ${props => props.fontColor};
    text-decoration: none;
    font-size: ${props => props.theme.typography.fontSizes.md};
    transition: all 0.3s ease;
    border-radius: ${props => props.theme.borderRadius.sm};
    position: relative;

    &:hover {
      background: ${props => props.theme.colors.gray[100]};
      color: ${props => props.theme.colors.primary};
    }

    ${props => props.activeLink && `
      color: ${props.theme.colors.primary};
      font-weight: ${props.theme.typography.fontWeights.semibold};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 2px;
        background: ${props.theme.colors.primary};
        border-radius: ${props.theme.borderRadius.full};
      }
    `}
  }

  @media (max-width: ${props => props.breakPoint}) {
    a {
      padding: ${props => props.theme.spacing.md};
      border-radius: 0;

      &:hover {
        background: ${props => props.theme.colors.gray[100]};
      }

      ${props => props.activeLink && `
        &::after {
          left: ${props.theme.spacing.md};
          transform: none;
          width: 4px;
          height: 100%;
          top: 0;
        }
      `}
    }
  }
`

const MainNav = ({
  bg = '#fff',
  fontColor = '#333',
  breakPoint = '800px',
  isSticky = false,
  logo = { url: DEFAULT_LOGO, alt: 'Logo' },
  children,
  customStyles = '',
  maxWidth,
  logoHeight,
  stickyLogoHeight,
  showBorder = false,
  slideDirection = 'top',
  activeLink = '',
  onMenuToggle = () => {},
  closeOnScroll = true
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!isSticky) return

    const handleScroll = () => {
      const scrolled = window.scrollY > 0
      setIsScrolled(scrolled)
      
      if (closeOnScroll && isOpen && scrolled) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSticky, closeOnScroll, isOpen])

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onMenuToggle(newState)
  }

  return (
    <NavContainer
      ref={navRef}
      bg={bg}
      isSticky={isSticky && isScrolled}
      customStyles={customStyles}
      showBorder={showBorder}
    >
      <NavContent maxWidth={maxWidth}>
        <Logo 
          isSticky={isSticky && isScrolled}
          logoHeight={logoHeight}
          stickyLogoHeight={stickyLogoHeight}
        >
          <img src={logo.url} alt={logo.alt || 'Logo'} />
        </Logo>

        <MenuButton
          onClick={toggleMenu}
          fontColor={fontColor}
          breakPoint={breakPoint}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? '×' : '☰'}
        </MenuButton>

        <NavList
          bg={bg}
          fontColor={fontColor}
          breakPoint={breakPoint}
          isOpen={isOpen}
          slideDirection={slideDirection}
        >
          {React.Children.map(children.props.children, child => (
            <NavItem
              fontColor={fontColor}
              breakPoint={breakPoint}
              activeLink={child.props.href === activeLink}
            >
              {child}
            </NavItem>
          ))}
        </NavList>
      </NavContent>
    </NavContainer>
  )
}

MainNav.propTypes = {
  bg: PropTypes.string,
  fontColor: PropTypes.string,
  breakPoint: PropTypes.string,
  isSticky: PropTypes.bool,
  logo: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string
  }),
  children: PropTypes.element.isRequired,
  customStyles: PropTypes.string,
  maxWidth: PropTypes.string,
  logoHeight: PropTypes.string,
  stickyLogoHeight: PropTypes.string,
  showBorder: PropTypes.bool,
  slideDirection: PropTypes.oneOf(['top', 'bottom']),
  activeLink: PropTypes.string,
  onMenuToggle: PropTypes.func,
  closeOnScroll: PropTypes.bool
}

export default MainNav
