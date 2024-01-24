import * as mocks from "../../../mocks";
import { login } from "./login";
import { load } from "../../storage";

describe("login", () => {
  beforeEach(() => {
    global.fetch = mocks.createMockFetch();
    global.localStorage = mocks.localStorageMock();
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.localStorage.clear();
  });

  it("should set the token with a successful login", async () => {
    global.fetch = mocks.createMockFetch(mocks.authResponse);
    await login(mocks.userData.email, mocks.userData.password);
    expect(load("token")).toBe(mocks.accessToken);
  });
});
