import React from "react";

const DetailCamera = ({ setOpen, item }) => {
  const close = () => {
    setOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen">
      <div className="max-w-2xl bg-white rounded-lg shadow">
        {/* Modal header */}
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-center text-gray-900">
            Detail Kamera
          </h3>
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
            onClick={() => close()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="shadow-xl card w-96 bg-base-100">
          <figure>
            <img src={item.value.imageUrl} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.value.alternative}</h2>
            <ul>
              <li>
                {" "}
                Model :{" "}
                {item.value.cameraAttributes.model == 1 ? "Mirrorless" : null}
                {item.value.cameraAttributes.model == 2 ? "Pocket" : null}
                {item.value.cameraAttributes.model == 3 ? "DSLR" : null}
              </li>
              <li>
                Harga :{" "}
                {item.value.cameraAttributes.price == 1
                  ? "Rp. 1 juta – Rp. 5juta"
                  : null}
                {item.value.cameraAttributes.price == 2
                  ? "Rp. > 5 juta – Rp. 10 juta"
                  : null}
                {item.value.cameraAttributes.price == 3
                  ? "Rp. > 10 juta – Rp. 15 juta"
                  : null}
                {item.value.cameraAttributes.price == 4
                  ? "Rp. > 15 juta – Rp. 20 juta"
                  : null}
                {item.value.cameraAttributes.price == 5
                  ? "Rp. > 20 juta – Rp. 25 juta >"
                  : null}
              </li>
              <li>
                Resolusi Foto (Pixel) :{" "}
                {item.value.cameraAttributes.photoResolution == 1
                  ? `10 MP – 15 MP`
                  : null}
                {item.value.cameraAttributes.photoResolution == 2
                  ? `> 15 MP – 20 MP`
                  : null}
                {item.value.cameraAttributes.photoResolution == 3
                  ? `> 20 MP – 25 MP`
                  : null}
                {item.value.cameraAttributes.photoResolution == 4
                  ? `> 25 MP – 30 MP`
                  : null}
                {item.value.cameraAttributes.photoResolution == 5
                  ? `> 30 MP`
                  : null}
              </li>
              <li>
                {" "}
                Resolusi Video (Pixel) :{" "}
                {item.value.cameraAttributes.videoResolution == 1
                  ? `Video (640 x 480)`
                  : null}
                {item.value.cameraAttributes.videoResolution == 2
                  ? `Video HD (1280 x720)`
                  : null}
                {item.value.cameraAttributes.videoResolution == 3
                  ? `Full HD (1920 x 1080)`
                  : null}
                {item.value.cameraAttributes.videoResolution == 4
                  ? `Ultra HD (3840 x 2160)`
                  : null}
                {item.value.cameraAttributes.videoResolution == 5
                  ? `4K (4096 x 2160)`
                  : null}
              </li>
              <li>
                Daya Baterai :{" "}
                {item.value.cameraAttributes.batteryPower == 1
                  ? `100 mAH – 500 mAH`
                  : null}
                {item.value.cameraAttributes.batteryPower == 2
                  ? `> 500 mAH – 1000 mAH`
                  : null}
                {item.value.cameraAttributes.batteryPower == 3
                  ? `> 1000 mAH – 1500 mAH`
                  : null}
                {item.value.cameraAttributes.batteryPower == 4
                  ? `> 1500 mAH – 2000 mAH`
                  : null}
                {item.value.cameraAttributes.batteryPower == 5
                  ? `> 2000 mAH – 2500 mAH`
                  : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCamera;
