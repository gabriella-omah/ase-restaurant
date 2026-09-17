// =========================================================
// ÀṢẸ — MAIN JAVASCRIPT
// =========================================================


// =========================================================
// NAVIGATION SCROLL
// =========================================================

const header = document.querySelector(".site-header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    });
}


// =========================================================
// MOBILE MENU
// =========================================================

const mobileMenuToggle =
    document.querySelector(".menu-toggle");

const mobileMenuClose =
    document.querySelector(".mobile-menu .menu-close");

const mobileMenu =
    document.querySelector(".mobile-menu");

const mobileLinks =
    document.querySelectorAll(".mobile-menu-links a");


function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }

    document.body.classList.add(
        "mobile-menu-open"
    );
}


function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    document.body.classList.remove(
        "mobile-menu-open"
    );
}


if (mobileMenuToggle) {

    mobileMenuToggle.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const isOpen =
                mobileMenu?.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        }
    );

}


if (mobileMenuClose) {

    mobileMenuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


mobileLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


// Close mobile menu when clicking
// outside the actual menu.

document.addEventListener("click", (event) => {

    if (!mobileMenu) return;

    if (!mobileMenu.classList.contains("active")) {
        return;
    }

    const clickedInsideMenu =
        mobileMenu.contains(event.target);

    const clickedToggle =
        mobileMenuToggle &&
        mobileMenuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
    }

});


// Close mobile menu with Escape.

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (
        mobileMenu &&
        mobileMenu.classList.contains("active")
    ) {
        closeMobileMenu();
    }

});


// =========================================================
// ACTIVE SECTION — NAVIGATION
// =========================================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


if (
    sections.length &&
    navLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        const matches =
                            link.getAttribute("href") === `#${id}` ||
                            link.dataset.section === id;

                        link.classList.toggle(
                            "active",
                            matches
                        );

                    });

                });

            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


// =========================================================
// HERO
// =========================================================

// No hero parallax here.
//
// The previous version moved the image while scrolling,
// which could create a "bouncing" or unstable feeling.
//
// Keep the hero still and let CSS handle its animation.


// =========================================================
// FOOD SECTION REVEAL
// =========================================================

const foodCards =
    document.querySelectorAll(".food-card");


if (foodCards.length) {

    const foodObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -8% 0px"
            }
        );


    foodCards.forEach((card) => {
        foodObserver.observe(card);
    });

}


// =========================================================
// SIGNATURE GALLERY
// =========================================================

const gallery =
    document.querySelector("#foodGallery");

const galleryCards =
    document.querySelectorAll(".gallery-card");


if (gallery && galleryCards.length) {

    // Pause the floating gallery animation
    // while the user is interacting with it.

    gallery.addEventListener(
        "mouseenter",
        () => {

            galleryCards.forEach((card) => {

                card.style.animationPlayState =
                    "paused";

            });

        }
    );


    gallery.addEventListener(
        "mouseleave",
        () => {

            galleryCards.forEach((card) => {

                card.style.animationPlayState =
                    "running";

                card.style.filter = "";

                card.style.zIndex = "";

            });

        }
    );


    galleryCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                galleryCards.forEach((other) => {

                    if (other !== card) {

                        other.style.filter =
                            "brightness(0.45)";

                    }

                });


                card.style.filter =
                    "brightness(1)";

                card.style.zIndex = "100";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                galleryCards.forEach((other) => {

                    other.style.filter = "";

                    if (other !== card) {
                        other.style.zIndex = "";
                    }

                });

            }
        );

    });

}


// =========================================================
// SIGNATURE MENU / ACCORDION
// =========================================================

const signatureMenuToggle =
    document.querySelector("#menuToggle");

const signatureMenuPanel =
    document.querySelector("#menuPanel");


