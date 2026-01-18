// Implementation of the task II.2.a: Use JavaScript class with complex property and DOM output

document.addEventListener("DOMContentLoaded", function () {

    // Class definition for rental items
    class RentalItem {
        constructor(name, pricePerDay, tags = []) {
            this.name = name;
            this.pricePerDay = pricePerDay;
            this.tags = tags; // complex property: array
        }

        getDescription() {
            return `${this.name}: $${this.pricePerDay} per day`;
        }
    }

    // Create 5 rental objects
    const items = [
        new RentalItem("Skis", 50, ["popular", "family"]),
        new RentalItem("Snowboard", 45, ["extreme"]),
        new RentalItem("Ski Poles", 10, ["accessory"]),
        new RentalItem("Helmet", 15, ["safety"]),
        new RentalItem("Goggles", 20, ["accessory", "vision"])
    ];

    const rentalContainer = document.querySelector("#rental-items");

    items.forEach(item => {
        // Create wrapper
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("rental-item");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("data-price", item.pricePerDay);
        checkbox.setAttribute("data-name", item.name);
        checkbox.id = item.name;

        // Create label
        const label = document.createElement("label");
        label.setAttribute("for", item.name);
        label.textContent = item.getDescription();

        // Create reservation button
        const reserveBtn = document.createElement("button");
        reserveBtn.textContent = `Book ${item.name}`;
        reserveBtn.classList.add("reserve-btn");

        // Message element (hidden initially)
        const message = document.createElement("p");
        message.classList.add("hidden"); // uses CSS class with display: none;

        // Event listener for reservation button
        reserveBtn.addEventListener("click", function (e) {
            // Show confirmation message
            message.textContent = `${item.name} booked!`;
            message.classList.remove("hidden");

            // Disable button and update style
            reserveBtn.disabled = true;
            reserveBtn.classList.add("disabled");

            // Hide message after 5 seconds
            setTimeout(() => {
                message.classList.add("hidden");
            }, 5000);
        });

        // Append elements
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        itemDiv.appendChild(reserveBtn);
        itemDiv.appendChild(message);
        rentalContainer.appendChild(itemDiv);
    });

    // Handle total price calculation
    document.querySelector("#calculateBtn").addEventListener("click", function () {
        const renters = parseInt(document.querySelector("#renters").value);
        const selectedItems = document.querySelectorAll("input[type='checkbox']:checked");
        const resultEl = document.querySelector("#result");

        if (isNaN(renters) || renters < 1) {
            resultEl.textContent = `Please enter a valid number of renters.`;
            return;
        }

        if (selectedItems.length === 0) {
            resultEl.textContent = `Please select at least one rental item.`;
            return;
        }

        let totalPrice = 0;
        let skiRentalIncluded = false;

        selectedItems.forEach(item => {
            const itemPrice = parseFloat(item.getAttribute("data-price"));
            const itemName = item.getAttribute("data-name");

            totalPrice += itemPrice * renters;

            if (itemName === "Skis") {
                skiRentalIncluded = true;
            }
        });

        // Discounts
        if (renters >= 20) {
            totalPrice *= 0.6; // 40% discount
        } else if (renters >= 3 && skiRentalIncluded) {
            const skiItem = items.find(i => i.name === "Skis");
            if (skiItem) {
                totalPrice -= (skiItem.pricePerDay * 0.3) * renters; // 30% off skis
            }
        }

        resultEl.textContent = `Total price for ${renters} renters: $${totalPrice.toFixed(2)}`;
    });

    // Footer update
    const footerMessage = document.querySelector("#offer-message");
    if (footerMessage) {
        footerMessage.textContent = `All rights reserved, Web Developer Zhenya Zhelyazkova.`;
    }
});
