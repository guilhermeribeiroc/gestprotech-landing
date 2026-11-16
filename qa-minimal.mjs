import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge'});
try {
 for(const width of [375,1440]){
  const page=await browser.newPage({viewport:{width,height:950},reducedMotion:'reduce'});
  await page.clock.install({time:new Date('2026-11-15T12:00:00-03:00')});
  await page.goto('http://127.0.0.1:5173');
  await page.locator('.minimal-hero').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.equal(await page.locator('.minimal-banner').count(),1);
  await page.screenshot({path:'preview/minimal-'+width+'.png',fullPage:true});
  await page.getByRole('button',{name:'Escolher Horizonte'}).click();
  await page.getByLabel('Cartão em 8x',{exact:true}).check();
  assert(await page.locator('dialog').getByText('8x de R$ 220,39',{exact:true}).isVisible());
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Fechar faixa promocional'}).click();
  assert.equal(await page.locator('.minimal-banner').count(),0);
  await page.clock.setSystemTime(new Date('2026-12-01T00:00:00-03:00'));
  await page.clock.runFor(1100);
  assert.equal(await page.locator('#black-friday').count(),0);
  assert.equal(await page.locator('.plans-grid article').count(),4);
  await page.close();
 }
 console.log('PASS: mobile/desktop, banner, card selection, Escape, expiry.');
}finally{await browser.close();}
