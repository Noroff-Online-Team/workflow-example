import * as mocks from "../../../mocks";
import { logout } from "./logout";

describe("logout", () => {
  beforeEach(() => {
    global.localStorage = mocks.localStorageMock();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("clears the token from localstorage", () => {
    localStorage.setItem("token", mocks.accessToken);
    logout();
    expect(localStorage.getItem("token")).toBe(null);
  });
});
