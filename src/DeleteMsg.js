import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router-dom";

const DeleteMsg = (props) => {
  if (!props.token) {
    return <Redirect to="/" />;
  }
  const [btn, setBtn] = useState(false);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const deleteMessage = (data) => {
    setBtn(true);

    const message = {
      secretKey: data.secretKey,
      password: props.token
    };
    try {
      axios
        .delete("https://secret-be.herokuapp.com/delete-message", {
          data: message
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Message is deleted succesfully");
            setBtn(false);
            setDone(true);
          }
        })
        .catch((err) => {
          alert("some error occured");
          setBtn(false);
        });
    } catch (err) {
      alert("some error occured");
      setBtn(false);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-3"></div>
      <div className="col-6">
        {done ? (
          <div className="alert alert-success text-center" role="alert">
            Message is deleted succesfully!
          </div>
        ) : null}
        <form onSubmit={handleSubmit(deleteMessage)}>
          <div className="form-group">
            <label htmlFor="secretKey">Secret Key</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="secretKey"
              name="secretKey"
              placeholder="secret key of message"
              ref={register({
                required: true
              })}
            />
            {errors.secretKey && (
              <p className="bg-danger h6 text-white">
                Please enter the secret key
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="token">Your token</label>
            <input
              type="text"
              className="form-control form-control-lg text-muted"
              id="token"
              name="token"
              disabled={true}
              value={props.token}
              ref={register({
                required: true
              })}
            />
          </div>
          <div className="form-group">
            <button
              name="submit"
              type="submit"
              className="btn btn-danger btn-lg btn-block"
              disabled={btn}
              ref={register}
            >
              {btn ? "Deleting..." : "Delete Message"}
            </button>
          </div>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default DeleteMsg;
