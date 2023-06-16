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

describe("US-04: updateScore() and clearScore()", () => {

	beforeEach(async () => {
	  page.on("console", onPageConsole);
	  page.on("pageerror", (err) => console.log(err));
	  await page.goto(baseURL, { waitUntil: "load" });
	});

	it("should increment score when calling updateScore()", async () => {
	  let content = await page.content();
	  expect(content).toContain('<span id="score">0</span>');
	  const points = await page.evaluate(() => {
		return window.updateScore();
	  });
	  expect(points).toEqual(1);
	  content = await page.content();
	  expect(content).toContain('<span id="score">1</span>');
	});
  
	it("should clear score when calling clearScore()", async () => {
	  const points = await page.evaluate(() => {
		window.points = 9;
		return window.clearScore();
	  });
	  expect(points).toEqual(0);
	  const content = await page.content();
	  expect(content).toContain('<span id="score">0</span>');
	});
  });
  
describe("US-04 whack()", () => {

beforeEach(async () => {
	page.on("console", onPageConsole);
	page.on("pageerror", (err) => console.log(err));
	await page.goto(baseURL, { waitUntil: "load" });
	});

it("should have updateScore() inside of whack()", async () => {
	const whack = await page.evaluate(() => {
	return window.whack.toString();
	});
	expect(whack).toContain("updateScore()");
});

it("should increment score when calling whack()", async () => {
	let content = await page.content();
	expect(content).toContain('<span id="score">0</span>');
	const points = await page.evaluate(() => {
	return window.whack();
	});
	expect(points).toEqual(1);
	content = await page.content();
	expect(content).toContain('<span id="score">1</span>');
});

it("should call setEventListeners() in the startGame() function", async () => {
	const startGame = await page.evaluate(() => {
	return window.startGame.toString();
	});
	expect(startGame).toContain("setEventListeners()");
});

it("should increment score when clicking on mole", async () => {
	const points = await page.evaluate(() => {
	window.startGame();
	const mole = document.querySelectorAll(".mole")[0];
	mole.click();
	const points = document.querySelector("#score").innerHTML;
	return points;
	});
	expect(points).toEqual("1");
});
});