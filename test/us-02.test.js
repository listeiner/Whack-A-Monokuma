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
  
  describe("US-02: randomInteger()", () => {
	it("should return a number between 0 - 10 if randomInteger(0, 10)", async () => {
	  const randomInteger = await page.evaluate(() => {
		return window.randomInteger(0,10);
	  });
	  expect(randomInteger).toBeGreaterThanOrEqual(0);
	  expect(randomInteger).toBeLessThanOrEqual(10);
	});
  
	it("should return a number between 600 - 1200 if randomInteger(600, 1200)", async () => {
	  const randomInteger = await page.evaluate(() => {
		return window.randomInteger(600,1200);
	  });
	  expect(randomInteger).toBeGreaterThanOrEqual(600);
	  expect(randomInteger).toBeLessThanOrEqual(1200);
	});
  
  });
  
  describe("US-02: setDelay()", () => {
	it("should return 1500 if setDelay('easy')", async () => {
	  const delay = await page.evaluate(() => {
		return window.setDelay("easy");
	  });
	  expect(delay).toEqual(1500);
	});
  
	it("should return 1000 if setDelay('normal')", async () => {
	  const delay = await page.evaluate(() => {
		return window.setDelay("normal");
	  });
	  expect(delay).toEqual(1000);
	});
  
	it("should return a random integer between 600 - 1200 if setDelay('hard')", async () => {
	  const delay = await page.evaluate(() => {
		return window.setDelay("hard");
	  });
	  expect(delay).toBeGreaterThanOrEqual(600);
	  expect(delay).toBeLessThan(1200);
	});
  });
  
  describe("US-02: chooseHole()", () => {
	it("should have a working chooseHole() function that chooses a hole randomly", async () => {
	  const hole = await page.evaluate(() => {
		const holes = document.querySelectorAll(".hole");
		const hole = window.chooseHole(holes);
		return hole.classList;
	  });
	  expect(hole['0']).toEqual("hole");
	});
  });