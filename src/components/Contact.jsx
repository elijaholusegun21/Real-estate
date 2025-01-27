import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: '',
  });
  const [isSending, setIsSending] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); 
    const endpoint = 'https://formspree.io/f/mldgjejw'; 
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setIsSending(false); 
      if (response.ok) {
        toast.success('Your message has been sent!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({ Name: '', Email: '', Message: '' });
      } else {
        toast.error('Oops! Something went wrong.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setIsSending(false);
      toast.error('Error sending your message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <motion.div 
      initial={{opacity: 0, x:-200}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
      className="relative">
      {/* Toast Container */}
      <ToastContainer />

      {/* Contact Form */}
      <div className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden" id="Contact">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
          Contact{' '}
          <span className="underline underline-offset-4 decoration-1 font-light">With Us</span>
        </h1>
        <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
          Ready to make a move? Let's build your future together.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-gray-600 pt-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 text-left">
              Your Name
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                type="text"
                name="Name"
                placeholder="Your Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 text-left md:pl-4">
              Your Email
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                type="email"
                name="Email"
                placeholder="Your Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="my-6 text-left">
            Message
            <textarea
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
              name="Message"
              placeholder="Your Message"
              value={formData.Message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`py-2 px-12 mb-10 rounded ${isSending ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
