import { useDispatch, useSelector } from 'react-redux'
import './CartDetails.css'
import { clearAll, removeToCart } from '../../redux/features/CartSlice';
import { useEffect, useState } from 'react';
import Menu from '../Menu';
import { ToastContainer, toast } from 'react-toastify';
const CartDetails = () => {
    const { cart } = useSelector((state) => state.allCart);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    const cartEmpty = () => {
        dispatch(clearAll());
        toast.error('Cart Empty!');
    }

    const remove = (e) => {
        dispatch(removeToCart(e.id));
        toast.error('Remove from cart');
    }

    const total = () => {
        let totalprice = 0;
        cart.map((ele, index) => {
            totalprice = ele.price + totalprice;
        })
        setTotalPrice(totalprice);
    }

    useEffect(() => {
        total();
    }, [total])

    return (
        <>
            <Menu />
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-white m-0'>{`Total Items : (${cart.length})`}</h5>
                                {
                                    cart.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'

                                    ><i className='fa fa-trash-alt mr-2'></i><span onClick={cartEmpty}>EmptyCart</span></button>
                                        : ""
                                }
                            </div>

                        </div>
                        <div className="card-body p-0">
                            {
                                cart.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th></th>
                                                <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((data, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <button className='prdct-delete'
                                                                        onClick={() => remove(data)}
                                                                    ><i className='fa fa-trash-alt'></i></button>
                                                                </td>
                                                                <td><div className='product-img'><img src={data.thumbnail} alt="" /></div></td>
                                                                <td><div className='product-name'><p>{data.title}</p></div></td>
                                                                <td>₹ {data.price}</td>
                                                                <td></td>
                                                                <td className='text-right'>{data.price}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}>&nbsp;</th>
                                                <th></th>
                                                <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span>{totalPrice}<span className='text-danger'></span></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default CartDetails