import {expect, Page, Locator} from '@playwright/test';
export class LoginPage{
    page: Page
    userEmail: Locator
    password: Locator
    loginButton: Locator
    constructor(page: Page){
        this.page = page;
        this.userEmail = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        this.loginButton = this.page.locator("#login");
    }
    async OpenURL(url: string){
        await this.page.goto(url);
    }
    async loginToApplication(username: string, password: string){
        await this.userEmail.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        
        // await this.page.waitForLoadState('networkidle'); // wait for all network requests to finish(but this flaky)   
    }
}