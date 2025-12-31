class APIUtil{
    constructor(apiContext, LoginPayload){
        this.apiContext = apiContext;
        this.LoginPayload = LoginPayload;

    }

    async getToken(){
            const Response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: this.LoginPayload});
            const responseJson = await Response.json();
            const token = responseJson.token;
            return token;
    };

    async createOrder(CreateOrderPayload){
        let response = {};
        response.token = await this.getToken();
        const OrderAPI = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: CreateOrderPayload, 
            headers: {Authorization: response.token}
        });
            const orderResponseJson =  await OrderAPI.json();
            const orderId = orderResponseJson.orders[0];
            response.OrderId = orderId;
            console.log("Created Order ID:", orderId);
            return response;
    }
}

export { APIUtil };
