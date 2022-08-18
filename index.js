const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pra.ufpr.br/ru/cardapio-ru-jardim-botanico/");

  const pageData = await page.evaluate(() => {
    return {
      data: Array.from(document.querySelectorAll("tr"), (tr) => tr.innerText).slice(0, 6),
    };
  });
  await browser.close();

  res.send({
    table: pageData.data,
  });
});

app.listen(3000);
