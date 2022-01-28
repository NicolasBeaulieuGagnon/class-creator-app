import { useEffect, useState } from "react";
import { Wrapper, Form, TitleButton } from "./Styles";
import Input from "./Input";

import { IoIosArrowForward } from "react-icons/io";
import Spinning from "../../animations/Spinning";
import ErrorDisplayAnimation from "../../animations/ErrorDisplay.animated";
import { ErrorInt } from "./interfaces";

const SignUp = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorInt[]>([]);

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [username, password]);

  const handleSubmit = async () => {
    const newUser = {
      name: username,
      password,
    };
    setLoading(true);
    const result = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());

    if (result.accessToken) {
    }
    if (result.statusCode === 400) {
      const errorMessages: ErrorInt[] = result.message.map(
        (message: string, index: number) => {
          return { message, id: index };
        }
      );

      setErrors(errorMessages);
    }
    setLoading(false);
  };

  const removeErrors = () => {
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <Wrapper>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          name="Username"
          type="text"
          placeholder="Enter Username"
          value={username}
          setValue={setUserName}
          removeErrors={removeErrors}
        />
        <Input
          name="Password"
          type="password"
          placeholder="Create Password"
          value={password}
          setValue={setPassword}
          removeErrors={removeErrors}
        />

        <TitleButton disabled={!canSubmit} type="submit">
          Sign up
          {loading ? (
            <Spinning />
          ) : (
            canSubmit && (
              <span>
                <div>
                  <IoIosArrowForward />
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </span>
            )
          )}
        </TitleButton>
        <ErrorDisplayAnimation errorsArray={errors} />
      </Form>
    </Wrapper>
  );
};

export default SignUp;
