import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState("kminchelle");
    const [password, setPassword] = useState("0lelplR");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            loginUser(data.token)
            alert('User LoggedIn Successfully')
            if (data.token) {
                navigate('/home')
            }
        } catch (error) {
            console.log(error);
            alert('Invalid Credentials');
            loginUser(null);
        }

    }
    return (
        <>

            <div class="col-md-6 col-lg-4 offset-lg-4 offset-md-3 mt-5">
                <div class="bg-light p-5 border shadow">
                    <h4 className="mb-3">Login</h4>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-4">
                            <input type="text" class="form-control" placeholder="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                            <p class="form-text text-end">Enter Valid Username/Email</p>
                        </div>
                        <div class="mb-4">
                            <input type="password" class="form-control" placeholder="Enter Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <p class="form-text text-end">Enter Valid Password</p>
                        </div>
                        <div class="mb-4 form-check w-100">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" /> Remember Me
                            </label>
                            <a href="#" class="float-end">Reset Password</a>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 my-3 shadow">Login</button>
                    </form>

                </div>
            </div>


            {/* <Container>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Welcome to E-Commerce Hub</h1>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <Form onSubmit={handleSubmit} className="w-50 d-block m-auto mt-4" >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </Container> */}

        </>



    )
}
export default Login