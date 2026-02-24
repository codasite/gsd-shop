/**
 * GSD Shop - Theme JavaScript
 */

(function () {
  'use strict';

  // Variant selector - update hidden select when option dropdowns change
  function initVariantSelectors() {
    const variantOptions = document.querySelectorAll('.variant-option select');
    const variantSelector = document.querySelector('.variant-selector');

    if (!variantOptions.length || !variantSelector) return;

    variantOptions.forEach(function (option) {
      option.addEventListener('change', function () {
        const selectedOptions = Array.from(variantOptions).map(function (el) {
          return el.value;
        });
        const optionString = selectedOptions.join(' / ');

        for (let i = 0; i < variantSelector.options.length; i++) {
          if (variantSelector.options[i].textContent.trim().startsWith(optionString)) {
            variantSelector.selectedIndex = i;
            break;
          }
        }
      });
    });
  }

  // Cart quantity updates
  function initCartQuantity() {
    const quantityInputs = document.querySelectorAll('.cart-item-quantity input');

    quantityInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        const line = this.dataset.line;
        const quantity = this.value;

        fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ line: parseInt(line), quantity: parseInt(quantity) }),
        }).then(function () {
          window.location.reload();
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initVariantSelectors();
    initCartQuantity();
  });
})();