function setSignatureMenuButton(
    isOpen
) {

    if (!signatureMenuToggle) return;


    const label =
        signatureMenuToggle.querySelector(
            "span:first-child"
        );

    const icon =
        signatureMenuToggle.querySelector(
            ".menu-button-icon"
        );


    if (label) {

        label.textContent =
            isOpen
                ? "Close the menu"
                : "View the menu";

    }


    if (icon) {

        icon.textContent =
            isOpen
                ? "×"
                : "+";

    }


    signatureMenuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


function openSignatureMenu() {

    if (
        !signatureMenuToggle ||
        !signatureMenuPanel
    ) {
        return;
    }


    signatureMenuPanel.classList.add(
        "is-open"
    );


    signatureMenuPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    setSignatureMenuButton(true);


    // Give the browser a moment to begin
    // the accordion animation before scrolling.

    window.setTimeout(() => {

        signatureMenuPanel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 180);

}


function closeSignatureMenu() {

    if (
        !signatureMenuToggle ||
        !signatureMenuPanel
    ) {
        return;
    }


    signatureMenuPanel.classList.remove(
        "is-open"
    );


    signatureMenuPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    setSignatureMenuButton(false);

}


function toggleSignatureMenu() {

    if (
        !signatureMenuToggle ||
        !signatureMenuPanel
    ) {
        return;
    }


    const isOpen =
        signatureMenuPanel.classList.contains(
            "is-open"
        );


    if (isOpen) {

        closeSignatureMenu();

    } else {

        openSignatureMenu();

    }

}


// Main menu button.

if (signatureMenuToggle) {

    signatureMenuToggle.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            toggleSignatureMenu();

        }
    );

}


// Clicking outside the accordion closes it.

document.addEventListener(
    "click",
    (event) => {

        if (!signatureMenuPanel) return;

        if (
            !signatureMenuPanel.classList.contains(
                "is-open"
            )
        ) {
            return;
        }


        const clickedInsidePanel =
            signatureMenuPanel.contains(
                event.target
            );


        const clickedToggle =
            signatureMenuToggle &&
            signatureMenuToggle.contains(
                event.target
            );


        if (
            !clickedInsidePanel &&
            !clickedToggle
        ) {

            closeSignatureMenu();

        }

    }
);


// Escape closes the accordion.

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            signatureMenuPanel &&
            signatureMenuPanel.classList.contains(
                "is-open"
            )
        ) {

            closeSignatureMenu();

        }

    }
);


// =========================================================
// "SEE THE PLATES" BUTTON
// =========================================================
//
// If you have a button/link with:
//
// data-open-menu
//
// clicking it will open the Signature menu.
//

const openMenuTriggers =
    document.querySelectorAll(
        "[data-open-menu]"
    );


openMenuTriggers.forEach((trigger) => {

    trigger.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openSignatureMenu();

        }
    );

});


// =========================================================
// ORDER SYSTEM
// =========================================================

const orderModal =
    document.querySelector("#orderModal");

const openOrderModal =
    document.querySelector("#openOrderModal");

const closeOrderModal =
    document.querySelector("#closeOrderModal");

const orderModalOverlay =
    document.querySelector("#orderModalOverlay");


// =========================================================
// ORDER ELEMENTS
// =========================================================

const mealNext =
    document.querySelector("#mealNext");

const proteinNext =
    document.querySelector("#proteinNext");

const modalOrderTotal =
    document.querySelector("#modalOrderTotal");

const modalSummaryItems =
    document.querySelector("#modalSummaryItems");

const finalOrderTotal =
    document.querySelector("#finalOrderTotal");

const finalOrderDetails =
    document.querySelector("#finalOrderDetails");

const placeFinalOrder =
    document.querySelector("#placeFinalOrder");

const orderStepPanels =
    document.querySelectorAll(
        ".order-step-panel"
    );

const mealChoices =
    document.querySelectorAll(
        ".meal-choice"
    );

const quantityOptions =
    document.querySelectorAll(
        ".quantity-option"
    );

const fulfilmentOptions =
    document.querySelectorAll(
        ".fulfilment-option"
    );

const backButtons =
    document.querySelectorAll(
        "[data-back]"
    );


