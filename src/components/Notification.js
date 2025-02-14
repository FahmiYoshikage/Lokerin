import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Berhasil berlangganan! Silakan cek email Anda.');
        setEmail(''); // Reset form setelah berhasil
      } else {
        toast.warning(data.message || 'Gagal berlangganan, silakan coba lagi.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi nanti.');
      console.error('Subscribe error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="upper">
      <div className="upper-container">
        <h1>Lowongan Kerja? </h1>
        <p className="p-black">
          Ter-integrasi langsung dengan Bursa Kerja dari SMK "SORE" TULUNGAGUNG
          yang telah bekerja sama dengan banyak perusahaan besar hingga Internasional
        </p>

        <form onSubmit={handleSubmit} className="email-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isLoading}
            className={isLoading ? 'opacity-50' : ''}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isLoading ? 'Subscribing...' : 'Get Notified'}
          </button>
        </form>

        <p style={{color: "crimson"}}>
          Isi alamat email untuk jadi yang pertama ketika ada job baru yang ditambahkan
        </p>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Notification;