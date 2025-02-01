import { renderHook, act } from '@testing-library/react'
import useWindowResize from '../useWindowResize'

describe('useWindowResize', () => {
  const originalInnerWidth = window.innerWidth
  const originalInnerHeight = window.innerHeight

  afterEach(() => {
    // Reset window dimensions after each test
    window.innerWidth = originalInnerWidth
    window.innerHeight = originalInnerHeight
    window.dispatchEvent(new Event('resize'))
  })

  it('returns window dimensions', () => {
    const { result } = renderHook(() => useWindowResize())

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight
    })
  })

  it('updates on window resize', () => {
    const { result } = renderHook(() => useWindowResize())

    act(() => {
      // Mock window resize
      window.innerWidth = 1024
      window.innerHeight = 768
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({
      width: 1024,
      height: 768
    })
  })

  it('handles mobile dimensions', () => {
    const { result } = renderHook(() => useWindowResize())

    act(() => {
      window.innerWidth = 375
      window.innerHeight = 667
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({
      width: 375,
      height: 667
    })
  })

  it('handles multiple resize events', () => {
    const { result } = renderHook(() => useWindowResize())

    act(() => {
      window.innerWidth = 1024
      window.innerHeight = 768
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({
      width: 1024,
      height: 768
    })

    act(() => {
      window.innerWidth = 1440
      window.innerHeight = 900
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({
      width: 1440,
      height: 900
    })
  })
})
