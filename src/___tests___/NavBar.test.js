import React from "react";
import NavBar from "../components/common/navBar/NavBar";
import { render } from "@testing-library/react";
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;


describe('NavBar component', ()=>{
  it("NavBar powinien się renderować", ()=>{
    const { getByText } = render(<NavBar />);
    const linkElement = getByText("HELLO",i);
    expect(linkElement).toBeInTheDocument();
  });
});
