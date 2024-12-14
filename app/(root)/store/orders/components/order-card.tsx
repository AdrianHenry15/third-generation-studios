"use client";

import { formatCurrency } from "@/lib/helpers/format-currency";
import { PrintfulOrderResponse } from "@/lib/types/printful/printful-order-response-type";
import React, { useState } from "react";
import OrderItem from "./order-item";
import CancelModal from "./cancel-modal";

interface IOrderCardProps {
    order: PrintfulOrderResponse;
    removeOrder: (orderId: string) => void;
}

const OrderCard = (props: IOrderCardProps) => {
    const { order, removeOrder } = props;
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const cancelOrder = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${order.id}`, {
                method: "DELETE",
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Failed to cancel the order");
            }

            const { result } = await response.json();
            setIsCancelModalOpen(false);
            console.log("Order canceled successfully", result);

            // Notify parent to remove the order
            removeOrder(order.id.toString());
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Failed to cancel the order. Please try again.");
        }
    };

    return (
        <div
            key={order.packing_slip?.custom_order_id}
            className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${
                order.status.toLocaleLowerCase() === "canceled" ? "opacity-50" : ""
            }`}
        >
            {/* Order Number */}
            <div className="p-4 sm:p-6 border-b border-gray-200 relative">
                <CancelModal
                    cancelOrder={cancelOrder}
                    isOpen={isCancelModalOpen}
                    toggleModal={() => setIsCancelModalOpen(!isCancelModalOpen)}
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1 font-bold">Order Number</p>
                        <p className="font-mono text-sm text-black break-all">{order.packing_slip?.custom_order_id}</p>
                    </div>
                    {/* Order Date */}
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">Order Date</p>
                        <p className="font-medium">{new Date(order.created).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Status */}
                <div className="flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Status:</span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                                order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {order.status.toLowerCase() === "canceled" ? "Canceled" : order.status}
                        </span>
                    </div>
                    {/* Currency */}
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="font-bold text-lg">
                            {formatCurrency(parseInt(order.retail_costs.total) ?? 0, order.retail_costs.currency)}
                        </p>
                    </div>
                </div>

                {/* Discount */}
                {order.retail_costs.discount && (
                    <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                        <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                            Discount Applied:
                            {formatCurrency(parseInt(order.retail_costs.discount!), order.retail_costs.currency)}
                        </p>
                        <p className="text-sm text-gray-600">
                            Original Subtotal:
                            {formatCurrency(
                                (parseInt(order.retail_costs.subtotal) ?? 0) + parseInt(order.retail_costs.discount!),
                                order.retail_costs.currency
                            )}
                        </p>
                    </div>
                )}
            </div>

            {/* Order Items */}
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">Order Items</p>

                <div className="space-y-3 sm:space-y-4">
                    {order.items.map((item) => (
                        <OrderItem order={order} item={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
