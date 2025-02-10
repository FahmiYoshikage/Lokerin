import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
    <div className="container">
      <div>
        <h4>Lokerin</h4>
        <p>
          Jl. Mastrip No.100, Kates, Serut, Kec. Boyolangu, Kabupaten Tulungagung 
          <br />
          Jawa Timur 66235
        </p>
        <p>
          <strong>Phone:</strong> +62 821-4338-2978
        </p>
        <p>
          <strong>Email:</strong> bkksoretulungagung@gmail.com
        </p>
      </div>
      <div className="underline">
        <h4>Useful Links</h4>
        <p>
          <a href="/">Home</a>
        </p>
        <p>
          <a href="/admin">Admin</a>
        </p>
        <p>
          <a href="#">Services</a>
        </p>
        <p>
          <a href="#">Terms of service</a>
        </p>
      </div>
      <div>
        <h4 className="underline">Our Services</h4>
        <p>
          <a href="#">Web Design</a>
        </p>
        <p>
          <a href="#">Web Development</a>
        </p>
        <p>
          <a href="#">Product Management</a>
        </p>
        <p>
          <a href="#">Marketing</a>
        </p>
      </div>
      <div>
        <h4>Follow Us</h4>
        <p>
          Cras fermentum odio eu feugiat lide par naso tierra videa magna derita
          valies
        </p>
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
    </div>
    <div className="copyright">
      <p>
        © Copyright <strong>Lokerin</strong>. All Rights Reserved
      </p>
      <p>
        Designed by <a href="#">TKJ Bisa</a>
      </p>
    </div>
  </footer>
    )
}

export default Footer;