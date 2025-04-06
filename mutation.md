
import { useState } from "react";
import { Form } from "@remix-run/react";


export const action = async ({ request, context }) => {
  const formData = await request.formData();
  const inventoryItemId = formData.get("inventoryItemId");
  const locationId = formData.get("locationId");

  const mutation = `
    mutation adjustInventory($input: InventoryAdjustQuantitiesInput!) {
      inventoryAdjustQuantities(input: $input) {
        inventoryAdjustmentGroup {
          id
          reason
          changes {
            delta
            quantityAfterChange
            location {
              id
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      name: "available", // must be one of Shopify's valid types
      reason: "correction", // must be string!
      changes: [
        {
          delta: 5, 
          inventoryItemId,
          locationId,
        },
      ],
    },
  };

  const response = await context.admin.graphql(mutation, { variables });
  const result = await response.json();

  console.log("Inventory adjustment result:", result);

  return null;
};

export default function InventoryAdjustForm() {
  const [inventoryItemId, setInventoryItemId] = useState("");
  const [locationId, setLocationId] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Inventory Item ID"
        value={inventoryItemId}
        onChange={(e) => setInventoryItemId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location ID"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
      />

      <Form method="post">
        {/* These hidden inputs will send the state values to the action */}
        <input type="hidden" name="inventoryItemId" value={inventoryItemId} />
        <input type="hidden" name="locationId" value={locationId} />

        <button type="submit">Adjust Inventory</button>
      </Form>
    </div>
  );
}
