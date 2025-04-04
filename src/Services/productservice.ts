// src/Services/productservice.ts
import { POST } from "./methods";
import { Product } from "../SignUp/commonTypeInterface";

export async function createProduct(
  product: Product
): Promise<Product | undefined> {
  try {
    const response = await POST("products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response as Product;
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// Ensure POST is exported
export { POST };

// import { GET, POST, PUT, DELETE } from "./methods";
// // import { Product } from "./types/product"; // Adjust the path as needed
// interface Product {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
//     userId: string;
//   }

// // Create Product
// export async function createProduct(
//   product: Product
// ): Promise<Product | undefined> {
//   try {
//     const response = await POST("products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     return response as unknown as Product;
//   } catch (error) {
//     console.error("Error creating product:", error);
//   }
// }

// // Get All Products
// export async function getAllProducts(): Promise<Product[] | undefined> {
//   try {
//     const products = await GET("products");
//     return products as Product[];
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

// // Get Single Product
// export async function getProductById(
//   productId: string
// ): Promise<Product | undefined> {
//   try {
//     const product = await GET(`products/${productId}`);
//     return product as Product;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//   }
// }

// // Update Product
// export async function updateProduct(
//   productId: string,
//   updatedData: Partial<Product>
// ): Promise<Product | undefined> {
//   try {
//     const response = await PUT(`products/${productId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedData),
//     });
//     return response as unknown as Product;
//   } catch (error) {
//     console.error("Error updating product:", error);
//   }
// }

// // Delete Product
// export async function deleteProduct(productId: string): Promise<void> {
//   try {
//     await DELETE(`products/${productId}`, {
//       method: "DELETE",
//     });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//   }
// }
// export { GET, POST };
