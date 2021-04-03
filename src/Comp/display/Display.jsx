import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./display.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Display = () => {
  const [data, setData] = useState([]);
  const [passwordConditions, setPasswordConditions] = useState({
    minlength: 0,
    nuOfSpecialChar: 0,
    nuOfnumbers: 0,
    nuOfpasswords: 0,
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log({ passwordConditions });
    try {
      const response = await fetch(
        "http://localhost:5500/api/generate/passwords/v1",
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
        console.log({ response, result });
      } else if (response.status === 401) {
        console.log(response, "401");
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-12 password-display-container">
          <div>
            <div className="password-display m-auto">
              <form onSubmit={onSubmitForm}>
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
                ></Form.Control>
                <button type="submit" className="buttonSubmit">
                  Generate passwords
                </button>
              </form>
            </div>
          </div>
          <div className="password-display-icons"></div>
        </div>
      </div>
      <br />
      <br />
      {data.length > 0 ? (
        <div className="password-description">
          {data && (
            <div className="length">These are {data.length} passwords</div>
          )}
          {data &&
            data.map((pass, index) => {
              return (
                <div className="m-auto w-50 m-3 pass" key={index}>
                  {pass}
                </div>
              );
            })}
        </div>
      ) : " "
    }
      <br /> <br /> <br />
    </>
  );
};
export default Display;
