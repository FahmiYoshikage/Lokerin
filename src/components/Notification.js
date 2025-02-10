import React from "react";

const Notification = () => {
    return (
      <section className="upper">
      <div className="upper-container">
        <h1>Lowongan Kerja? </h1>
        <p className="p-black">Ter-integrasi langsung dengan Bursa Kerja dari SMK "SORE" TULUNGAGUNG yang telah bekerja sama dengan banyak perusahaan besar hingga Internasional</p>

        <div className="email-box">
          <input type="email" placeholder="Enter your email address" />
          <button>Get Notified</button>
        </div>
        <p style={{color: "crimson"}}>Isi alamat email untuk jadi yang pertama ketika ada job baru yang ditambahkan</p>
        <p style={{color: "red"}}>Opsional</p>
      </div>
    </section>
    )
}

export default Notification;