const addToCollectionButtons = document.querySelectorAll('.add-to-collection-button');
      
addToCollectionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bookId = button.getAttribute('data-bookid');
    const bookData = books[bookId];

    fetch('/add-to-collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Book added to your collection');
        } else {
          alert('Failed to add the book to your collection');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});