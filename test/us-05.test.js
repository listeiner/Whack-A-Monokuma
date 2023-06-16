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

describe("US-05: startTimer() and updateTimer()", () => {
	beforeEach(async () => {
		page.on("console", onPageConsole);
		page.on("pageerror", (err) => console.log(err));
		await page.goto(baseURL, { waitUntil: "load" });
	  });
	
	it("should update timer every 1000 milliseconds ", async () => {
	  const startGamer = await page.evaluate(() => {
		window.startGame();
	  });
	  await page.waitForTimeout(1000);
	  const time = await page.evaluate(() => {
		return document.querySelector("#timer").innerHTML;
	  });
	  expect(Number(time)).toBeGreaterThan(0);
	});
  
	it("should call startTimer() in the startGame() function", async () => {
	  const startGame = await page.evaluate(() => {
		return window.startGame.toString();
	  });
	  expect(startGame).toContain("startTimer()");
	});
  });