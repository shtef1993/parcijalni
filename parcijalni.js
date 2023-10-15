async function searchShows() {
      const searchTerm = document.getElementById('searchInput').value;
      const resultsTable = document.getElementById('resultsTable');
      const resultsBody = document.getElementById('results');
      const loader = document.getElementById('loader');

      resultsBody.innerHTML = '';

      if (searchTerm.trim() === '') {
        resultsBody.innerHTML = '<tr><td colspan="4">Unesite traženi pojam.</td></tr>';
        return;
      }

      loader.style.display = 'block';

      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const data = await response.json();

        loader.style.display = 'none';

        if (data.length === 0) {
          resultsBody.innerHTML = '<tr><td colspan="4">Nema rezultata za traženi pojam.</td></tr>';
          return;
        }

        data.forEach(show => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = show.show.name;
          row.appendChild(nameCell);

          const genreCell = document.createElement('td');
          genreCell.textContent = show.show.genres.join(', ');
          row.appendChild(genreCell);

          const summaryCell = document.createElement('td');
          summaryCell.textContent = show.show.summary;
          row.appendChild(summaryCell);

          const ratingCell = document.createElement('td');
          ratingCell.textContent = show.show.rating.average || 'N/A';
          row.appendChild(ratingCell);

          resultsBody.appendChild(row);
        });
      } catch (error) {
        loader.style.display = 'none';
        resultsBody.innerHTML = '<tr><td colspan="4">Dogodila se greška, pokušajte kasnije.</td></tr>';
      }
    }