// =========================================================
// ORDER STATE
// =========================================================

const order = {

    meal: null,

    mealPrice: 0,

    proteins: {},

    extras: {},

    fulfilment: null

};


// =========================================================
// SHOW ORDER STEP
// =========================================================

function showOrderStep(step) {

    orderStepPanels.forEach((panel) => {

        const panelStep =
            Number(panel.dataset.step);

        panel.classList.toggle(
            "active",
            panelStep === step
        );

    });


    // Keep the modal positioned at the top
    // whenever the user changes steps.

    const modalCard =
        orderModal?.querySelector(
            ".order-modal-card"
        );


    if (modalCard) {

        modalCard.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


// =========================================================
// OPEN ORDER
// =========================================================

function openOrder() {

    if (!orderModal) return;


    // Always start with a fresh order.

    resetOrder();


    orderModal.classList.add(
        "is-open"
    );


    orderModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "order-modal-open"
    );


    showOrderStep(1);


    // Focus the close button for accessibility.

    if (closeOrderModal) {

        window.setTimeout(() => {

            closeOrderModal.focus();

        }, 250);

    }

}


// =========================================================
// CLOSE ORDER
// =========================================================

function closeOrder() {

    if (!orderModal) return;


    orderModal.classList.remove(
        "is-open"
    );


    orderModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "order-modal-open"
    );

}


// =========================================================
// OPEN ORDER BUTTON
// =========================================================

if (openOrderModal) {

    openOrderModal.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            openOrder();

        }
    );

}


// =========================================================
// CLOSE ORDER BUTTON
// =========================================================

if (closeOrderModal) {

    closeOrderModal.addEventListener(
        "click",
        () => {

            closeOrder();

            resetOrder();

        }
    );

}


// =========================================================
// CLICK OUTSIDE ORDER CARD
// =========================================================
//
// The overlay is outside the card.
// Clicking the overlay closes the modal.
// Clicking the actual card does nothing.
//

if (orderModalOverlay) {

    orderModalOverlay.addEventListener(
        "click",
        () => {

            closeOrder();

            resetOrder();

        }
    );

}


// =========================================================
// ESCAPE — ORDER MODAL
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            orderModal &&
            orderModal.classList.contains(
                "is-open"
            )
        ) {

            closeOrder();

            resetOrder();

        }

    }
);


// =========================================================
// MEAL SELECTION
// =========================================================

mealChoices.forEach((choice) => {

    choice.addEventListener(
        "click",
        () => {

            // Remove selection from all meals.

            mealChoices.forEach((item) => {

                item.classList.remove(
                    "selected"
                );

            });


            // Select current meal.

            choice.classList.add(
                "selected"
            );


            // Store meal information.

            order.meal =
                choice.dataset.meal ||
                null;


            order.mealPrice =
                Number(
                    choice.dataset.price || 0
                );


            // Meal is the ONLY requirement
            // for moving from Step 1.

            if (mealNext) {

                mealNext.disabled =
                    !order.meal;

            }


            updateOrderSummary();

        }
    );

});


// =========================================================
// STEP 1 → STEP 2
// =========================================================

if (mealNext) {

    mealNext.addEventListener(
        "click",
        () => {

            // Meal is required.

            if (!order.meal) {
                return;
            }


            showOrderStep(2);

            updateOrderSummary();

        }
    );

}


// =========================================================
// QUANTITY CONTROLS
// =========================================================
//
// Protein and extras are OPTIONAL.
//
// The user can:
// - choose one
// - choose several
// - choose none
//
// None is completely valid.
//

