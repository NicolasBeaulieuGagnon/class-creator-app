import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignUp from ".";
import { Form, TitleButton } from "./Styles";

configure({ adapter: new Adapter() });

describe("SignUp index.tsx tests", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<SignUp />);
    const form = wrapper.find(Form);
    expect(form.exists()).toBe(true);
  });

  it("should default disable submitButton", () => {
    const wrapper = shallow(<SignUp />);
    const submitButton = wrapper.find(Form).find(TitleButton);
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("should run the submit function with proper error", () => {
    const wrapper = mount(<SignUp />);
    const form = wrapper.find(Form);
    expect(form.length).toBe(1);

    form.simulate("submit", {
      preventDefault: () => console.log("preventDefault"),
    });
  });
});
