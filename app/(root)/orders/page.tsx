import { formatCurrency } from "@/lib/formatCurrency";
import { PrintfulOrderType } from "@/lib/types/printful-order-types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Orders() {
    // const { userId } = auth();

    // if (!userId) {
    //     return redirect("/");
    // }

    const fetchOrders = async (): Promise<PrintfulOrderType[]> => {
        const response = await fetch(`http://localhost:3000/api/orders`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure fresh data on every request
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const { result } = await response.json();
        return result;
    };

    let orders: PrintfulOrderType[] = [];
    try {
        orders = await fetchOrders();
    } catch (error) {
        console.error("Failed to fetch orders:", error);
    }

    if (!orders.length) {
        return <p className="text-center text-gray-500 mt-10">No Orders found.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-light mb-8">My Orders</h1>

                <div className="space-y-6 sm:space-y-8">
                    {orders.map((order) => (
                        <div
                            key={order.packing_slip?.custom_order_id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                        >
                            {/* Order Number */}
                            <div className="p-4 sm:p-6 border-b border-gray-200">
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 font-bold">Order Number</p>
                                        <p className="font-mono text-sm text-green-600 break-all">{order.packing_slip?.custom_order_id}</p>
                                    </div>
                                    {/* Order Date */}
                                    <div className="sm:text-right">
                                        <p className="text-sm text-gray-600 mb-1">Order Date</p>
                                        <p className="font-medium">
                                            {order.created ? new Date(order.created).toLocaleDateString() : "N/A"}
                                        </p>
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
                                            {order.status}
                                        </span>
                                    </div>
                                    {/* Currency */}
                                    <div className="sm:text-right">
                                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                        <p className="font-bold text-lg">
                                            {formatCurrency(parseInt(order.retail_costs.subtotal) ?? 0, order.retail_costs.currency)}
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
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                {/* Item Image */}
                                                {item.product.image && (
                                                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                                                        <Image
                                                            src={item.product.image}
                                                            alt={`img-${item.product.name}`}
                                                            className="object-cover"
                                                            fill
                                                        />
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
                                                    ? formatCurrency(
                                                          parseInt(item.retail_price) * item.quantity,
                                                          order.retail_costs.currency
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders;
