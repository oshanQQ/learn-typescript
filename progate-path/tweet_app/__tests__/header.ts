describe("before sign in header", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
  });
  test("display header menu [NksqkQrHAzxeJt32ngFyW]", async () => {
    const logo = await page.$eval(
      "[data-test=header-logo]",
      el => (el as HTMLElement).innerText
    );
    const about = await page.$eval(
      "[data-test=header-link-about]",
      el => (el as HTMLElement).innerText
    );
    const signup = await page.$eval(
      "[data-test=header-link-signup]",
      el => (el as HTMLElement).innerText
    );
    const login = await page.$eval(
      "[data-test=header-link-signin]",
      el => (el as HTMLElement).innerText
    );
    expect(logo).toBe("TweetApp");
    expect(about).toBe("TweetAppとは");
    expect(signup).toBe("新規登録");
    expect(login).toBe("ログイン");
  });
});

describe("after sign in header", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/signin`);
    await page.type("[data-test=input-email]", "wanko@prog-8.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=submit]"),
      page.waitForNavigation(),
    ]);
  });
  test("display header menu [guVRfeCs8-A3GsfXYRC7p]", async () => {
    const logo = await page.$eval(
      "[data-test=header-logo]",
      el => (el as HTMLElement).innerText
    );
    const href = await page.$eval(
      "[data-test=header-logo]",
      el => (el as HTMLAnchorElement).href
    );
    const myPage = await page.$eval(
      "[data-test=header-link-mypage]",
      el => (el as HTMLElement).innerText
    );
    const postIndex = await page.$eval(
      "[data-test=header-link-posts-index]",
      el => (el as HTMLElement).innerText
    );
    const postNew = await page.$eval(
      "[data-test=header-link-posts-new]",
      el => (el as HTMLElement).innerText
    );
    const userIndex = await page.$eval(
      "[data-test=header-link-users-index]",
      el => (el as HTMLElement).innerText
    );
    const signout = await page.$eval(
      "[data-test=header-link-signout]",
      el => (el as HTMLInputElement).value
    );
    expect(logo).toBe("TweetApp");
    expect(href).toBe(`${global.URL}/posts`);
    expect(myPage).toBe("にんじゃわんこ");
    expect(postIndex).toBe("投稿一覧");
    expect(postNew).toBe("新規投稿");
    expect(userIndex).toBe("ユーザー一覧");
    expect(signout).toBe("ログアウト");
  });
  afterAll(async () => {
    await Promise.all([
      page.click("[data-test=header-link-signout]"),
      page.waitForNavigation(),
    ]);
  });
});
