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
