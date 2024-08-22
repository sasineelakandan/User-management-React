import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', { name, email, password });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div
        ref={formRef}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center animate-pulse">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-field relative">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              required
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Full Name"
            />
            <FontAwesomeIcon icon={faUser} className="absolute right-4 top-4 text-white" />
          </div>
          <div className="input-field relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Email Address"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-white" />
          </div>
          <div className="input-field relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute right-4 top-4 text-white" />
          </div>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110"
          >
            Sign Up
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </form>
        <p className="text-white text-center mt-6">
          Already have an account?{' '}
          <a href="#" className="font-bold hover:underline text-pink-200">
            Log in
          </a>
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faFacebookF} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faTwitter} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faGoogle} className="fab text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
