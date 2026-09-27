import { test, expect, type Page } from "@playwright/test";
import { letters } from "../src/data/letters";

async function unlock(page: Page) {
  await page.goto("/");
  await page.getByLabel("Clave").fill("03042004");
  await page.getByRole("button", { name: "Abrir caja de cartas" }).click();
  await expect(page.getByRole("heading", { name: "Cartas de Emily" })).toBeVisible();
}

test("password feedback, access persistence, and locking", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Clave").fill("12345678");
  await page.getByRole("button", { name: "Abrir caja de cartas" }).click();
  await expect(page.getByText("Esa no es nuestra clave 👀")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cartas de Emily" })).toHaveCount(0);
  await page.getByLabel("Clave").fill("03042004");
  await page.getByRole("button", { name: "Abrir caja de cartas" }).click();
  await expect(page.getByText("0 de 13 cartas abiertas")).toBeVisible();
  await page.reload();
  await expect(page.getByText("0 de 13 cartas abiertas")).toBeVisible();
  await page.getByRole("button", { name: "Bloquear cartas" }).click();
  await expect(page.getByLabel("Clave")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Clave")).toBeVisible();
});

test("all 13 letters display their content, open repeatedly, and remember progress", async ({ page }) => {
  test.setTimeout(60_000);
  await unlock(page);
  await expect(page.locator("button.envelope")).toHaveCount(13);
  for (const [index, letter] of letters.entries()) {
    expect(letter.content.trim()).not.toBe("");
    await page.getByRole("button", { name: letter.title, exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: letter.title })).toBeVisible();
    await expect(page.locator(".letter-text").first()).toHaveText(letter.content);
    await expect(page.locator(".empty-letter")).toHaveCount(0);
    await page.getByRole("button", { name: "Cerrar carta" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByText(`${index + 1} de 13 cartas abiertas`)).toBeVisible();
  }
  await page.reload();
  await expect(page.getByText("13 de 13 cartas abiertas")).toBeVisible();
  await page.getByRole("button", { name: `${letters[0].title}, abierta anteriormente` }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByText("13 de 13 cartas abiertas")).toBeVisible();
  await expect(page.locator("button.envelope")).toHaveCount(13);
});

test("dialog traps and restores focus, closes outside and with Escape", async ({ page }) => {
  await unlock(page);
  const first = page.locator("button.envelope").first();
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Cerrar carta" })).toBeFocused();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Cerrar carta" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".letter-paper")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(first).toBeFocused();
  await first.click();
  await page.locator(".modal-backdrop").click({ position: { x: 3, y: 150 } });
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("corrupt or unavailable storage does not prevent reading", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("openWhen_authenticated", '"not-a-boolean"');
    localStorage.setItem("openWhen_openedLetters", '{broken');
    Storage.prototype.setItem = () => { throw new DOMException("Unavailable", "SecurityError"); };
  });
  await unlock(page);
  await expect(page.getByText("Tu navegador no permite guardar los cambios.", { exact: false })).toBeVisible();
  await page.locator("button.envelope").first().click();
  await page.getByRole("button", { name: "Cerrar carta" }).click();
  await expect(page.getByText("1 de 13 cartas abiertas")).toBeVisible();
});

test("layout fits small phones, tablets and desktop", async ({ page }, testInfo) => {
  await unlock(page);
  for (const width of [320, 390, 600, 820, 1280, 1536]) {
    await page.setViewportSize({ width, height: 850 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator("button.envelope").first().click();
    const bounds = await page.locator(".letter-paper").boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(850);
    const paper = page.locator(".letter-paper");
    expect(await paper.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    await paper.evaluate((element) => { element.scrollTop = element.scrollHeight; });
    await expect(page.locator(".paper-bottom")).toBeInViewport();
    await page.getByRole("button", { name: "Cerrar carta" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await page.setViewportSize(testInfo.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1280, height: 900 });
  await page.screenshot({ path: testInfo.outputPath("collection.png"), fullPage: true });
});

test("moon journey loops, pauses and resumes, and respects reduced motion", async ({ page }, testInfo) => {
  await unlock(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Ábreme cuando quieras saber cuánto te amo", exact: true }).click();
  const rocket = page.locator(".journey-rocket");
  await expect(page.getByRole("img", { name: /De la Tierra a la Luna y de vuelta/ })).toBeVisible();
  const initial = await rocket.getAttribute("style");
  await expect.poll(() => rocket.getAttribute("style")).not.toBe(initial);
  await page.getByRole("button", { name: "Pausar viaje" }).click();
  const stopped = await rocket.getAttribute("style");
  await page.waitForTimeout(250);
  expect(await rocket.getAttribute("style")).toBe(stopped);
  await page.getByRole("button", { name: "Reanudar viaje" }).click();
  await expect.poll(() => rocket.getAttribute("style")).not.toBe(stopped);
  // Observe more than one full 12-second orbit and both ends of the route.
  const positions = await rocket.evaluate(async (element) => {
    const samples: number[] = [];
    for (let i = 0; i < 27; i++) {
      samples.push(new DOMMatrix(getComputedStyle(element).transform).m41);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return samples;
  });
  expect(Math.min(...positions)).toBeLessThan(100);
  expect(Math.max(...positions)).toBeGreaterThan(330);
  expect(positions.slice(15).some((x) => x < 180)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("moon-journey.png") });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: /Ábreme cuando quieras saber cuánto te amo/ }).click();
  await expect(page.getByRole("button", { name: "Pausar viaje" })).toHaveCount(0);
  const still = await rocket.getAttribute("style");
  await page.waitForTimeout(250);
  expect(await rocket.getAttribute("style")).toBe(still);
});

test("full motion opens and reverses without browser errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.screenshot({ path: testInfo.outputPath("access.png"), fullPage: true });
  await page.getByLabel("Clave").fill("03042004");
  await page.getByRole("button", { name: "Abrir caja de cartas" }).click();
  await expect(page.getByText("0 de 13 cartas abiertas")).toBeVisible();
  await page.locator("button.envelope").first().click();
  await expect(page.locator(".letter-paper")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("open-letter.png") });
  await page.getByRole("button", { name: "Cerrar carta" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});