quantityOptions.forEach((option) => {

    const minus =
        option.querySelector(
            ".quantity-minus"
        );

    const plus =
        option.querySelector(
            ".quantity-plus"
        );

    const value =
        option.querySelector(
            ".quantity-value"
        );

    const type =
        option.dataset.type;

    const name =
        option.dataset.name;

    const price =
        Number(
            option.dataset.price || 0
        );


    if (
        !minus ||
        !plus ||
        !value ||
        !name
    ) {
        return;
    }


    // -----------------------------------------------------
    // PLUS
    // -----------------------------------------------------

    plus.addEventListener(
        "click",
        () => {

            const current =
                Number(
                    value.textContent
                ) || 0;


            const newQuantity =
                current + 1;


            value.textContent =
                String(newQuantity);


            option.classList.add(
                "has-quantity"
            );


            const target =
                type === "protein"
                    ? order.proteins
                    : order.extras;


            target[name] = {

                quantity:
                    newQuantity,

                price:
                    price

            };


            updateOrderSummary();

        }
    );


    // -----------------------------------------------------
    // MINUS
    // -----------------------------------------------------

    minus.addEventListener(
        "click",
        () => {

            const current =
                Number(
                    value.textContent
                ) || 0;


            // Never allow negative quantities.

            if (current <= 0) {
                return;
            }


            const newQuantity =
                current - 1;


            value.textContent =
                String(newQuantity);


            const target =
                type === "protein"
                    ? order.proteins
                    : order.extras;


            if (newQuantity === 0) {

                delete target[name];


                option.classList.remove(
                    "has-quantity"
                );

            } else {

                target[name] = {

                    quantity:
                        newQuantity,

                    price:
                        price

                };

            }


            updateOrderSummary();

        }
    );

});


// =========================================================
// CALCULATE TOTAL
// =========================================================

function calculateOrderTotal() {

    let total =
        order.mealPrice || 0;


    // Protein is optional.

    Object.values(
        order.proteins
    ).forEach((item) => {

        total +=
            item.price *
            item.quantity;

    });


    // Extras are optional.

    Object.values(
        order.extras
    ).forEach((item) => {

        total +=
            item.price *
            item.quantity;

    });


    return total;

}


// =========================================================
// UPDATE ORDER SUMMARY
// =========================================================

function updateOrderSummary() {

    const total =
        calculateOrderTotal();


    // -----------------------------------------------------
    // TOTAL
    // -----------------------------------------------------

    if (modalOrderTotal) {

        modalOrderTotal.textContent =
            `₦${total.toLocaleString()}`;

    }


    // -----------------------------------------------------
    // SUMMARY
    // -----------------------------------------------------

    if (modalSummaryItems) {

        const items = [];


        // Meal

        if (order.meal) {

            items.push(`

                <div class="modal-summary-row">

                    <span>
                        ${order.meal}
                    </span>

                    <strong>
                        ₦${order.mealPrice.toLocaleString()}
                    </strong>

                </div>

            `);

        }


        // Proteins

        Object.entries(
            order.proteins
        ).forEach(([name, item]) => {

            items.push(`

                <div class="modal-summary-row">

                    <span>
                        ${name} × ${item.quantity}
                    </span>

                    <strong>
                        ₦${(
                            item.price *
                            item.quantity
                        ).toLocaleString()}
                    </strong>

                </div>

            `);

        });


        // Extras

        Object.entries(
            order.extras
        ).forEach(([name, item]) => {

            items.push(`

                <div class="modal-summary-row">

                    <span>
                        ${name} × ${item.quantity}
                    </span>

                    <strong>
                        ₦${(
                            item.price *
                            item.quantity
                        ).toLocaleString()}
                    </strong>

                </div>

            `);

        });


        if (!items.length) {

            modalSummaryItems.innerHTML = `

                <p>
                    Choose your meal to begin.
                </p>

            `;

        } else {

            modalSummaryItems.innerHTML =
                items.join("");

        }

    }


    // -----------------------------------------------------
    // PROTEIN STEP BUTTON
    // -----------------------------------------------------
    //
    // IMPORTANT:
    // Protein is NOT required.
    //
    // Once the customer has selected a meal,
    // this button is ALWAYS available.
    //

    if (proteinNext) {

        proteinNext.disabled =
            !order.meal;

    }

}


// =========================================================
// STEP 2 → STEP 3
// =========================================================

