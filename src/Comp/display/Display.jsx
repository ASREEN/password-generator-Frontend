import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Buttun from "../container/Button";
import "./display.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Display = () => {
  const [data, setData] = useState([]);
  const [invalid, setInvalid] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    minlength: 0,
    nuOfSpecialChar: 0,
    nuOfnumbers: 0,
    nuOfpasswords: 0,
  });
  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid("");
      }, 5000);
    }
  }, [invalid]);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://password-generator2021.herokuapp.com/api/generate/passwords/v1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordConditions),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else if (response.status === 401) {
        setInvalid("You passed invalid entry");
      } else if (response.status === 403) {
        setInvalid("Password Length must be 6-128 characters.");
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
            <div className="password-display m-auto">
              <Form>
                <label>Minimum Length</label>
                <Form.Control
                  name="minlength"
                  type="number"
                  className={
                    isNaN(passwordConditions?.minlength) ? "invalid" : " "
                  }
                  onChange={(e) => {
                    setPasswordConditions({
                      ...passwordConditions,
                      minlength: e.target.value,
                    });
                  }}
                  required
                ></Form.Control>
                <label>Number of Numbers</label>
                <Form.Control
                  name="nuOfnumbers"
                  type="number"
                  //    value={passwordConditions?.nuOfnumbers}
                  className={
                    isNaN(passwordConditions?.nuOfnumbers) ? "invalid" : " "
                  }
                  onChange={(e) => {
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfnumbers: e.target.value,
                    });
                  }}
                  required
                ></Form.Control>
                <label>Number of Symbols</label>
                <Form.Control
                  name="nuOfSpecialChar"
                  type="number"
                  // value={passwordConditions.nuOfSpecialChar}
                  className={
                    isNaN(passwordConditions?.nuOfSpecialChar) ? "invalid" : " "
                  }
                  onChange={(e) => {
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfSpecialChar: e.target.value,
                    });
                  }}
                  required
                ></Form.Control>
                <label>Number of passwords</label>
                <Form.Control
                  name="nuOfpasswords"
                  type="number"
                  // value={passwordConditions.nuOfpasswords}
                  className={
                    isNaN(passwordConditions?.nuOfpasswords)
                      ? "invalid"
                      : "password-display-input "
                  }
                  onChange={(e) => {
                    setPasswordConditions({
                      ...passwordConditions,
                      nuOfpasswords: e.target.value,
                    });
                  }}
                  required
                ></Form.Control>
                <Buttun
                  label="Generate passwords"
                  className="buttonSubmit"
                  handleClick={onSubmitForm}
                />
              </Form>
            </div>
          </div>
          <div className="password-display-icons"></div>
        </div>
      </div>
      <br />
      <br />
      {invalid && (
        <div className="m-auto w-50 m-3 pass text-danger">{invalid}</div>
      )}
      {data.length > 0 && !invalid ? (
        <div className="password-description">
          {data && <div className="length"> {data.length} passwords</div>}
          {data &&
            data.map((pass, index) => {
              return (
                <div className="m-auto  m-3 pass" key={index}>
                  <b className="index">{index + 1})</b>
                  {pass}
                </div>
              );
            })}
        </div>
      ) : (
        " "
      )}
      <br /> <br /> <br />
    </>
  );
};
export default Display;
