describe("Top page", () => {
  beforeAll(async () => {
    await page.goto(`${global.URL}/`);
  });
  test("display UVP [QxVsMj44Kp55FxSxcIrfl]", async () => {
    const heading = await page.$eval(
      "[data-test=heading]",
      el => (el as HTMLElement).innerText
    );
    const paragraph = await page.$eval(
      "[data-test=paragraph]",
      el => (el as HTMLElement).innerText
    );
    expect(heading).toBe("つぶやきで、世界はつながる");
    expect(paragraph).toBe("今の気持ちをつぶやいてみよう！");
  });
});
