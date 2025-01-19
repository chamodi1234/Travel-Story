import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (form.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/userRoutes/register', {
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
            });

            setSuccess('Registration successful');
            setForm({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            setError(
                error.response?.data?.message || 'Registration failed. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url(/images/register.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className='card p-4 shadow'
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    backgroundColor: '#222',
                    borderRadius: '10px',
                }}
            >
                <form style={{ width: '400px' }} onSubmit={handleSubmit}>
                    <h2
                        className='mb-3'
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Travel Story App <p>Register Page</p>
                    </h2>
                    {success && (
                        <p
                            style={{
                                color: 'green',
                                textAlign: 'center',
                                fontSize: '18px',
                            }}
                        >
                            {success}
                        </p>
                    )}
                    {error && (
                        <p
                            style={{
                                color: 'red',
                                textAlign: 'center',
                                fontSize: '18px',
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <label htmlFor='name' className='form-label' style={{ color: 'white' }}>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Name'
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />

                    <label htmlFor='email' className='form-label' style={{ color: 'white' }}>
                        Email Address
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter Your Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />

                    <label htmlFor='password' className='form-label' style={{ color: 'white' }}>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />

                    <label
                        htmlFor='confirmPassword'
                        className='form-label'
                        style={{ color: 'white' }}
                    >
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />

                    <button
                        type='submit'
                        className='btn btn-secondary w-100'
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div className='text-center mt-4'>
                        <a href='/login' className='text-decoration-none' style={{ color: 'white' }}>
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
