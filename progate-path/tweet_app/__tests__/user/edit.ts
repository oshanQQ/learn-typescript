describe("User edit page", () => {
  describe("sign in with correct user", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "wanko@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await page.goto(`${global.URL}/users/1/edit`);
    });
    test("set form values [j09d7KZm4iIOL7N6BAv6_]", async () => {
      const action = await page.$eval(
        "[data-test=form]",
        el => (el as HTMLFormElement).action
      );
      const name = await page.$eval(
        "[data-test=input-name]",
        el => (el as HTMLInputElement).value
      );
      const email = await page.$eval(
        "[data-test=input-email]",
        el => (el as HTMLInputElement).value
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(action).toBe(`${global.URL}/users/1/update`);
      expect(name).toBe("にんじゃわんこ");
      expect(email).toBe("wanko@prog-8.com");
      expect(value).toBe("保存");
    });
    test("display image file input [jdrvS18jqzJJ5RcsFHKMQ]", async () => {
      const imageInputType = await page.$eval(
        "[data-test=input-image]",
        el => (el as HTMLInputElement).type
      );
      expect(imageInputType).toBe("file");
    });
    test("display no authorization error [opLjiQLEUJHJs471IpZjw]", async () => {
      await page.goto(`${global.URL}/users/2/edit`);
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
      await page.goto(`${global.URL}/users/1/edit`);
    });
    test("display sign in required error [fQRz9xthPhsNUMqm24Wcs]", async () => {
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
