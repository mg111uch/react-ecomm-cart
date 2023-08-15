import React from "react";
// import useRazorpay from "react-razorpay";
import axios from "axios";
import { CartContext } from '../CartContext';
import { Button } from '@mui/material';

export function ProceedToPay({totalAmount}){
    // const Razorpay = useRazorpay();
    const { items, 
            setItems,
            getTotalPrice,
            getItemsCount} = React.useContext(CartContext);

    // const amt_in_paise = (totalAmount*100).toString()

    const handlePayment = async () => {
        const cartData = {
            CartItems: items,
            ItemsCount: Number(getItemsCount()),
            TotalPrice: Number(getTotalPrice())
        }
        console.log(cartData)
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        axios
            .post("http://localhost:5000/cartData", 
                    JSON.stringify(cartData), 
                    customConfig)
            .then(res => console.log(res.data))
        setItems([])
        console.log('Paid: ',totalAmount)
    }

    // const handlePayment = async (params) => {
    //     const order = await createOrder(params); //  Create order on your backend
      
    //     const options = {
    //       key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    //       amount: amt_in_paise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //       currency: "INR",
    //       name: "Acme Corp",
    //       description: "Test Transaction",
    //       image: "https://example.com/your_logo",
    //       order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    //       handler: function (response) {
    //         alert(response.razorpay_payment_id);
    //         alert(response.razorpay_order_id);
    //         alert(response.razorpay_signature);
    //       },
    //       prefill: {
    //         name: "Piyush Garg",
    //         email: "youremail@example.com",
    //         contact: "9999999999",
    //       },
    //       notes: {
    //         address: "Razorpay Corporate Office",
    //       },
    //       theme: {
    //         color: "#3399cc",
    //       },
    //     };
      
    //     const rzp1 = new Razorpay(options);
      
    //     rzp1.on("payment.failed", function (response) {
    //       alert(response.error.code);
    //       alert(response.error.description);
    //       alert(response.error.source);
    //       alert(response.error.step);
    //       alert(response.error.reason);
    //       alert(response.error.metadata.order_id);
    //       alert(response.error.metadata.payment_id);
    //     });
      
    //     rzp1.open();
    //   };

    return(
        <Button 
        variant="contained" 
        color="secondary"
        fullWidth
        size="large"
        className="payment-button"
        onClick={handlePayment}>
            Pay with Razorpay
        </Button>
    )
}