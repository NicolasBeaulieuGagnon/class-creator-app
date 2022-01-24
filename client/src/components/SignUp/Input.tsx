import React, { useState } from "react";
import { InputInterface } from "./interfaces";
import { CustomInput, InputWrapper, Label } from "./Styles";

const Input = ({
  name,
  placeholder,
  type,
  value,
  setValue,
}: InputInterface) => {
  const [myValue, setMyValue] = useState("");

  return (
    <InputWrapper>
      <Label htmlFor={`${type}-${name}`}>{name}</Label>
      {/* <CustomInput
        value={value}
        id={`${type}-${name}`}
        type={type}
        placeholder={placeholder}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
      /> */}
      <CustomInput
        id={`${type}-${name}`}
        value={myValue}
        onChange={(ev) => setMyValue(ev.target.value)}
        type={type}
      />
    </InputWrapper>
  );
};

export default Input;
