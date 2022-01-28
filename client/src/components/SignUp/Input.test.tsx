import Input from "./Input";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CustomInput } from "./Styles";
import React from "react";

configure({ adapter: new Adapter() });

describe("Input.tsx tests", () => {
  const setState = jest.fn();

  jest
    .spyOn(React, "useState")
    .mockImplementation((): [unknown, React.Dispatch<unknown>] => [
      "initState",
      setState,
    ]);

  const wrapper = shallow(
    <Input
      name="test"
      type="text"
      placeholder="testPlaceHolder"
      value=""
      setValue={setState}
      removeErrors={() => {}}
    />
  );
  it("should have the name as test", () => {
    const name = wrapper.childAt(0).text();

    expect(name).toBe("test");
  });

  it("should start with no value", () => {
    expect(wrapper.find(CustomInput).text()).toBe("");
  });

  it("should type in test in the input", () => {
    wrapper.find(CustomInput).simulate("change", {
      target: { value: "testing change" },
    });
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
