import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const Spinning = () => {
  return (
    <Wrapper>
      <AiOutlineLoading size={32} />
    </Wrapper>
  );
};

const spin = keyframes`
        from{
            transform:rotate(0deg)

        }
        to{
            transform:rotate(360deg);


        }

`;

const Wrapper = styled.div`
  display: inline-block;
  transition: 200ms ease;
  height: 32px;
  width: 32px;
  margin-left: 10px;
  animation: ${spin} 600ms linear infinite;
`;

export default Spinning;
