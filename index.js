const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pra.ufpr.br/ru/cardapio-ru-jardim-botanico/");

  const pageData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("td"), (td) => td.innerHTML).slice(0, 6);

    const oddOnes = [],
      evenOnes = [];
    for (let i = 0; i < rows.length; i++) (i % 2 == 0 ? evenOnes : oddOnes).push(rows[i]);

    // const infoMealsContent = infoMealsTd.map((content = content.innerText));

    return {
      dataHeaders: evenOnes,
      dataMeals: oddOnes,
    };
  });

  await browser.close();

  res.send({
    headers: pageData.dataHeaders,
    meals: pageData.dataMeals,
  });
});

app.listen(3000);
