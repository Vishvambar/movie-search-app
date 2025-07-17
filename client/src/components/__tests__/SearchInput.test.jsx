import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '../SearchInput'

describe('SearchInput', () => {
  it('renders search input and button', () => {
    const mockOnSearch = vi.fn()
    render(<SearchInput onSearch={mockOnSearch} />)
    
    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()
    
    render(<SearchInput onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Search for movies...')
    const button = screen.getByRole('button', { name: 'Search' })
    
    await user.type(input, 'Batman')
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('Batman')
  })

  it('prevents empty searches', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()
    
    render(<SearchInput onSearch={mockOnSearch} />)
    
    const button = screen.getByRole('button', { name: 'Search' })
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })
})
