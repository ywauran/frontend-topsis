import React from "react";
import ImagePlaceholder from "../../assets/images.png";
import Header from "../../components/Header";

const ListCameraPage = () => {
  const data = [1, 3, 4, 5, 6, 6, 6, 6];
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div className="shadow-xl card lg:card-side bg-base-100">
            <div className="">
              <img
                src={ImagePlaceholder}
                alt="Album"
                className="w-full h-full rounded-tr-xl"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCameraPage;
