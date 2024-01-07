import { render } from "@testing-library/react"

import InterfaceFront from "./interface-front"

describe("InterfaceFront", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<InterfaceFront />)
		expect(baseElement).toBeTruthy()
	})
})
