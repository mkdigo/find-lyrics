import './styles.css'
import Logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className="container">
      <div className="content">
        <img src={Logo} alt="Logo"/>
        <span>Find your favorite music.</span>
      </div>
    </header>
  )
}

export default Header