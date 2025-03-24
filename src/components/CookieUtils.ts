import { cookies } from "next/headers";
import { ICart, IProduct } from "./IInterfaces";

export const getCart = async () => {
  const temp = (await cookies()).get("carts")?.value || "";
  const products: ICart[] = temp ? JSON.parse(temp) : [];
  if (!temp) {
    (await cookies()).set("carts", "[]");
  }
  return products;
};

export const setCart = async (products: IProduct) => {
  const temp = (await cookies()).get("carts")?.value || "";
  let toJson: ICart[] = JSON.parse(temp);
  const filter = toJson.filter((p) => p.id === products.id);
  if (filter.length === 0) {
    toJson.push({ ...products, qty: 1 });
  } else {
    toJson = toJson.map((t) => ({
      ...t,
      qty: t.id === products.id ? t.qty + 1 : t.qty,
    }));
  }

  (await cookies()).set("carts", JSON.stringify(toJson), {
    expires: new Date("9999-12-30"),
  });
  return toJson;
};

export const actionCart = async (id: string, action: string) => {
  const temp = (await cookies()).get("carts")?.value || "";
  let toJson: ICart[] = JSON.parse(temp);
  switch (action) {
    case "ADD":
      toJson = toJson.map((t) => ({
        ...t,
        qty: t.id === id ? t.qty + 1 : t.qty,
      }));
      break;
    case "MIN":
      toJson = toJson.map((t) => ({
        ...t,
        qty: t.id === id ? t.qty - 1 : t.qty,
      }));
      break;
    case "DEL":
      toJson = toJson.filter((p) => p.id !== id);
      break;
  }

  (await cookies()).set("carts", JSON.stringify(toJson), {
    expires: new Date("9999-12-30"),
  });
  return toJson;
};
