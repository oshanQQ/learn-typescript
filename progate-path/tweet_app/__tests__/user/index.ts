describe("User index page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/users`);
    });
    test("display user list [JDwQzgXC5CV2-6lfzRAEW]", async () => {
      const userImageCount = await page.$$eval(
        "[data-test=user-item-image]",
        els => els.length
      );
      const userLinkCount = await page.$$eval(
        "[data-test=user-item-link]",
        els => els.length
      );
      expect(userImageCount).toEqual(userLinkCount);
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
      await page.goto(`${global.URL}/users`);
    });
    test("display sign in required error [dlTjyJ4m5iIgZBBhAur_V]", async () => {
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
