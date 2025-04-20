import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
 
        alert('Password reset link sent to your email.');
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">ingresa tu correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Enviar el enlace</button>
                </form>
                <p>
                    Recuerdas que puedes <Link to="/login">iniciar sesión</Link> con tu correo electrónico y contraseña.
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
