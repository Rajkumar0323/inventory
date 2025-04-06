
export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
  query {
    inventoryLevel(id: "gid://shopify/InventoryLevel/118375907570?inventory_item_id=49457295294706") {
      id
      quantities(names: ["available", "incoming", "committed", "damaged", "on_hand", "quality_control", "reserved", "safety_stock"]) {
        name
        quantity
      }
      item {
        id
        sku
      }
      location {
        id
        name
      }
    }
  }`,
  );

  const data = await response.json();

  const response1 = await admin.graphql(`
      query {
        inventoryItems(first: 5) {
          edges {
            node {
              id
              sku
              tracked
              variant {
                id
                title
                product {
                  id
                  title
                  featuredImage {
                    url
                    altText
                  }
                }
              }
              inventoryLevels(first: 5) {
          edges {
            node {
              id
              quantities(names: ["available", "incoming", "committed", "damaged", "on_hand", "quality_control", "reserved", "safety_stock"]) {
                name
                quantity
              }
              location {
                id
                name
              }
            }
          }
        }
            }
          }
        }
      }
    `);

  const data1 = await response1.json();

  return json({ data, data1 });
}
