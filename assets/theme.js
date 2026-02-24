/**
 * GSD Shop - Theme JavaScript
 */

(function () {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Variant selector - update hidden select when option dropdowns change
  function initVariantSelectors() {
    var variantOptions = document.querySelectorAll('.variant-option select');
    var variantSelector = document.querySelector('.variant-selector');

    if (!variantOptions.length || !variantSelector) return;

    variantOptions.forEach(function (option) {
      option.addEventListener('change', function () {
        var selectedOptions = Array.from(variantOptions).map(function (el) {
          return el.value;
        });
        var optionString = selectedOptions.join(' / ');

        for (var i = 0; i < variantSelector.options.length; i++) {
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
    var quantityInputs = document.querySelectorAll('.cart-item-quantity input');

    quantityInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        var line = this.dataset.line;
        var quantity = this.value;

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

  // Collection sorting
  function initCollectionSort() {
    var sortSelect = document.getElementById('SortBy');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initVariantSelectors();
    initCartQuantity();
    initCollectionSort();
  });
})();
