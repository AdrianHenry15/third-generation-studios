import { formatCurrency } from "@/lib/helpers/format-currency";
import { PrintfulOrderResponse, PrintfulOrderResponseItem } from "@/lib/types/printful/printful-order-response-type";
import Image from "next/image";
import React from "react";

interface IOrderItemProps {
    item: PrintfulOrderResponseItem;
    order: PrintfulOrderResponse;
}

const OrderItem = (props: IOrderItemProps) => {
    const { item, order } = props;
    return (
        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0">
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Item Image */}
                {item.product.image && (
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.product.image} alt={`img-${item.product.name}`} className="object-cover" fill />
                    </div>
                )}
                {/* Item Name and Quantity */}
                <div>
                    <p className="font-medium text-sm sm:text-base">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
            </div>

            {/* Price */}
            <p className="font-medium text-right">
                {item.quantity && item.retail_price
                    ? formatCurrency(parseInt(item.retail_price) * item.quantity, order.retail_costs.currency)
                    : "N/A"}
            </p>
        </div>
    );
};

export default OrderItem;
