describe("Post new page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/posts/new`);
    });
    test("set form elements [nbnNJ3T3ptEGR_fQItZpm]", async () => {
      const action = await page.$eval(
        "[data-test=form]",
        el => (el as HTMLFormElement).action
      );
      const content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLInputElement).type
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(action).toBe(`${global.URL}/posts/create`);
      expect(content).toBe("textarea");
      expect(value).toBe("投稿");
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
      await page.goto(`${global.URL}/posts/new`);
    });
    test("display sign in required error [f-m_Tsxw_JZMgr7axbxLc]", async () => {
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
