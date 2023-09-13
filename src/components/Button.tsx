import { ReactNode } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => void
}

const Button = ({ type, children, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="border py-2 px-4 bg-blue-500 text-white hover:bg-blue-700"
    type={type}
  >
    {children}
  </button>
)

export default Button
