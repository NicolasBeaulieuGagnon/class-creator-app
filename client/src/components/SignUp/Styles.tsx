import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 54px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 25px;
  font-weight: bold;
  background: var(--main-app-color);
  color: white;
  margin-top: 20px;
  padding: 16px;
  box-shadow: 0 0 2px 1px #949494;
  border-radius: 2px;
  outline: none;
  border: none;
  text-align: start;
  transition: 200ms ease;
  :disabled {
    cursor: default;
    background: #504e4e;
  }
  span {
    div {
      display: flex;
      align-items: center;
      transition: 200ms ease;
    }
    display: flex;
  }

  :hover {
    span {
      div:nth-child(1) {
        transform: translate(300%);
      }
      div:nth-child(2) {
        transform: translate(200%);
      }
      div:nth-child(3) {
        transform: translate(100%);
      }
    }
  }
  :active {
    span {
      div:nth-child(1) {
        transform: translate(0%);
      }
      div:nth-child(2) {
        transform: translate(-100%);
      }
      div:nth-child(3) {
        transform: translate(-200%);
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 0 8px 2px #949494;
  border-radius: 3px;
  padding: 9px;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label``;

export const CustomInput = styled.input`
  font-family: inherit;
  font-size: 15px;
  padding: 5px;
  padding-left: 8px;
  outline: none;
  border: none;
  background: #f2efef;
  border-radius: 2px;
`;
