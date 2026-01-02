class Dashboard{
    constructor(page){
        this.page = page;
        this.Products = this.page.locator(".card-body");
}
    async AddProductToCart(product){
        const title = await this.page.locator(".card-body b").allTextContents();
        const count = await this.Products.count();
        console.log("Product Count:", count);
        console.log(product);

        for(let i=0; i<count; i++){
            console.log("Product Found:", product);
            const content = await this.Products.nth(i).locator("b").textContent();
            console.log("Content:", content);
            // console.log(await this.Products.nth(i).locator("b").textContent());
            if(await this.Products.nth(i).locator("b").textContent() === product){
                await this.Products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
}
async NavigateToCart(){
    const cart = this.page.locator("button[routerlink$='/dashboard/cart']");
    await cart.click();
    await this.page.locator("div li").first().waitFor();
}
}

module.exports = {Dashboard};
