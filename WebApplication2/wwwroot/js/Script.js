document.addEventListener("DOMContentLoaded", function () {
    var colorOptions = document.querySelectorAll('input[name="color"]');
    var storageOptions = document.querySelectorAll('input[name="storage"]');
    var priceDisplay = document.getElementById("price");
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const productTitle = document.getElementById('product-title');
    const ozellik1 = document.getElementById('ozellik1');
    const gbOptions = document.querySelectorAll('input[name="storage"]');
    const thumbnailImages = document.querySelectorAll('.thumbnail');
    let selectedColor = "blue";

    var prices = {
        blue: {
            128: 36999,
            256: 46999,
            512: 56999
        },
        red: {
            128: 37999,
            256: 47999,
            512: 57999
        },
        green: {
            128: 38999,
            256: 48999,
            512: 58999
        }
    };

    colorOptions.forEach(function (option) {
        if (option.value === "blue") {
            option.checked = true;
        }
    });
    storageOptions.forEach(function (option) {
        if (option.value === "128") {
            option.checked = true;
        }
    });

    function updateDetails() {
        var selectedColor, selectedStorage, price, imageUrl;
        colorOptions.forEach(function (option) {
            if (option.checked) {
                selectedColor = option.value;
            }
        });
        storageOptions.forEach(function (option) {
            if (option.checked) {
                selectedStorage = option.value;
            }
        });
        if (selectedColor && selectedStorage) {
            price = prices[selectedColor][selectedStorage];

            priceDisplay.textContent = new Intl.NumberFormat('tr-TR').format(price) + " TL";
            imageUrl = "/Images/Iphone_" + selectedColor + ".jpg";
            mainImage.innerHTML = '<img src="' + imageUrl + '" alt="Ürün Resmi">';
        } else {
            priceDisplay.textContent = "Fiyat";
        }
    }

    colorOptions.forEach(function (option) {
        option.addEventListener("change", updateDetails);
    });
    storageOptions.forEach(function (option) {
        option.addEventListener("change", updateDetails);
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const imageUrl = this.getAttribute('src');
            mainImage.setAttribute('src', imageUrl);
        });
    });

    const colors = document.getElementsByName('color');
    const storages = document.getElementsByName('storage');

    colors.forEach(color => {
        color.addEventListener('click', updateProductTitle);
    });

    storages.forEach(storage => {
        storage.addEventListener('click', updateProductTitle);
    });

    function updateProductTitle() {
        const selectedColor = document.querySelector('input[name="color"]:checked').value;
        const selectedStorage = document.querySelector('input[name="storage"]:checked').value;

        let color;
        switch (selectedColor) {
            case 'blue':
                color = 'Mavi';
                break;
            case 'red':
                color = 'Kırmızı';
                break;
            case 'green':
                color = 'Yeşil';
                break;
            default:
                color = 'Mavi';
        }

        productTitle.textContent = `iPhone 13: ${color} - ${selectedStorage} GB`;
    }

    gbOptions.forEach(option => {
        option.addEventListener('change', function () {
            ozellik1.innerHTML = "<strong>Kapasite:</strong> " + this.value + " GB";
        });
    });

    colorOptions.forEach(option => {
        if (option.value === selectedColor) {
            option.checked = true;
        }
    });

    function updateImages(color) {
        mainImage.src = "lib/Iphone13_" + selectedColor + ".jpg";
        let imageUrl = mainImage.src;
        imageUrl = imageUrl.replace('/Home', '');
        imageUrl = imageUrl.replace(/\/+$/, '');
        mainImage.src = imageUrl;

        thumbnailImages.forEach(image => {
            const dataColor = image.getAttribute('data-color');
            if (dataColor === color) {
                image.style.display = 'inline-block';
            } else {
                image.style.display = 'none';
            }
        });
    }

    colorOptions.forEach(option => {
        option.addEventListener('change', function () {
            selectedColor = this.value;
            updateImages(selectedColor);
        });
    });
    colorOptions.forEach(function(option) {
        option.addEventListener("change", function() {
            if (this.value === "red") {
                document.getElementById("gb256").disabled = true;
            } else {
                document.getElementById("gb256").disabled = false;
            }
        });
    });

    updateImages(selectedColor);
    updateDetails();
});

