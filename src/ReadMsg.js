import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ReadMsg = () => {
  const [msg, setMsg] = useState(null);

  const query = new URLSearchParams(useLocation().search);
  const mid = query.get("rs");

  useEffect(() => {
    if (!msg) {
      try {
        axios
          .get(`https://secret-be.herokuapp.com/message-by-id/${mid}`)
          .then((res) => {
            if (res.status === 200) setMsg(res.data.result[0].message);
            else setMsg("message does not exist");
          })
          .catch((err) => setMsg("message does not exist"));
      } catch (err) {
        setMsg("message does not exist");
      }
    }
  }, [mid, msg]);
  return (
    <div className="row mt-5">
      <div className="col-3"></div>
      <div className="col-6">
        {msg ? (
          <>
            <h3 className="text-center">
              Someone has sent you an anonymous message
            </h3>
            <div className="bg-info text-center">
              <h3>{msg}</h3>
            </div>
          </>
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default ReadMsg;
