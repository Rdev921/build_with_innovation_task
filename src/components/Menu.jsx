import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
function Menu() {
  const { logoutUser } = useContext(AuthContext);
  const { cart } = useSelector((state) => state.allCart);

  return (
    <Navbar style={{ height: '60px', background: '#171717', color: '#fff' }}>
      <Container>
        <Link to={'/home'}>
          <h3 className='text-light '>E-Commerce</h3>
        </Link>
        <Link to={'/cart'} className='text-decoration-none text-light mx-2'>
          <div id='ex4'>
            <span className='p1 fa-stack fa-2x has-badge' data-count={cart.length}>
              <i className='fa-solid fa-cart-shopping'></i>
            </span>

          </div>

        </Link>
        <Button onClick={logoutUser} className='mx-3'>Logout</Button>
      </Container>
    </Navbar>
  );
}

export default Menu;