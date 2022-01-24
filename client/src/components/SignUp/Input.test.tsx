import Input from "./Input";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Input.tsx tests", () => {
  const wrapper = shallow(
    <Input
      name="test"
      type="text"
      placeholder="testPlaceHolder"
      value=""
      setValue={() => {}}
    />
  );
  it("should have the name as test", () => {
    const name = wrapper.childAt(0).text();

    expect(name).toBe("test");
  });

  // this test still does not work for some reason, further research is needed

  it("should type in test in the input", () => {
    let input = wrapper.childAt(1);
    input.simulate("change", {
      target: { value: "testing change" },
    });
    // expect(input.text()).toBe("testing change");

    expect(input.prop("value")).toEqual("testing change");
  });
});
