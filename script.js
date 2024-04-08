// Fetch all Star Wars characters and populate the dropdown list
async function fetchAllCharacters() {
  const apiUrl = 'https://www.swapi.tech/api/people';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const characters = data.results;

      const characterSelect = document.getElementById('characterSelect');
      characters.forEach((character) => {
        const option = document.createElement('option');
        option.textContent = character.name;
        option.value = character.url; // Store character URL as option value
        characterSelect.appendChild(option);
      });
    } else {
      console.error('No characters found in the API response.');
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}

// Function to fetch biometric data of the selected character and display in textarea
async function getCharacterData() {
  const characterUrl = document.getElementById('characterSelect').value;

  if (!characterUrl) {
    alert('Please select a character from the dropdown list.');
    return;
  }

  try {
    const response = await fetch(characterUrl);
    const data = await response.json();

    if (data && data.result && data.result.properties) {
      const character = data.result.properties;
      const biometricData = formatBiometricData(character);
      document.getElementById('characterData').value = biometricData;
    } else {
      document.getElementById('characterData').value =
        'Character data not found. Please try again.';
    }
  } catch (error) {
    console.error('Error fetching character data:', error);
    document.getElementById('characterData').value =
      'An error occurred while fetching data. Please try again later.';
  }
}

// Format character biometric data for display
function formatBiometricData(character) {
  return (
    `Name: ${character.name}\n` +
    `Height: ${character.height} cm\n` +
    `Mass: ${character.mass} kg\n` +
    `Hair Color: ${character.hair_color}\n` +
    `Skin Color: ${character.skin_color}\n` +
    `Eye Color: ${character.eye_color}\n` +
    `Birth Year: ${character.birth_year}\n` +
    `Gender: ${character.gender}`
  );
}

// Populate dropdown list with characters when the page loads
window.onload = function () {
  fetchAllCharacters();
};
