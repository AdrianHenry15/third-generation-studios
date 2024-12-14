"use client";

import { PrintfulOrderResponse } from "@/lib/types/printful/printful-order-response-type";
import OrderCard from "./components/order-card";
import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState<PrintfulOrderResponse[]>([]);

    const fetchOrders = async () => {
        const response = await fetch("http://localhost:3000/api/orders");
        const data = await response.json();
        setOrders(data);
    };

    const removeOrder = (orderId: string) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id.toString() !== orderId));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (!Array.isArray(orders) || orders.length === 0) {
        return (
            <div className="text-center h-screen justify-center items-center text-gray-600">
                <p className="self-center flex h-full w-full items-center justify-center">You have not placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-light mb-8">My Orders</h1>

                <div className="space-y-6 sm:space-y-8">
                    {orders && orders.map((order) => <OrderCard removeOrder={removeOrder} key={order.id} order={order} />)}
                </div>
            </div>
        </div>
    );
}

export default Orders;
