import {expect, Locator} from '@playwright/test';
import { Page } from '@playwright/test';
export class Cart{
    Checkout: Locator
    page: Page;
    constructor(page: Page){
        this.page = page;
        this.Checkout = this.page.locator("button:has-text(\"Checkout\")")

    }
    
    async VerifyProductInCart(product: string){
        const visible = await this.page.locator(`h3:has-text('${product}')`).isVisible(); // verifying product is visible in cart page.
        console.log("Visible:", visible);
        return visible;
    }

    async ProceedToCheckout(){
        await this.Checkout.click();
    }

    async SelectCountry(countryPartial: string, countryFull: string){
        await this.page.locator("[placeholder='Select Country']").pressSequentially(countryPartial, {delay:100}); // typing Ind with delay of 100ms between each key press
            const dropdown = await this.page.locator(".ta-results").waitFor(); // wait for the dropdown to appear
            const optionsCount = await this.page.locator(".ta-results button").count();
            for(let i=0; i<optionsCount; i++){
                const text = await this.page.locator(".ta-results button").nth(i).textContent();
                if(text === countryFull){
                    await this.page.locator(".ta-results button").nth(i).click();
                    break;
                }
            }  
}
    async ValidateMail(expectedMail: string){
        const DetailText = await this.page.locator(".user__name label").textContent();
        return DetailText === expectedMail;
    }

    async GetOrderId(){
        await this.page.locator(".action__submit").click();
        await expect(await this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log("Order ID:", orderId);
        return orderId;
}
}