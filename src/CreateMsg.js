import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import generator from "generate-password";
import { Redirect } from "react-router-dom";

const CreateMsg = (props) => {
  if (!props.token) {
    return <Redirect to="/" />;
  }

  const [btn, setBtn] = useState(false);
  const [key, setKey] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const sendMessage = (data) => {
    setBtn(true);
    const randomKey = generator.generate({
      length: 5,
      lowercase: true,
      uppercase: true,
      numbers: true
    });

    const message = {
      randomKey,
      password: props.token,
      message: data.message,
      targetUrl: "https://csb-lgdp4.netlify.app/read/",
      targetMail: data.email
    };
    try {
      axios
        .post("https://secret-be.herokuapp.com/create-message", message)
        .then((res) => {
          if (res.status === 200) {
            alert("Message is sent succesfully");
            setBtn(false);
            setKey(randomKey);
          } else {
            alert("some error occured");
            setBtn(false);
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
        <h3 className="text-center">Your token is {props.token}</h3>
        {key ? (
          <div className="alert alert-success text-center" role="alert">
            Message sent!. Secret key is <strong>{key}</strong> Note down to
            delete message.
          </div>
        ) : null}
        <form onSubmit={handleSubmit(sendMessage)}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              placeholder="recipient email"
              ref={register({
                required: true,
                validate: (data) => {
                  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(String(data).toLowerCase());
                }
              })}
            />
            {errors.email && (
              <p className="bg-danger h6 text-white">
                Please enter a valid email address
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              className="form-control form-control-lg"
              id="message"
              name="message"
              placeholder="Type your message"
              rows="5"
              ref={register({ required: true, minLength: 10 })}
            />
            {errors.message && errors.message.type === "minLength" && (
              <p className="bg-danger h6 text-white">
                Message must be atleast 10 characters
              </p>
            )}
            {errors.message && errors.message.type === "required" && (
              <p className="bg-danger h6 text-white">
                Please enter any message
              </p>
            )}
          </div>
          <div className="form-group">
            <button
              name="submit"
              type="submit"
              className="btn btn-danger btn-lg btn-block"
              disabled={btn}
              ref={register}
            >
              {btn ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default CreateMsg;
