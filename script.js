const getScheme = document.getElementById('get-scheme');
const colorPicker = document.getElementById('colorPicker');
const schemeMode = document.getElementById('schemeMode');

getScheme.addEventListener('click', () => {    
    document.getElementById('spinner').style.display = 'flex';
    const color = colorPicker.value.slice(1);
    const mode = document.getElementById('schemeMode').value;
    // const count = document.getElementById('count').value;
    const count = 5;
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=${count}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data) {
            document.getElementById('spinner').style.display = 'none';
            let colors = data.colors;
            let schemeHTML = '';
            colors.forEach(color => {
                schemeHTML += 
                `<div data-hexvalue="${color.hex.value}" class="color-scheme-item"  style="background-color: ${color.hex.value};">
                   <p class="color-value" style="color: ${color.contrast.value}">${color.hex.value}</p>
                </div>
                `;
            });
            document.getElementById('color-scheme-container').innerHTML = schemeHTML;
            }
            
            // schemeContainer.innerHTML = schemeHTML;
        })
        .catch(error => {
            console.error('Error fetching color scheme:', error);
            alert('Failed to fetch color scheme. Please try again later.');
            document.getElementById('spinner').style.display = 'none';
        });
});


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('color-scheme-item') || event.target.classList.contains('color-value')) {
        const hexValue = event.target.dataset.hexvalue || event.target.parentElement.dataset.hexvalue;
        console.log(hexValue);
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                alert(`Copied ${hexValue} to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }
});
