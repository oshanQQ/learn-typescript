describe("Post edit page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/posts/1/edit`);
    });
    test("set form elements [QxVsMj44Kp55FxSxcIrfl]", async () => {
      const action = await page.$eval(
        "[data-test=form]",
        el => (el as HTMLFormElement).action
      );
      const content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLInputElement).value
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(action).toBe(`${global.URL}/posts/1/update`);
      expect(content).toBe("次は何の本を読もうかな。");
      expect(value).toBe("保存");
    });
    test("display no authorization error [u_wyAolNGjYTZu88IGFbL]", async () => {
      await page.goto(`${global.URL}/posts/2/edit`);
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(page.url()).toBe(`${global.URL}/posts`);
      expect(message).toBe("権限がありません");
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
  describe("before sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/posts/1/edit`);
    });
    test("display sign in required error [w65LXlQ0bzwrMMJ4t888d]", async () => {
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(page.url()).toBe(`${global.URL}/signin`);
      expect(message).toBe("ログインが必要です");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
});
