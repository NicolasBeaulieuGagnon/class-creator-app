import { useEffect, useState } from "react";
import { Wrapper, Form, TitleButton } from "./Styles";
import Input from "./Input";

import { IoIosArrowForward } from "react-icons/io";
import Spinning from "../../animations/Spinning";

const SignUp = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [username, password]);

  const handleSubmit = () => {
    const newUser = {
      username,
      password,
    };
    setLoading(true);
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
          placeholder="enter user name"
          value={username}
          setValue={setUserName}
        />
        <Input
          name="Password"
          type="password"
          placeholder="create password"
          value={password}
          setValue={setPassword}
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
      </Form>
    </Wrapper>
  );
};

export default SignUp;