if (proteinNext) {

    proteinNext.addEventListener(
        "click",
        () => {

            // Only the meal is required.

            if (!order.meal) {
                return;
            }


            showOrderStep(3);

            updateFinalSummary();

        }
    );

}


// =========================================================
// BACK BUTTONS
// =========================================================

backButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const previousStep =
                Number(
                    button.dataset.back
                );


            if (
                Number.isNaN(previousStep)
            ) {
                return;
            }


            showOrderStep(
                previousStep
            );

        }
    );

});


// =========================================================
// FULFILMENT
// =========================================================
//
// Fulfilment IS required.
//

fulfilmentOptions.forEach((option) => {

    option.addEventListener(
        "click",
        () => {

            fulfilmentOptions.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            option.classList.add(
                "selected"
            );


            order.fulfilment =
                option.dataset.method ||
                null;


            if (placeFinalOrder) {

                placeFinalOrder.disabled =
                    !order.fulfilment ||
                    !order.meal;

            }


            updateFinalSummary();

        }
    );

});


// =========================================================
// FINAL SUMMARY
// =========================================================

function updateFinalSummary() {

    const total =
        calculateOrderTotal();


    // -----------------------------------------------------
    // TOTAL
    // -----------------------------------------------------

    if (finalOrderTotal) {

        finalOrderTotal.textContent =
            `₦${total.toLocaleString()}`;

    }


    if (!finalOrderDetails) {
        return;
    }


    const details = [];


    // -----------------------------------------------------
    // MEAL
    // -----------------------------------------------------

    if (order.meal) {

        details.push(`

            <div class="final-summary-row">

                <span>
                    Meal
                </span>

                <strong>
                    ${order.meal}
                </strong>

            </div>

        `);

    }


    // -----------------------------------------------------
    // PROTEINS
    // -----------------------------------------------------

    Object.entries(
        order.proteins
    ).forEach(([name, item]) => {

        details.push(`

            <div class="final-summary-row">

                <span>
                    Protein
                </span>

                <strong>
                    ${name} × ${item.quantity}
                </strong>

            </div>

        `);

    });


    // -----------------------------------------------------
    // EXTRAS
    // -----------------------------------------------------

    Object.entries(
        order.extras
    ).forEach(([name, item]) => {

        details.push(`

            <div class="final-summary-row">

                <span>
                    Extra
                </span>

                <strong>
                    ${name} × ${item.quantity}
                </strong>

            </div>

        `);

    });


    // -----------------------------------------------------
    // FULFILMENT
    // -----------------------------------------------------

    if (order.fulfilment) {

        details.push(`

            <div class="final-summary-row">

                <span>
                    Fulfilment
                </span>

                <strong>
                    ${order.fulfilment}
                </strong>

            </div>

        `);

    }


    // If no optional extras were selected,
    // don't display an awkward empty section.

    finalOrderDetails.innerHTML =
        details.join("");

}


// =========================================================
// PLACE ORDER
// =========================================================

if (placeFinalOrder) {

    placeFinalOrder.addEventListener(
        "click",
        () => {

            // Only these two things are required:
            //
            // 1. Meal
            // 2. Fulfilment
            //
            // Protein is NOT required.
            // Extras are NOT required.

            if (
                !order.meal ||
                !order.fulfilment
            ) {
                return;
            }


            const total =
                calculateOrderTotal();


            // Visual confirmation.

            placeFinalOrder.innerHTML = `

                <span>
                    Order selected
                </span>

                <span>
                    ✓
                </span>

            `;


            placeFinalOrder.classList.add(
                "order-success"
            );


            // For now, log the order.
            //
            // Later this can connect to WhatsApp,
            // a backend, payment system, etc.

            console.log(
                "ÀṢẸ ORDER:",
                {
                    meal:
                        order.meal,

                    mealPrice:
                        order.mealPrice,

                    proteins:
                        order.proteins,

                    extras:
                        order.extras,

                    fulfilment:
                        order.fulfilment,

                    total:
                        total
                }
            );

        }
    );

}


