describe("Signin page", () => {
  test("set form elements [9WAimav2W8uqwKjNcjapi]", async () => {
    await page.goto(`${global.URL}/signin`);
    const action = await page.$eval(
      "[data-test=form]",
      el => (el as HTMLFormElement).action
    );
    const email = await page.$eval(
      "[data-test=input-email]",
      el => (el as HTMLInputElement).type
    );
    const password = await page.$eval(
      "[data-test=input-password]",
      el => (el as HTMLInputElement).type
    );
    expect(action).toBe(`${global.URL}/signin`);
    expect(email).toBe("email");
    expect(password).toBe("password");
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
      await page.goto(`${global.URL}/signin`);
    });
    test("display posts index page and already signed in message [ZD-JI66_9Lv4OXGNOOSBp]", async () => {
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
