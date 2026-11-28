const { test, expect } = require("@playwright/test");

test("customer, staff and supplier share one project and terrain editor works", async ({ page }) => {
  test.setTimeout(120000);
  page.on("console", msg => console.log("BROWSER", msg.type(), msg.text()));
  page.on("pageerror", err => console.log("PAGEERROR", err.message));
  page.on("requestfailed", req => console.log("REQUESTFAILED", req.url(), req.failure()?.errorText));
  const api = "http://127.0.0.1:8787";
  await page.route("https://fonts.googleapis.com/**", route => route.abort());
  await page.route("https://fonts.gstatic.com/**", route => route.abort());
  await page.goto("http://127.0.0.1:4173/?api=" + encodeURIComponent(api), { waitUntil: "domcontentloaded", timeout: 30000 });
  await expect(page.locator("#main")).toContainText("Uw bericht aan Thimo", { timeout: 30000 });
  await expect(page.locator("#thimoChatPanel")).toBeVisible();
  await expect(page.locator("#chatInput")).toBeVisible();
  console.log("CHECKPOINT client loaded");
  // init() renders the client shell before the asynchronous /api/auth and /api/state handshake completes.
  // Wait for the central session before testing chat; otherwise bindChat correctly rejects the request.
  await page.waitForFunction(() => { try { return JSON.parse(localStorage.getItem("thimo365-next") || "{}").remoteStatus === "connected"; } catch { return false; } }, null, { timeout: 30000 });
  await expect(page.locator("#main")).toContainText("Uw bericht aan Thimo");
  await page.route("**/api/chat", route => route.fulfill({status:200, contentType:"application/json", body:JSON.stringify({answer:"Thimo testantwoord", proposal:"Testvoorstel voor Parkzicht"})}));
  await page.locator("#chatInput").fill("Kan er een extra entree komen?");
  await page.locator("#chatInput").press("Enter");
  await expect(page.locator("#chatLog")).toContainText("Thimo testantwoord");
  await expect(page.locator("#proposalText")).toContainText("Testvoorstel voor Parkzicht");
  await expect(page.locator("#contextSelect option")).toHaveCount(3);

  // The client chooses a project and changes the authoritative unit/floor brief.
  await page.locator("#clientBriefForm input[name=units]").fill("24");
  await page.locator("#clientBriefForm input[name=floors]").fill("3");
  await page.locator("#clientBriefForm button[type=submit]").click();
  await expect(page.locator("#clientBriefForm input[name=units]")).toHaveValue("24");
  await page.waitForTimeout(1200);
  await expect(page.locator("#clientBriefForm input[name=floors]")).toHaveValue("3");

  // Staff sees the same project and can edit its product cost components.
  await page.locator("#roleSelect").selectOption("staff");
  await expect(page.locator("#main")).toContainText("Goedemiddag, projectteam", {timeout:30000});
  console.log("CHECKPOINT staff loaded");
  await page.locator("#nav [data-page=cockpit]").evaluate(el => el.click());
  await expect(page.locator("#main")).toContainText("Projectcockpit");
  await page.locator("#contextSelect").selectOption("p-parkzicht");
  await page.locator("#nav [data-page=products]").evaluate(el => el.click());
  await expect(page.locator("#main")).toContainText("Financiën per unit en onderdeel");
  await expect(page.locator("#main [data-edit-cost]").first()).toBeVisible();
  await page.locator("#main [data-edit-cost]").first().click();
  await page.locator("#modal input[name=cost]").fill("12345");
  await page.locator("#modalSave").click();
  await expect(page.locator("#modal")).not.toBeVisible();
  await page.locator("#main [data-edit-cost]").first().click();
  await expect(page.locator("#modal input[name=cost]")).toHaveValue("12345");
  await page.locator("#modal .modal-close").click();

  // A staff-created task assigned to a supplier appears in that supplier's workspace.
  await page.locator("#nav [data-page=tasks]").evaluate(el => el.click());
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
  await page.waitForTimeout(3000);

  await page.locator("#roleSelect").selectOption("supplier");
  await expect(page.locator("#main")).toContainText("Uw opdrachten", {timeout:30000});
  console.log("CHECKPOINT supplier loaded");
  await page.locator("#nav [data-page=tasks]").click();
  await expect(page.locator("#main")).toContainText("Browser test · montagecontrole", { timeout: 10000 });

  // Customer can open the terrain editor, switch floors and drag a module.
  await page.locator("#roleSelect").selectOption("client");
  await expect(page.locator("#main")).toContainText("Kies uw standaardunit");
  await page.locator("#nav [data-page=design]").evaluate(el => el.click());
  await expect(page.locator("#terrain svg")).toBeVisible({timeout:30000});
  console.log("CHECKPOINT terrain loaded");
  await expect(page.locator(".floor-tab")).toHaveCount(3);
  // The terrain editor cannot silently change the Step 1 total.
  await page.locator("#main [data-action=add-unit]").click();
  await expect(page.locator("#main h2")).toContainText("24 units");
  const floorCounts = async () => (await page.locator(".floor-tab").allTextContents()).reduce((sum, label) => sum + Number((label.match(/·\s*(\d+) units/) || [])[1] || 0), 0);
  await expect.poll(floorCounts).toBe(24);
  // Adding a floor reallocates an existing unit instead of creating a 25th unit.
  await page.locator("#main [data-action=add-floor]").click();
  await expect(page.locator(".floor-tab")).toHaveCount(4);
  await expect.poll(floorCounts).toBe(24);
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