// =========================================================
// RESET ORDER
// =========================================================

function resetOrder() {

    // -----------------------------------------------------
    // RESET STATE
    // -----------------------------------------------------

    order.meal =
        null;

    order.mealPrice =
        0;

    order.proteins =
        {};

    order.extras =
        {};

    order.fulfilment =
        null;


    // -----------------------------------------------------
    // RESET MEAL SELECTIONS
    // -----------------------------------------------------

    mealChoices.forEach((choice) => {

        choice.classList.remove(
            "selected"
        );

    });


    // -----------------------------------------------------
    // RESET QUANTITIES
    // -----------------------------------------------------

    quantityOptions.forEach((option) => {

        option.classList.remove(
            "has-quantity"
        );


        const value =
            option.querySelector(
                ".quantity-value"
            );


        if (value) {

            value.textContent =
                "0";

        }

    });


    // -----------------------------------------------------
    // RESET FULFILMENT
    // -----------------------------------------------------

    fulfilmentOptions.forEach(
        (option) => {

            option.classList.remove(
                "selected"
            );

        }
    );


    // -----------------------------------------------------
    // RESET STEP BUTTONS
    // -----------------------------------------------------

    if (mealNext) {

        mealNext.disabled =
            true;

    }


    // IMPORTANT:
    //
    // Protein is optional.
    //
    // We start Step 2 disabled only because
    // there is no meal yet.
    //
    // Once a meal is selected,
    // updateOrderSummary() enables it.

    if (proteinNext) {

        proteinNext.disabled =
            true;

    }


    // -----------------------------------------------------
    // RESET FINAL BUTTON
    // -----------------------------------------------------

    if (placeFinalOrder) {

        placeFinalOrder.disabled =
            true;


        placeFinalOrder.innerHTML = `

            <span>
                Place order
            </span>

            <span>
                ↗
            </span>

        `;


        placeFinalOrder.classList.remove(
            "order-success"
        );

    }


    // -----------------------------------------------------
    // RESET STEP
    // -----------------------------------------------------

    showOrderStep(1);


    // -----------------------------------------------------
    // RESET SUMMARY
    // -----------------------------------------------------

    updateOrderSummary();


    if (finalOrderDetails) {

        finalOrderDetails.innerHTML =
            "";

    }


    if (finalOrderTotal) {

        finalOrderTotal.textContent =
            "₦0";

    }

}


// =========================================================
// INITIAL STATE
// =========================================================
//
// Make absolutely sure the Signature menu and order modal
// start closed when the page loads.
//

if (signatureMenuPanel) {

    signatureMenuPanel.classList.remove(
        "is-open"
    );

    signatureMenuPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (signatureMenuToggle) {

    setSignatureMenuButton(false);

}


if (orderModal) {

    orderModal.classList.remove(
        "is-open"
    );

    orderModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


document.body.classList.remove(
    "order-modal-open"
);

document.body.classList.remove(
    "mobile-menu-open"
);


// Initialize order state.

resetOrder();
// =========================================================
// "SEE THE PLATES" → OPEN MENU + JUMP TO ITEM
// =========================================================
const foodCardLinks = document.querySelectorAll(".food-card-link[data-menu-target]");

foodCardLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetName = link.getAttribute("data-menu-target");
        const platesSection = document.querySelector("#plates");

        if (platesSection) {
            platesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        openSignatureMenu();

        setTimeout(() => {
            const menuItems = document.querySelectorAll(".menu-item");

            menuItems.forEach((item) => {
                item.classList.remove("is-highlighted");
                const title = item.querySelector("h4");

                if (title && title.textContent.trim() === targetName) {
                    item.classList.add("is-highlighted");
                    item.scrollIntoView({ behavior: "smooth", block: "center" });

                    setTimeout(() => {
                        item.classList.remove("is-highlighted");
                    }, 2800);
                }
            });
        }, 500);
    });
});