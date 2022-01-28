import { InputInterface } from "./interfaces";
import { CustomInput, InputWrapper, Label } from "./Styles";

const Input = ({
  name,
  placeholder,
  type,
  value,
  setValue,
  removeErrors,
}: InputInterface) => {
  return (
    <InputWrapper>
      <Label htmlFor={`${type}-${name}`}>{name}</Label>
      <CustomInput
        value={value}
        id={`${type}-${name}`}
        type={type}
        placeholder={placeholder}
        onChange={(ev) => {
          setValue(ev.target.value);
          removeErrors();
        }}
      />
    </InputWrapper>
  );
};

export default Input;
