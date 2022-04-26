describe("Post update", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
    await page.type("[data-test=input-email]", "baby@prog-8.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=submit]"),
      page.waitForNavigation(),
    ]);
    await page.goto(`${global.URL}/posts/4`);
  });
  test("display post index page and dialog message [WBL_DAbxJG0KkpkqCR6tU]", async () => {
    await Promise.all([
      page.click("[data-test=submit-post-delete]"),
      page.waitForNavigation(),
    ]);
    const message = await page.$eval(
      "[data-test=dialog]",
      el => (el as HTMLElement).innerText
    );
    expect(message).toBe("投稿を削除しました");
    expect(page.url()).toBe(`${global.URL}/posts`);
    expect(await page.$("[data-test=post-4]")).toBeNull();
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
