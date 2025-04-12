import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setCurrentUser } = useContext(userAuthorContextObj);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const credentials={email,password}
        try {
            const res = await axios.post("http://localhost:3000/admin-api/login",credentials);
            console.log("API Response:", res.data);
            const { message, payload } = res.data;
            if (message === "success") {
                setCurrentUser({ ...payload, role: 'admin' });
                navigate("/admin-dashboard");
            } else {
                setError(message);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    }

    return (
        <div className="container align-items-center justify-content-center d-flex">
            <div className="card shadow p-4 mt-5" style={{width:"100%",maxWidth:"1000px"}}>
            <h2 className="text-center">Admin Login</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>
        </div>
    );
}

export default AdminLogin;
