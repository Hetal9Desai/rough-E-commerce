import { GET } from "../Services/methods";
import { POST } from "../Services/productservice";
import { User, Product, Role } from "../SignUp/commonTypeInterface";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm") as HTMLFormElement;
  const imageInput = document.getElementById(
    "productImage"
  ) as HTMLInputElement;
  const imagePreview = document.getElementById(
    "imagePreview"
  ) as HTMLImageElement;

  // Image Preview Functionality
  imageInput.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src =
        "https://placehold.co/300x300?text=Product+Image&font=roboto";
    }
  });

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Form Fields
    const productName = (
      document.getElementById("productName") as HTMLInputElement
    ).value.trim();
    const productImage = (
      document.getElementById("productImage") as HTMLInputElement
    ).files?.[0];
    const productUrl = (
      document.getElementById("productUrl") as HTMLInputElement
    ).value.trim();
    const productPrice = parseFloat(
      (document.getElementById("productPrice") as HTMLInputElement).value
    );
    const productDescription = (
      document.getElementById("productDescription") as HTMLTextAreaElement
    ).value.trim();

    // Validation
    if (productName.length < 2) {
      alert("Product name must be at least 2 characters long.");
      return;
    }
    if (!productPrice || productPrice <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }
    if (productDescription.length < 10) {
      alert("Product description must be at least 10 characters long.");
      return;
    }

    // Check if user is logged in and is a seller
    const userToken = localStorage.getItem("user-token");
    if (!userToken) {
      alert("You must be logged in to add a product.");
      return;
    }

    try {
      const payload = JSON.parse(atob(userToken.split(".")[1])); // Decode JWT
      const userId = payload.userId; // Extract userId

      if (!userId) {
        throw new Error("Invalid user ID from token.");
      }

      const user = (await GET(`users/${userId}`)) as User;
      if (user.role !== Role.Seller) {
        alert("You do not have permission to add products.");
        return;
      }

      // Prepare Product Data
      const newProduct: Product = {
        id: "", // Generate or leave empty if JSON server auto-generates it
        name: productName,
        price: productPrice,
        image: productImage
          ? URL.createObjectURL(productImage)
          : productUrl || "",
        userId: userId,
      };

      // Check for invalid image URL
      if (!newProduct.image || typeof newProduct.image !== "string") {
        throw new Error("Invalid image URL.");
      }

      // Send to JSON Server
      await POST("products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      alert("Product added successfully!");
      form.reset();
      imagePreview.src =
        "https://placehold.co/300x300?text=Product+Image&font=roboto"; // Reset preview
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add the product. Please try again.");
    }
  });
});
