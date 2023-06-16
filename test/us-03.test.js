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

describe("US-03: toggleVisibility()", () => {

	beforeEach(async () => {
		page.on("console", onPageConsole);
		page.on("pageerror", (err) => console.log(err));
		await page.goto(baseURL, { waitUntil: "load" });
	  });

	it("should use hole.classList.toggle to toggle the show class", async () => {
	  const toggle = await page.evaluate(() => {
		return window.toggleVisibility.toString();
	  });
	  expect(toggle).toContain("hole.classList.toggle");
	});
  
	it("should add the show class to a hole", async () => {
	  const toggle = await page.evaluate(() => {
		return window.toggleVisibility(window.holes[0]).classList;
	  });
	  expect(toggle['0']).toContain("hole");
	  expect(toggle['1']).toContain("show");
	});
  });
  
  describe("US-03: showUp()", () => {
  
	beforeEach(async () => {
		page.on("console", onPageConsole);
		page.on("pageerror", (err) => console.log(err));
		await page.goto(baseURL, { waitUntil: "load" });
	  });

	it("should use the toggleVisibility(hole) function inside showAndHide()", async () => {
	  const showAndHide = await page.evaluate(() => {
		return window.showAndHide.toString();
	  });
	  expect(showAndHide).toContain("toggleVisibility(hole)");
	});
  
	it("should return an id corresponding to the setTimeout function", async () => {
	  const showAndHide = await page.evaluate(() => {
		return window.showAndHide(window.holes[0],10);
	  });
	  expect(typeof showAndHide).toBe('number');
	});
  
	it("should use the setDelay(difficulty) function inside showUp()", async () => {
	  const showUp = await page.evaluate(() => {
		return window.showUp.toString();
	  });
	  expect(showUp).toContain("setDelay(difficulty)");
	});
  
	it("should use the chooseHole(holes) function inside showUp()", async () => {
	  const showUp = await page.evaluate(() => {
		return window.showUp.toString();
	  });
	  expect(showUp).toContain("chooseHole(holes)");
	});
  
	it("should return an id corresponding to the setTimeout function", async () => {
	  const showUp = await page.evaluate(() => {
		return window.showUp();
	  });
	  expect(typeof showUp).toBe('number');
	});
  });
  
  describe("US-03: startGame() and gameOver()", () => {
  
	beforeEach(async () => {
		page.on("console", onPageConsole);
		page.on("pageerror", (err) => console.log(err));
		await page.goto(baseURL, { waitUntil: "load" });
	  });

	it("should call showUp() from the startGame() function", async () => {
	  const startGame = await page.evaluate(() => {
		return window.startGame.toString();
	  });
	  expect(startGame).toContain("showUp()");
	});
  
	it('should return "game started"', async () => {
	  const startGame = await page.evaluate(() => {
		return window.startGame();
	  });
	  expect(startGame).toContain("game started");
	});
  
	it('should call showUp() when clicking the start button', async () => {
	  await page.click("button[id=start]");
	  const content = await page.content();
	  expect(content).toContain('hole show');
	});
  
	it("returns 'game stopped' if time = 0 // gameOver() function", async () => {
	  const gameOver = await page.evaluate(() => {
		window.setDuration(0);
		return window.gameOver();
	  });
	  expect(gameOver).toContain("game stopped");
	});
  
	it("returns the setTimeout ID if time > 0 // gameOver() function", async () => {
	  const gameOver = await page.evaluate(() => {
		window.setDuration(10);
		return window.gameOver();
	  });
	  // should return the setTimeout id because it calls showUp()
	  // and showUp() returns the setTimeout id.
	  expect(typeof gameOver).toBe('number');
	});
  });