// hooks/useErrorHandling.ts
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const useErrorHandling = () => {
  const [errorState, setErrorState] = useState(false);

  const { clearCart } = useShoppingCart();

  const Trigger = async () => {
    try {
      const response = await fetch(
        'https://app.launchdarkly.com/webhook/triggers/65958d838767121012fbcd14/e6a7cf6d-f167-46b7-abd9-836b1d805711',  
        {
          method: "POST",
          body: JSON.stringify({
            eventName: "There was an error with the API",
          }),
        }
      );
      return response.status;
    } catch (error) {
      console.log("the fetch did not work");
    }
  };

  const errorTesting = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      if (jsonData == "the API is unreachable") {
        setErrorState(true);
         clearCart()
         Trigger()
        return 502;
      } else {
        setErrorState(false);
      }
    } catch (e) {
      console.log("is it running?");
      console.log(e)
    }
  };

  return { errorState, setErrorState, errorTesting };
};

export default useErrorHandling;
