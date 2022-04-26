describe("Unlike post", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
    await page.type("[data-test=input-email]", "wanko@prog-8.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=submit]"),
      page.waitForNavigation(),
    ]);
  });
  test("the icon will turn white and the count will decrease by one [oqezHyX4muwkoVjyAaXuf]", async () => {
    await Promise.all([
      page.goto(`${global.URL}/posts/5`),
      page.waitForSelector("[data-test=submit-like]"),
    ]);

    await Promise.all([
      page.click("[data-test=submit-like]"),
      page.waitForNavigation(),
    ]);
    const action = await page.$eval(
      "[data-test=form-like]",
      el => (el as HTMLFormElement).action
    );
    const icon = await page.$eval(
      "[data-test=favorite-icon]",
      el => (el as HTMLElement).innerText
    );
    const count = await page.$eval(
      "[data-test=like-count]",
      el => (el as HTMLElement).innerText
    );
    expect(action).toBe(`${global.URL}/likes/5/create`);
    expect(icon).toBe("favorite_border");
    expect(count).toBe("2");
  });
  afterAll(async () => {
    await Promise.all([
      page.click("[data-test=header-link-signout]"),
      page.waitForNavigation(),
    ]);
  });
});
