class LoginPage{
    constructor(page){
        this.page = page;
        this.userEmail = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        this.loginButton = this.page.locator("#login");
    }
    async OpenURL(url){
        await this.page.goto(url);
    }
    async loginToApplication(username, password){
        await this.userEmail.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        
        // await this.page.waitForLoadState('networkidle'); // wait for all network requests to finish(but this flaky)   
    }
}

module.exports = {LoginPage};