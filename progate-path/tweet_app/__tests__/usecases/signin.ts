describe("Signin", () => {
  describe("submit success", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
    });
    test("display post index page and dialog message [zsq4Sv5XWq5PwTRMmV4hW]", async () => {
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(page.url()).toBe(`${global.URL}/posts`);
      expect(message).toBe("ログインしました");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
    afterAll(async () => {
      await Promise.all([
        page.click("[data-test=header-link-signout]"),
        page.waitForNavigation(),
      ]);
    });
  });
  describe("submit failed", () => {
    beforeEach(async () => {
      await page.goto(`${global.URL}/signin`);
    });
    test("display empty error messages [zLWa1RyHZR8DH0ZYyNXwH]", async () => {
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-email]"),
      ]);
      const emailError = await page.$eval(
        "[data-test=error-email]",
        el => (el as HTMLElement).innerText
      );
      const passwordError = await page.$eval(
        "[data-test=error-password",
        el => (el as HTMLElement).innerText
      );
      expect(emailError).toBe("メールアドレスを入力してください");
      expect(passwordError).toBe("パスワードを入力してください");
    });

    test("display incorrect error message when email is wrong [7rV-nUPAOZGknKeeoqd8k]", async () => {
      await page.type("[data-test=input-email]", "incorrect@test.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-custom]"),
      ]);
      const incorrectError = await page.$eval(
        "[data-test=error-custom]",
        el => (el as HTMLElement).innerText
      );
      expect(incorrectError).toBe(
        "メールアドレスまたはパスワードが間違っています"
      );
    });

    test("display incorrect error message when password is wrong [q6ver29Xj6aTIWd55b_Bl]", async () => {
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "incorrect");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-custom]"),
      ]);
      const incorrectError = await page.$eval(
        "[data-test=error-custom]",
        el => (el as HTMLElement).innerText
      );
      expect(incorrectError).toBe(
        "メールアドレスまたはパスワードが間違っています"
      );
    });
  });
});
