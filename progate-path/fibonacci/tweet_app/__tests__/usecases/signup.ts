describe("Signup", () => {
  describe("submit success", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signup`);
      await page.type("[data-test=input-name]", "ninjawanko");
      await page.type("[data-test=input-email]", "test@example.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
    });
    test("display created user show page and dialog message [9IZKM2fsK49afkor00ib_]", async () => {
      const name = await page.$eval(
        "[data-test=user-name]",
        el => (el as HTMLElement).innerText
      );
      const email = await page.$eval(
        "[data-test=user-email]",
        el => (el as HTMLElement).innerText
      );
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(message).toBe("ユーザー登録が完了しました");
      expect(name).toBe("ninjawanko");
      expect(email).toBe("test@example.com");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
    test("sign in with the password user created [9IZKM2fsK49afkor00ib_]", async () => {
      await Promise.all([
        page.click("[data-test=header-link-signout]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "test@example.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
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
      await page.goto(`${global.URL}/signup`);
    });
    test("display empty error messages [SNcuiqwSmyuSz-DsFzzSV]", async () => {
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-name]"),
      ]);
      const nameError = await page.$eval(
        "[data-test=error-name]",
        el => (el as HTMLElement).innerText
      );
      const emailError = await page.$eval(
        "[data-test=error-email]",
        el => (el as HTMLElement).innerText
      );
      const passwordError = await page.$eval(
        "[data-test=error-password",
        el => (el as HTMLElement).innerText
      );
      expect(nameError).toBe("ユーザー名を入力してください");
      expect(emailError).toBe("メールアドレスを入力してください");
      expect(passwordError).toBe("パスワードを入力してください");
    });
    test("display email already exists error messages [Mf6g_VV0zyOkcn0jY6wR-]", async () => {
      await page.type("[data-test=input-name]", "ninjawanko");
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-email]"),
      ]);
      const emailError = await page.$eval(
        "[data-test=error-email]",
        el => (el as HTMLElement).innerText
      );
      expect(emailError).toBe("メールアドレスはすでに存在します");
    });
  });
});
