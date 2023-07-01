import React from "react";
import renderer from "react-test-renderer";
import Button from "../../src/components/Button";

describe("<Button />", () => {
    it('renders correctly across screens', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// run npm run test to run all .test.js files.