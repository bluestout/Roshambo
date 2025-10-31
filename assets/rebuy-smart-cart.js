(function () {
  const PRESCRIPTION_PRODUCT_ID = 41880794366122;
  let elements = {};
  let debounceTimer = null;

  function toggleUI(show) {
    if (!elements.content || !elements.cartNoteOuter) return;

    elements.content.style.display = show ? 'block' : 'none';
    elements.cartNoteOuter.classList.toggle('isopen', show);
    if (elements.cartNoteHeading) {
      elements.cartNoteHeading.classList.toggle('note-active', show);
    }
  }

  function syncCartToUI(cart) {
    const item = cart.items.find(item => item.id == PRESCRIPTION_PRODUCT_ID);
    const note = item?.properties?.Message || cart.note || '';

    if (item && elements.checkbox) {
      elements.checkbox.checked = true;
      if (elements.textarea) elements.textarea.value = note;
      toggleUI(true);
    }
  }

  function updateCartProduct(note, remove) {
    if (remove) {
      jQuery.post('/cart/change.js', { quantity: 0, id: PRESCRIPTION_PRODUCT_ID });
    } else {
      jQuery.getJSON('/cart.js', function (cart) {
        const existingItem = cart.items.find(item => item.id == PRESCRIPTION_PRODUCT_ID);
        const productData = { quantity: 1, id: PRESCRIPTION_PRODUCT_ID, properties: { 'Message': note } };

        if (existingItem) {
          // Update properties directly using the line item key
          // This updates properties without removing the item
          jQuery.post('/cart/change.js', {
            id: existingItem.key,
            properties: {
              'Message': note
            }
          });
        } else {
          jQuery.post('/cart/add.js', { items: [productData] });
        }
      });
    }
  }

  function initPrescriptionHandler() {
    elements.checkbox = document.getElementById('rebuy-prescription-checkbox');
    elements.textarea = document.getElementById('rebuy-cart-note-content');
    elements.content = document.getElementById('rebuy-prescription-content');
    elements.cartNoteOuter = document.getElementById('rebuy-cart-note-outer');
    elements.cartNoteHeading = document.querySelector('#rebuy-cart-note-outer .yo-cart-note-heading');

    if (elements.checkbox && elements.textarea && elements.content) {
      jQuery.getJSON('/cart.js', syncCartToUI);

      elements.checkbox.addEventListener('change', function () {
        toggleUI(this.checked);
        updateCartProduct(elements.textarea.value, !this.checked);
      });

      elements.textarea.addEventListener('input', function () {
        if (elements.checkbox.checked) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => updateCartProduct(this.value, false), 500);
        }
      });
    }
  }

  window.rebuyUpdateCart = function () {
    if (elements.checkbox?.checked) {
      updateCartProduct(elements.textarea?.value || '', false);
    }
  };

  const init = () => setTimeout(initPrescriptionHandler, 500);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Watch for dynamic content
  new MutationObserver(() => {
    if (!elements.checkbox) initPrescriptionHandler();
  }).observe(document.body, { childList: true, subtree: true });
})();