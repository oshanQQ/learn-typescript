describe("User new page", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signup`);
  });
  test("set form elements [S0sS5UVuqzdb0QsROcViQ]", async () => {
    const action = await page.$eval(
      "[data-test=form]",
      el => (el as HTMLFormElement).action
    );
    const name = await page.$eval(
      "[data-test=input-name]",
      el => (el as HTMLInputElement).name
    );
    const email = await page.$eval(
      "[data-test=input-email]",
      el => (el as HTMLInputElement).name
    );
    const password = await page.$eval(
      "[data-test=input-password]",
      el => (el as HTMLInputElement).name
    );
    const value = await page.$eval(
      "[data-test=submit]",
      el => (el as HTMLInputElement).value
    );
    expect(action).toBe(`${global.URL}/users/create`);
    expect(name).toBe("name");
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(value).toBe("新規登録");
  });
  describe("already signed in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/signup`);
    });
    test("display posts index page and already signed in message [2ba4jmMeeDyfd3mvO5UnO]", async () => {
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(message).toBe("すでにログインしています");
      expect(page.url()).toBe(`${global.URL}/posts`);
    });
    afterAll(async () => {
      await Promise.all([
        page.click("[data-test=header-link-signout]"),
        page.waitForNavigation(),
      ]);
    });
  });
});
