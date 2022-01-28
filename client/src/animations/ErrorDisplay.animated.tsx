import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { ErrorInt } from "../components/SignUp/interfaces";

interface Props {
  errorsArray: ErrorInt[];
}

const ErrorDisplayAnimation = ({ errorsArray }: Props) => {
  const transitions = useTransition(errorsArray, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Wrapper>
      {transitions(({ opacity }, error) => {
        return (
          <ErrorWrapper
            style={{
              opacity: opacity,
              transform: opacity.to({
                range: [0.0, 0.5, 1.0],
                output: [
                  `translate(${200 + error.id * 50}px)`,
                  `translate(${50 + error.id * 70}px)`,
                  `translate(0px)`,
                ],
              }),
              top: `${error.id * 40 + 80}px`,
            }}
          >
            {error.message}
          </ErrorWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ErrorWrapper = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  padding-right: 20px;
  border: 2px solid #d10b0b;
  border-right: none;
  background: #f0cccc;
`;

export default ErrorDisplayAnimation;
