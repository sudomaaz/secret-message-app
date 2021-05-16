import React from "react";
import generator from "generate-password";

const GenToken = (props) => {
  const getToken = () => {
    const pwd = generator.generate({
      length: 11,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true
    });
    localStorage.setItem("token", pwd);
    props.call(pwd);
  };

  return (
    <div className="row mt-5">
      <div className="col-4"></div>
      <div className="col-4">
        <p className="text-center">
          To send message you need to generate a private token
        </p>
        <button
          onClick={() => getToken()}
          type="button"
          className="btn btn-success btn-lg btn-block"
        >
          Generate User Token
        </button>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

export default GenToken;
