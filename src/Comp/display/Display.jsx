import React, { useState, useRef } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Buttun from "../container/Button";
import "./display.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "react-bootstrap";
const Display = () => {
  const [data, setData] = useState([]);
  const [invalid, setInvalid] = useState("");
  const [requireInput, setRequireInput] = useState("");
  const [show, setShow] = useState(true);
  const [passwordConditions, setPasswordConditions] = useState({
    minlength: 0,
    nuOfSpecialChar: 0,
    nuOfnumbers: 0,
    nuOfpasswords: 0,
  });
  const thisRef = useRef();
  const clipboardCopy = (text = "") => {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (invalid === "") {
        if (
          passwordConditions.nuOfSpecialChar === 0 ||
          passwordConditions.nuOfnumbers === 0 ||
          passwordConditions.nuOfpasswords === 0
        ) {
          setRequireInput("Please fill all inputs !!!");
          setInvalid("Please fill all inputs, please check all entries !!!");
        } else {
          // 'http://localhost:5500/api/generate/passwords/v1',
          const response = await fetch(
            "https://password-generator2.herokuapp.com/api/generate/passwords/v1",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(passwordConditions),
            }
          );
          const result = await response.json();
          // console.log("🚀result", result);
          if (!result) {
            setInvalid("Something went wrong, please check all entries !!");
            console.log({ invalid });
          } else if (response.ok) {
            setData(result);
            window.scrollTo(0, thisRef?.current?.offsetTop + 1000);
          } else if (response.status === 401) {
            setInvalid("You passed invalid entry");
          } else if (response.status === 403) {
            setInvalid("Password Length must be 6-128 characters.");
          } else if (response.status === 400) {
            setInvalid("Number of passwords is maximal 100.");
          }
        }
      }
    } catch (error) {
      setInvalid(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-12 password-display-container">
          <div>
            {invalid !== "" && (
              <div className="mb-4">
                <Toast
                  className="m-auto w-50"
                  onClose={() => {
                    setShow(false);
                  }}
                  show={show}
                  delay={500}
                >
                  <Toast.Header style={{ background: "#E86668" }}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                    <strong className="mr-auto text-dander">Warning !! </strong>
                  </Toast.Header>
                  <Toast.Body>{invalid}</Toast.Body>
                </Toast>
              </div>
            )}
            <div className="password-display m-auto" ref={thisRef}>
              <Form>
                <label>Minimum Length</label>
                <Form.Control
                  name="minlength"
                  type="number"
                  placeholder={!requireInput ? " " : requireInput}
                  className={invalid !== "" ? "border-danger" : " "}
                  onChange={(e) => {
                    setInvalid("");
                    setPasswordConditions({
                      ...passwordConditions,
                      minlength: e.target.value,
                    });
                  }}
                ></Form.Control>
                <label>Number of Numbers</label>
                <Form.Control
                  name="nuOfnumbers"
                  type="number"
                  placeholder={!requireInput ? " " : requireInput}
                  className={
                    isNaN(passwordConditions.nuOfnumbers) ||
                    passwordConditions?.nuOfnumbers === 0
                      ? "text-danger"
                      : " "
                  }
                  onChange={(e) => {
                    setInvalid("");
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfnumbers: e.target.value,
                    });
                  }}
                ></Form.Control>
                <label>Number of Symbols</label>
                <Form.Control
                  name="nuOfSpecialChar"
                  type="number"
                  placeholder={!requireInput ? " " : requireInput}
                  className={
                    isNaN(passwordConditions?.nuOfSpecialChar) ? "invalid" : " "
                  }
                  onChange={(e) => {
                    setInvalid("");
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfSpecialChar: e.target.value,
                    });
                  }}
                ></Form.Control>
                <label>Number of passwords</label>
                <Form.Control
                  name="nuOfpasswords"
                  type="number"
                  placeholder={!requireInput ? " " : requireInput}
                  className={
                    isNaN(passwordConditions?.nuOfpasswords)
                      ? "invalid"
                      : "password-display-input "
                  }
                  onChange={(e) => {
                    setInvalid("");
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfpasswords: e.target.value,
                    });
                  }}
                ></Form.Control>
                <Buttun
                  label="Generate passwords"
                  className="buttonSubmit"
                  handleClick={onSubmitForm}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      {data.length > 0 && !invalid ? (
        <div className="password-description">
          {data && <div className="length"> {data?.length} passwords</div>}
          {data &&
            data.map((pass, index) => {
              return (
                <div key={index} variant="flush">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i
                          title="copy"
                          className="far fa-copy"
                          onClick={() => {
                            clipboardCopy(pass);
                          }}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={pass}
                      aria-label="password"
                      aria-describedby="basic-addon1"
                      title="password"
                      disabled
                    />
                  </InputGroup>
                </div>
              );
            })}
        </div>
      ) : (
        " "
      )}
      <div className="d-flex flex-column m-5">
        <footer className="footer m-auto">
          <div className="d-flex">
            <div className="mr-2">
              <a
                href="https://github.com/ASREEN/password-generator-Frontend"
                target="blank"
              >
                <i className="fab fa-github-alt"></i>
              </a>
              <span> Github Frontend</span>
            </div>
            <div>
              <a
                href="https://github.com/ASREEN/password-generator-Backend"
                target="blank"
              >
                <i className="fab fa-github-alt"></i>
              </a>
              <span> Github Backend</span>
            </div>
          </div>
          <div className="text-info text-center">
            <span>Created by</span>
            <span>&copy; Asreen Ilyas 2021.</span>
          </div>
        </footer>
      </div>
      <br />
    </>
  );
};
export default Display;
