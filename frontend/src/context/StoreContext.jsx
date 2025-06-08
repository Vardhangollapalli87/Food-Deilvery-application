import { createContext, useEffect, useState} from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = '/api';
    const [token,setToken] = useState("");

    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+'/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+'/cart/remove',{itemId},{headers:{token}})
        }
    }

    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const iteminfo = food_list.find(p => p._id === item);
                if (iteminfo) {
                    totalAmount += iteminfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food_list`);
                }
            }
        }
        return totalAmount;
    };


    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + '/food/list');
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list", error);
        }
    };


    const loadCartData = async(token)=>{
        try {
            const response = await axios.post(url+'/cart/get',{},{headers:{token}})
            setCartItems(response.data.cartData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem('token');
            if (storedToken) {
            // Validate token and user existence
            try {
                const res = await axios.post(url + '/user/validate', { token: storedToken });
                if (res.data.success) {
                    setToken(storedToken);
                    await loadCartData(localStorage.getItem('token'));
                } else {
                    localStorage.removeItem('token');
                    setToken('');
                }
            } catch {
                localStorage.removeItem('token');
                setToken('');
            }
            }
        }
        loadData();
    }, []);

    const deliveryFee = 2;

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    const contextValue={
        food_list,
        cartItems,
        deliveryFee,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;