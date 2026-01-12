import {expect, Page, Locator} from '@playwright/test';
export class orders {
    page: Page
    Orders: Locator
    constructor(page: Page) {
        this.page = page; 
        this.Orders = this.page.locator("button[routerlink$='/dashboard/myorders']")
    }

    async ClickOrders(){
        await this.Orders.click();
        await this.page.locator("tbody").waitFor();
    }

    async ViewOrderById(orderId: string){
        const rows = await this.page.locator("tbody tr");
        const rowCount = await rows.count();
         let orderDetailsId:any;
        for(let i=0; i<rowCount; i++){
            let rowOrderId:any;
            rowOrderId = await rows.locator("th").nth(i).textContent();
            if(orderId.includes(rowOrderId)){
                await rows.locator("button:has-text('View')").nth(i).click();
                break;
            }
    }
        orderDetailsId = await this.page.locator(".col-text").textContent();
        expect(orderId.includes(orderDetailsId)).toBeTruthy();
        console.log("Order Details ID:", orderDetailsId);
}
}