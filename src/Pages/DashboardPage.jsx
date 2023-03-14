import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/x-origin-y-promotion-media"
      );
      setData(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <img src={data.url_result} alt="" />
    </div>
  );
};

export default DashboardPage;
