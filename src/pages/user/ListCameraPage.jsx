import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { app } from "../../config";
import { getDatabase, ref, onValue } from "firebase/database";
import DetailCamera from "./DetailCamera";

const db = getDatabase(app);
const ListCameraPage = () => {
  const [data, setData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState({});
  const [open, setOpen] = useState(false);
  const getData = () => {
    const dbRef = ref(db, "alternative");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });
      console.log(data);
      setData(data);
    });
  };

  const handleDetail = (selected) => {
    setSelectedCamera(selected);
    setOpen(true);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div className="shadow-xl card lg:card-side bg-base-100">
            <div className="">
              <img
                src={item.value.imageUrl}
                alt="Album"
                className="w-36 h-36 rounded-tr-xl"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">{item.value.alternative}</h2>
              <div className="justify-end card-actions">
                <button
                  onClick={() => handleDetail(item)}
                  className="btn btn-primary"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && <DetailCamera setOpen={setOpen} item={selectedCamera} />}
    </>
  );
};

export default ListCameraPage;
