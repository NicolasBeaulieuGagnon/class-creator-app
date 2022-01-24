import App from "./App";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "./components/NavBar";

configure({ adapter: new Adapter() });

describe("App.tsx tests", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    const div = wrapper.find("div");
    expect(div.childAt(1).text()).toBe("<NavBar />");
  });
});
