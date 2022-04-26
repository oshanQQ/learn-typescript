describe("Post create", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
    await page.type("[data-test=input-email]", "8@prog-8.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=submit]"),
      page.waitForNavigation(),
    ]);
  });
  beforeEach(async () => {
    await page.goto(`${global.URL}/posts/new`);
  });
  describe("submit success", () => {
    test("display post index page and dialog message [um_uej6dYy4jNAOecEUoc]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "test content")
      );
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      const content = await page.$eval("[data-test=posts-container]", el => {
        return (
          el.firstElementChild?.querySelector(
            "[data-test=post-item-content]"
          ) as HTMLElement
        ).innerText;
      });
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(page.url()).toBe(`${global.URL}/posts`);
      expect(message).toBe("投稿を作成しました");
      expect(content).toBe("test content");
    });
  });
  describe("submit failed", () => {
    test("display empty error message [ug76mtRMLDv30YJ_HdH87]", async () => {
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForSelector("[data-test=error-content]"),
      ]);
      const content = await page.$eval(
        "[data-test=error-content]",
        el => (el as HTMLElement).innerText
      );
      expect(content).toBe("コンテンツを入力してください");
    });
  });
  afterAll(async () => {
    await Promise.all([
      page.click("[data-test=header-link-signout]"),
      page.waitForNavigation(),
    ]);
  });
});
