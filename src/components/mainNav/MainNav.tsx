import React, { useState, useEffect, useRef, ReactElement } from 'react'
import styled from 'styled-components'

// Swigg logo with glowing effect as a data URI
const DEFAULT_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxmaWx0ZXIgaWQ9Imdvb2QiIHg9Ii04IiB5PSItOCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI2MCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiLz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJvdmVyIi8+PC9maWx0ZXI+PGxpbmVhckdyYWRpZW50IGlkPSJnbG93IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmYTUwMDtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmNjYwMDtzdG9wLW9wYWNpdHk6MSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMTExMTEiIHJ4PSI4Ii8+PHRleHQgeD0iNjAiIHk9IjI0IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNnbG93KSIgZmlsdGVyPSJ1cmwoI2dvb2QpIj5Td2lnZzwvdGV4dD48L3N2Zz4='

/** Logo configuration */
export interface MainNavLogo {
  /** URL of the logo image */
  url: string
  /** Alt text for accessibility */
  alt?: string
}

/** Slide direction for mobile menu */
export type SlideDirection = 'top' | 'bottom'

/** Props for the MainNav component */
export interface MainNavProps {
  /** Background color */
  bg?: string
  /** Font color */
  fontColor?: string
  /** Breakpoint for mobile menu */
  breakPoint?: string
  /** Whether navigation should be sticky on scroll */
  isSticky?: boolean
  /** Logo configuration */
  logo?: MainNavLogo
  /** Navigation items (should be wrapped in a container element) */
  children: ReactElement
  /** Custom CSS styles */
  customStyles?: string
  /** Maximum width of nav content */
  maxWidth?: string
  /** Logo height */
  logoHeight?: string
  /** Logo height when sticky */
  stickyLogoHeight?: string
  /** Show bottom border */
  showBorder?: boolean
  /** Direction for mobile menu slide animation */
  slideDirection?: SlideDirection
  /** Currently active link href */
  activeLink?: string
  /** Callback when menu is toggled */
  onMenuToggle?: (isOpen: boolean) => void
  /** Close menu on scroll */
  closeOnScroll?: boolean
}

interface NavContainerProps {
  $bg: string
  $isSticky: boolean
  $customStyles: string
  $showBorder: boolean
}

interface NavContentProps {
  $maxWidth?: string
}

interface LogoProps {
  $isSticky: boolean
  $logoHeight?: string
  $stickyLogoHeight?: string
}

interface MenuButtonProps {
  $fontColor: string
  $breakPoint: string
}

interface NavListProps {
  $bg: string
  $fontColor: string
  $breakPoint: string
  $isOpen: boolean
  $slideDirection: SlideDirection
}

interface NavItemProps {
  $fontColor: string
  $breakPoint: string
  $activeLink: boolean
}

const NavContainer = styled.nav<NavContainerProps>`
  position: ${props => props.$isSticky ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.$bg};
  box-shadow: ${props => props.$isSticky ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  border-bottom: ${props => props.$showBorder ? '1px solid #e9ecef' : 'none'};
  ${props => props.$customStyles}
`

const NavContent = styled.div<NavContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  max-width: ${props => props.$maxWidth || '1200px'};
  margin: 0 auto;
`

const Logo = styled.div<LogoProps>`
  img {
    display: block;
    max-height: ${props => props.$logoHeight || '40px'};
    width: auto;
    transition: max-height 0.3s ease;
  }

  ${props => props.$isSticky && `
    img {
      max-height: ${props.$stickyLogoHeight || '32px'};
    }
  `}
`

const MenuButton = styled.button<MenuButtonProps>`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.$fontColor};
  font-size: 1.25rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${props => props.$breakPoint}) {
    display: block;
  }
`

const NavList = styled.ul<NavListProps>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;

  @media (max-width: ${props => props.$breakPoint}) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: ${props => props.$bg};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: ${props => props.$slideDirection === 'top'
      ? `translateY(${props.$isOpen ? '0' : '-100%'})`
      : `translateY(${props.$isOpen ? '0' : '100%'})`
    };
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
  }
`

const NavItem = styled.li<NavItemProps>`
  a {
    display: block;
    padding: 0.5rem 1rem;
    color: ${props => props.$fontColor};
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-radius: 0.25rem;
    position: relative;

    &:hover {
      background: #f0f0f0;
      color: #000;
    }

    ${props => props.$activeLink && `
      color: #000;
      font-weight: 700;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 2px;
        background: #000;
        border-radius: 7px;
      }
    `}
  }

  @media (max-width: ${props => props.$breakPoint}) {
    a {
      padding: 1rem;
      border-radius: 0;

      &:hover {
        background: #f0f0f0;
      }

      ${props => props.$activeLink && `
        &::after {
          left: 1rem;
          transform: none;
          width: 4px;
          height: 100%;
          top: 0;
        }
      `}
    }
  }
`

/**
 * MainNav - A responsive navigation component with sticky support
 *
 * @example
 * <MainNav logo={{ url: '/logo.png', alt: 'My App' }} isSticky>
 *   <nav>
 *     <a href="/">Home</a>
 *     <a href="/about">About</a>
 *   </nav>
 * </MainNav>
 */
const MainNav: React.FC<MainNavProps> = ({
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
  const navRef = useRef<HTMLElement>(null)

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

  // Get children from the container element
  const navChildren = React.Children.toArray(children.props?.children || [])

  return (
    <NavContainer
      ref={navRef}
      $bg={bg}
      $isSticky={isSticky && isScrolled}
      $customStyles={customStyles}
      $showBorder={showBorder}
      role="navigation"
      aria-label="Main navigation"
    >
      <NavContent $maxWidth={maxWidth}>
        <Logo
          $isSticky={isSticky && isScrolled}
          $logoHeight={logoHeight}
          $stickyLogoHeight={stickyLogoHeight}
        >
          <img src={logo.url} alt={logo.alt || 'Logo'} />
        </Logo>

        <MenuButton
          onClick={toggleMenu}
          $fontColor={fontColor}
          $breakPoint={breakPoint}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="main-nav-list"
        >
          {isOpen ? '×' : '☰'}
        </MenuButton>

        <NavList
          id="main-nav-list"
          $bg={bg}
          $fontColor={fontColor}
          $breakPoint={breakPoint}
          $isOpen={isOpen}
          $slideDirection={slideDirection}
          role="menubar"
        >
          {navChildren.map((child, index) => {
            const childElement = child as ReactElement<{ href?: string }>
            return (
              <NavItem
                key={index}
                $fontColor={fontColor}
                $breakPoint={breakPoint}
                $activeLink={childElement.props?.href === activeLink}
                role="none"
              >
                {React.cloneElement(childElement, { role: 'menuitem' })}
              </NavItem>
            )
          })}
        </NavList>
      </NavContent>
    </NavContainer>
  )
}

MainNav.displayName = 'MainNav'

export default MainNav
