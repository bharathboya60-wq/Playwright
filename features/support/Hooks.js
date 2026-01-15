import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { PageObjectManager as POM} from '../../PageObject/PageObjectManager.js';
import { chromium } from 'playwright';

Before(async function(){
    console.log("This is before hook - runs once before all tests");
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pom = new POM(this.page);
});

After(async function(){
    console.log("This is after hook - runs once after all tests");
});


AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        const screenshot = await this.page.screenshot('/screenshots/error.png');
    }
});