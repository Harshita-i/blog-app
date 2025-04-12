import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Information Section */}
          <div className="col-sm-3">
            <h6 className="text-uppercase fw-bold">Information</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">Dashboard</a></li>
              <li><a href="#" className="text-white text-decoration-none">Features</a></li>
              <li><a href="#" className="text-white text-decoration-none">Pricing</a></li>
              <li><a href="#" className="text-white text-decoration-none">Our Team</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-sm-3">
            <h6 className="text-uppercase fw-bold">Resources</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">React Docs</a></li>
              <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-white text-decoration-none">Community</a></li>
              <li><a href="#" className="text-white text-decoration-none">Support</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-sm-2">
            <h6 className="text-uppercase fw-bold">Help</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">Sign Up</a></li>
              <li><a href="#" className="text-white text-decoration-none">Login</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-sm-3">
            <h6 className="text-uppercase fw-bold">Contact Us</h6>
            <p className="mt-3">Need help? Reach out to us anytime! <br/> <i className="bi bi-envelope-fill"></i> support@admin.com <br /> <i className="bi bi-phone-fill"></i> +91 9999999999</p>
            {/* <p><i className="bi bi-envelope-fill"></i> support@admin.com</p>
            <p><i className="bi bi-phone-fill"></i> +91 9999999999</p> */}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4">
          <hr className="border-light" />
          <p className="mb-0">© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
