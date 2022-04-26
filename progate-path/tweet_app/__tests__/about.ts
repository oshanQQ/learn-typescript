describe("About page", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/about`);
  });

  test("display heading and paragraph and image [U25NRLdrslzRdm5ARyn3X]", async () => {
    const heading = await page.$eval(
      "[data-test=heading]",
      el => (el as HTMLElement).innerText
    );
    const paragraph = await page.$eval(
      "[data-test=paragraph]",
      el => (el as HTMLElement).innerText
    );
    const src = await page.$eval(
      "[data-test=image]",
      el => (el as HTMLImageElement).src
    );
    expect(heading).toBe("TweetAppとは");
    expect(paragraph).toBe(
      "SNSサービスです。近況やつぶやきを投稿し、他のユーザーと楽しくコミュニケーションできます。"
    );
    expect(src).toBe(`${global.URL}/image/tweets.png`);
  });
});
