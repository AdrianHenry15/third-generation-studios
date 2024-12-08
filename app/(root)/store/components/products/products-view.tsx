import React from "react";
import ProductGrid from "./product-grid";
import CategorySelectorComponent from "../ui/category-selector";

interface ProductsViewProps {
    products: any[];
    categories: any[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div>
            {/* Categories */}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />
            </div>
            {/* Products */}
            <div className="flex-1">
                <div>
                    <ProductGrid products={products} />

                    {/* Horizontal Line Tag  */}
                    <hr className="w-1.2 sm:w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default ProductsView;