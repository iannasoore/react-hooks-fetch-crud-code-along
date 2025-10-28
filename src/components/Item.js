import React from "react";

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={() => onUpdateItem(item)}
      >
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button
        className="delete"
        onClick={() => onDeleteItem(item.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Item;