import React, { useState, useEffect } from "react";
import Item from "./Item";
import ItemForm from "./ItemForm";
import Filter from "./Filter";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ 1. Fetch items from the server when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  // ✅ 2. Handle form submission (POST request)
  function handleAddItem(newItem) {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => setItems([...items, addedItem]));
  }

  // ✅ 3. Handle delete (DELETE request)
  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  }

  // ✅ 4. Handle cart toggle (PATCH request)
  function handleToggleItem(itemToUpdate) {
    fetch(`http://localhost:4000/items/${itemToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !itemToUpdate.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        const updatedItems = items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
        setItems(updatedItems);
      });
  }

  // ✅ 5. Filter by category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;