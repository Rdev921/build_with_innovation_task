import { useContext, useEffect, useState } from "react"
import './product.css'
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/features/CartSlice';
import { Button, Form, } from 'react-bootstrap';
import { SearchContext } from "../../context/SearchContext";
import { toast, ToastContainer } from "react-toastify";

const Product = () => {
    const [products, setProducts] = useState();
    const dispatch = useDispatch();
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    const { search, setSearch } = useContext(SearchContext);
    const [sortOptions, setSortOptions] = useState();

    // fetch products data
    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredItems(data.products);
        console.log(data.products);
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const handleCart = (e) => {
        dispatch(addToCart(e))
        toast.success('Add to cart');
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search);
    }

    const handleFilterChange = (item) => {
        const filterItems = products.filter((product) => product.category === item)
        setFilteredItems(filterItems);
        setSelectedCategory(item);
        // console.log(item);
    }
    const handleSortChange = (sortItem) => {
        setSortOptions(sortItem);
        const sortedItems = [...filteredItems];
        switch (sortItem) {
            case 'low-to-high':
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case 'high-to-low':
                sortedItems.sort((a, b) => b.price - a.price);
                break;
        }
        setFilteredItems(sortedItems);
        // console.log(sortItem);
    }
    return (

        <section className='iteam_section mt-4 container'>
            <Form className="d-flex mb-5 w-100 ">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearch}
                />

                <Form.Select className="mx-3"
                    onChange={(e) => handleFilterChange(e.target.value)}
                    value={selectedCategory}
                >
                    <option >---Filter By Category---</option>
                    <option value="smartphones">Smart Phones</option>
                    <option value="laptops">Laptops</option>
                    <option value="skincare">SkinCare</option>
                    <option value="groceries">Groceries</option>
                </Form.Select>


                <Form.Select className="mx-3"
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={sortOptions}
                >
                    <option >---Sort By Price---</option>
                    <option value={"low-to-high"}>Low To High</option>
                    <option value={"high-to-low"}>High To Low</option>
                </Form.Select>

            </Form>



            <div className='row mt-2 d-flex justify-content-around align-items-center'>
                {
                    filteredItems.length > 0 ?
                        filteredItems.filter((value) => {
                            if (search === '') {
                                return value;
                            } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
                                return value;
                            }
                        })?.map((element, index) => (
                            <>
                                <Card style={{ width: "22rem", border: "none" }} className='hove mb-4' key={element.id}>
                                    <Card.Img variant='top' className='cd' src={element.thumbnail} />

                                    <div className="card_body">
                                        <div className="upper_data d-flex justify-content-between align-items-center">
                                            <h4 className='mt-2'>{element.title}</h4>
                                            <span>{element.rating}&nbsp;★</span>
                                        </div>

                                        <div className="lower_data d-flex justify-content-between ">
                                            <h5>{element.address}</h5>
                                            <span>₹ {element.price}</span>
                                        </div>
                                        <div className="extra"></div>

                                        <div className="last_data d-flex justify-content-between align-items-center">
                                            <img src={element.arrimg} className='limg' alt="" />
                                            <Button style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light'
                                                className='mt-2 mb-2'
                                                onClick={() => handleCart(element)}
                                            >Add TO Cart</Button>
                                            <img src={element.delimg} className='laimg' alt="" />

                                        </div>
                                    </div>
                                </Card>
                            </>
                        )) : <Card.Img variant='top' className='cd' src="/loader.svg" />}
            </div>
            <ToastContainer theme="colored" />
        </section>
    )
}
export default Product