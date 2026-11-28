const { test, expect } = require("@playwright/test");

test("customer, staff and supplier share one project and terrain editor works", async ({ page }) => {
  const api = "http://127.0.0.1:8787";
  await page.goto("http://127.0.0.1:4173/?api=" + encodeURIComponent(api));
  await expect(page.locator("#main")).toContainText("Uw project, helder in beeld", { timeout: 20000 });
  await expect(page.locator("#main")).toContainText("Uw bericht aan Thimo");
  await expect(page.locator("#contextSelect option")).toHaveCount(3);

  // The client chooses a project and changes the authoritative unit/floor brief.
  await page.locator("#contextSelect").selectOption("p-parkzicht");
  await page.locator("#clientBriefForm input[name=units]").fill("24");
  await page.locator("#clientBriefForm input[name=floors]").fill("3");
  await page.locator("#clientBriefForm button[type=submit]").click();
  await expect(page.locator("#clientBriefForm input[name=units]")).toHaveValue("24");
  await page.waitForTimeout(1200);
  await expect(page.locator("#main")).toContainText("3 bouwlagen");

  // Staff sees the same project and can edit its product cost components.
  await page.locator("#roleSelect").selectOption("staff");
  await expect(page.locator("#main")).toContainText("Goedemiddag, projectteam");
  await page.locator("#contextSelect").selectOption("p-parkzicht");
  await page.locator("#nav [data-page=products]").click();
  await expect(page.locator("#main")).toContainText("Financiën per unit en onderdeel");
  await expect(page.locator("#main [data-edit-cost]").first()).toBeVisible();

  // A staff-created task assigned to a supplier appears in that supplier's workspace.
  await page.locator("#nav [data-page=tasks]").click();
  await page.locator("#main [data-action=new-task]").click();
  await page.locator("#modal input[name=title]").fill("Browser test · montagecontrole");
  await page.locator("#modal select[name=projectId]").selectOption("p-parkzicht");
  await page.locator("#modal select[name=phase]").selectOption("5");
  await page.locator("#modal input[name=owner]").fill("Projectregie");
  await page.locator("#modal input[name=due]").fill("2026-12-15");
  await page.locator("#modal select[name=priority]").selectOption("Hoog");
  await page.locator("#modal select[name=status]").selectOption("Nog niet gestart");
  await page.locator("#modal select[name=supplierId]").selectOption("s-1");
  await page.locator("#modalSave").click();
  await expect(page.locator("#modal")).not.toBeVisible();
  await page.waitForTimeout(1400);

  await page.locator("#roleSelect").selectOption("supplier");
  await expect(page.locator("#main")).toContainText("Uw opdrachten");
  await page.locator("#nav [data-page=tasks]").click();
  await expect(page.locator("#main")).toContainText("Browser test · montagecontrole", { timeout: 10000 });

  // Customer can open the terrain editor, switch floors and drag a module.
  await page.locator("#roleSelect").selectOption("client");
  await expect(page.locator("#main")).toContainText("Kies uw standaardunit");
  await page.locator("#nav [data-page=design]").click();
  await expect(page.locator("#terrain svg")).toBeVisible();
  await expect(page.locator(".floor-tab")).toHaveCount(3);
  const unit = page.locator("#terrain [data-unit]").first();
  const before = await unit.getAttribute("transform");
  const rect = await unit.boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width / 2 + 45, rect.y + rect.height / 2 + 20, { steps: 6 });
  await page.mouse.up();
  await expect.poll(async () => unit.getAttribute("transform")).not.toBe(before);
  await page.locator(".floor-tab").nth(1).click();
  await expect(page.locator("#terrain [data-unit]")).toHaveCount(8);
});
