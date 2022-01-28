import styled from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.h2`
  width: 90%;
  margin-left: 5%;
  padding: 10px;
  box-shadow: 0 0 2px 1px #d8d6d6;
  border-radius: 2px;
`;

export const Border = styled.div`
  height: 4px;
  width: 98%;
  margin-left: 1%;
  border-radius: 5px;
  background: #bbb;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
  box-shadow: 0 0 5px 1px #dad7d7;
  margin: 0 5%;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const InputWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
`;

export const Label = styled.label``;

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  background: #f2efef;
  box-shadow: 0 0 5px 1px #dad7d7 inset;
  border-radius: 3px;
  padding: 5px;
`;

export const TextInput = styled.textarea`
  outline: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  resize: none;
  box-shadow: 0 0 5px 1px #dad7d7 inset;
  background: #f2efef;
  border-radius: 3px;
  padding: 10px;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
`;

export const DatePickOutput = styled.div`
  margin: 10px;
`;

export const DatePickerWrapper = styled.div`
  width: 80%;
  max-width: 600px;

  input {
    outline: none;
    border: none;
    font-size: 13px;
    font-family: inherit;
    background: #f2efef;
    box-shadow: 0 0 5px 1px #dad7d7 inset;
    border-radius: 3px;
    padding: 5px;
    width: 98%;
    text-align: center;
  }
`;
