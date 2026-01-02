import {LoginPage} from './LoginPage.js';
import {Dashboard} from './Dashboard.js';
import { Cart } from './Cart.js';
import { orders } from './orders.js';

class PageObjectManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboard = new Dashboard(this.page);
        this.cartPage = new Cart(this.page);
        this.Orders = new orders(this.page);
    }

    async getLoginPage(){
        return this.loginPage;
    }   
    async getDashboard(){
        return this.dashboard;
    }
    async getCartPage(){
        return this.cartPage;
    }
    async getOrdersPage(){
        return this.Orders;
    }
}

module.exports = {PageObjectManager};