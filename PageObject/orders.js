import {expect} from '@playwright/test';
class orders {
    constructor(page) {
        this.page = page; 
        this.Orders = this.page.locator("button[routerlink$='/dashboard/myorders']")
    }

    async ClickOrders(){
        await this.Orders.click();
        await this.page.locator("tbody").waitFor();
    }

    async ViewOrderById(orderId){
        const rows = await this.page.locator("tbody tr");
        const rowCount = await rows.count();

        for(let i=0; i<rowCount; i++){
            const rowOrderId = await rows.locator("th").nth(i).textContent();
            if(orderId.includes(rowOrderId)){
                await rows.locator("button:has-text('View')").nth(i).click();
                break;
            }
    }
        const orderDetailsId = await this.page.locator(".col-text").textContent();
        expect(orderId.includes(orderDetailsId)).toBeTruthy();
        console.log("Order Details ID:", orderDetailsId);
}
}

module.exports = {orders};