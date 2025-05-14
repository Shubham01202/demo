// js/listing.js

// Load listings from localStorage or initialize empty array
let listings = JSON.parse(localStorage.getItem('gadgethubListings')) || [];

const listingContainer = document.getElementById('gadget-listings');

function getCurrentUser() {
  const userStr = localStorage.getItem('gadgethubUser');
  return userStr ? JSON.parse(userStr) : null;
}

function renderListings() {
  listingContainer.innerHTML = '';
  const currentUser = getCurrentUser();

  if (listings.length === 0) {
    listingContainer.innerHTML = '<p class="text-center text-muted">No listings yet. Be the first to add a gadget!</p>';
    return;
  }

  listings.forEach(listing => {
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    const img = document.createElement('img');
    img.src = listing.image;
    img.className = 'card-img-top';
    img.alt = `${listing.brand} ${listing.model}`;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `${listing.brand} ${listing.model}`;

    const price = document.createElement('p');
    price.className = 'card-text fw-bold text-primary mb-1';
    price.textContent = `$${listing.price}`;

    const detailsList = document.createElement('ul');
    detailsList.className = 'list-unstyled mb-2 flex-grow-1';
    detailsList.innerHTML = `
      <li><strong>Processor:</strong> ${listing.processor}</li>
      <li><strong>Battery:</strong> ${listing.battery}</li>
      <li><strong>Category:</strong> ${listing.category}</li>
      <li><strong>Condition:</strong> ${listing.condition}</li>
    `;

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(detailsList);

    // Edit and Delete buttons only visible if current user is owner
    if (currentUser && currentUser.username === listing.owner) {
      const btnGroup = document.createElement('div');
      btnGroup.className = 'mt-auto d-flex gap-2';

      const editBtn = document.createElement('a');
      editBtn.href = `add-listing.html?edit=${listing.id}`;
      editBtn.className = 'btn btn-sm btn-outline-primary flex-grow-1';
      editBtn.textContent = 'Edit';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-outline-danger flex-grow-1';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this listing?')) {
          deleteListing(listing.id);
        }
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);
      cardBody.appendChild(btnGroup);
    }

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    listingContainer.appendChild(col);
  });
}

function deleteListing(id) {
  listings = listings.filter(listing => listing.id !== id);
  localStorage.setItem('gadgethubListings', JSON.stringify(listings));
  renderListings();
}

// Render listings when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderListings();
});
