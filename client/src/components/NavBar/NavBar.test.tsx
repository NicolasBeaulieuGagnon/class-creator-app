import NavBar from "./index";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("NavBar.tsx tests", () => {
  const wrapper = shallow(<NavBar />);

  it("should contain Class Creator", () => {
    expect(wrapper.childAt(0).text()).toEqual("Class Creator");
  });
});
