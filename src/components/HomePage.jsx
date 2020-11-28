import React from "react";



const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h4 className="font-weight-bold text-left">LE FOU FOU </h4>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-bold text-center">RIRE NOW </h4>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-bold text-right">JOKES BLAGUES</h4>
        </div>
      </div>
      <div className="row position-relative">
        
            <img id="home-img" className="img-fluid" src="club-2.jpg" alt="club" />
      </div>
    </div>
  );
};

export default HomePage;
