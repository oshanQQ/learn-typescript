describe("Post update", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
    await page.type("[data-test=input-email]", "wanko@prog-8.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=submit]"),
      page.waitForNavigation(),
    ]);
  });
  beforeEach(async () => {
    await page.goto(`${global.URL}/posts/7/edit`);
  });
  describe("submit success", () => {
    test("display post index page and dialog message [JY9O5qhu2x7FlZ116hRrZ]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "update content")
      );
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      const content = await page.$eval(
        "[data-test=post-7] [data-test=post-item-content]",
        el => (el as HTMLElement).innerText
      );
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(message).toBe("投稿を編集しました");
      expect(page.url()).toBe(`${global.URL}/posts`);
      expect(content).toBe("update content");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
  describe("submit failed", () => {
    test("display empty error message [XYDQwwwtuOhKIlZ0Po_bT]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "")
      );
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-content]"),
      ]);
      const message = await page.$eval(
        "[data-test=error-content]",
        el => (el as HTMLElement).innerText
      );
      expect(message).toBe("コンテンツを入力してください");
    });
  });
  afterAll(async () => {
    await Promise.all([
      page.click("[data-test=header-link-signout]"),
      page.waitForNavigation(),
    ]);
  });
});
