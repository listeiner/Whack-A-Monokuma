jest.setTimeout(30000);
const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";

const msgs = [];
// Show logs from the page inside labeled container.
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
  msgs.push(msg.text());
};

describe("US-01: Basic Game Structure", () => {

  beforeEach(async () => {
    page.on("console", onPageConsole);
    page.on("pageerror", (err) => console.log(err));
    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("has a title e.g. <h1 id='title'>Whack-a-Mole!!</h1>", async () => {
    const title = await page.evaluate(() => {
      const title = document.querySelectorAll("#title");
      return title.length;
     });
    expect(title).not.toBeNull();
    expect(title).toEqual(1);
  });

  it("has 9 holes <div class='hole'>", async () => {
    const holes = await page.evaluate(() => {
      const h = document.querySelectorAll(".hole");
      return h.length;
     });
    expect(holes).not.toBeNull();
    expect(holes).toEqual(9);
  });

  it("has 9 moles <div class='mole'>", async () => {
    const moles = await page.evaluate(() => {
      const m = document.querySelectorAll(".mole");
      return m.length;
     });
    expect(moles).not.toBeNull();
    expect(moles).toEqual(9);
  });

  it("has a 'start' button <button id='start'>start</button>", async () => {
    const start = await page.evaluate(() => {
      const startButton = document.querySelectorAll("#start");
      return startButton.length;
     });
    expect(start).not.toBeNull();
    expect(start).toEqual(1);
  });

  it("has a 'score' <span id='score'>0</span>", async () => {
    const score = await page.evaluate(() => {
      const score = document.querySelectorAll("#score");
      return score.length;
     });
    expect(score).not.toBeNull();
    expect(score).toEqual(1);
  });

  it("has a 'timer' <span id='timer'>0</span>", async () => {
    const timer = await page.evaluate(() => {
      const timer = document.querySelectorAll("#timer");
      return timer.length;
     });
    expect(timer).not.toBeNull();
    expect(timer).toEqual(1);
  });
});