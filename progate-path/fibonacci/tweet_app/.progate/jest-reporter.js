class JestReporter {
  constructor(globalConfig, options) {
    this._testResults = new Map();
  }

  onTestCaseResult(t, result) {
    const extractJudgeId = title => {
      const matches = title.match(/\[(.*)\]$/);
      if (matches === null) return null;
      return matches[1];
    };
    const judgeId = extractJudgeId(result.title);
    if (judgeId === null) {
      throw new Error("No ID in the test's title: '" + result.title + "'");
    }
    const hasPassed = result.status === "passed";
    this._testResults.set(judgeId, hasPassed);
  }

  async onRunComplete() {
    console.log("Progate Jest Reporter submits the results to the server...");
    for (const [judgeId, hasPassed] of this._testResults.entries()) {
      console.log(judgeId, ":", hasPassed);
    }
    console.log("Done!");
  }
}

module.exports = JestReporter;
