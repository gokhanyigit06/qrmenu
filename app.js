// ==================== Data Storage ====================
let products = [];
let mainCategories = new Set(['İçecekler', 'Yiyecekler']);
let subCategories = {};
let currentMainCategory = 'İçecekler';
let currentSubCategory = '';
let businessSettings = {
    name: 'KAKULE',
    logo: ''
};

// Load data from localStorage
function loadData() {
    const savedProducts = localStorage.getItem('qr-menu-products');
    const savedSettings = localStorage.getItem('qr-menu-settings');

    if (savedSettings) {
        businessSettings = JSON.parse(savedSettings);
        updateBusinessName();
    }

    if (savedProducts) {
        products = JSON.parse(savedProducts);
        updateSubCategories();
    } else {
        // Sample data matching the reference
        products = [
            {
                id: 1,
                mainCategory: 'İçecekler',
                subCategory: 'Bitki Çayları',
                name: 'Coco Chai',
                description: 'kakao çekirdekleri, rooibos, tarçın, badem, limon otu',
                price: 245,
                image: ''
            },
            {
                id: 2,
                mainCategory: 'İçecekler',
                subCategory: 'Bitki Çayları',
                name: 'Glüh Wein',
                description: 'tarçın, zencefil, kakule, karahindiba, kırmızı karabiber, yıldız anason, karanfil',
                price: 245,
                image: ''
            },
            {
                id: 3,
                mainCategory: 'İçecekler',
                subCategory: 'Bitki Çayları',
                name: 'CAT',
                description: 'assam, antep fıstığı, iran safranı, fas gülü',
                price: 245,
                image: ''
            },
            {
                id: 4,
                mainCategory: 'İçecekler',
                subCategory: 'Bitki Çayları',
                name: 'Vanilla Rooibos',
                description: 'rooibos, çubuk vanilya',
                price: 245,
                image: ''
            },
            {
                id: 5,
                mainCategory: 'İçecekler',
                subCategory: 'Bitki Çayları',
                name: 'Apres Moi',
                description: 'karadut, pembe biber, siyah çay, basra limonu, safran melek otu, çubuk vanilya, portakal kurusu',
                price: 245,
                image: ''
            },
            {
                id: 6,
                mainCategory: 'İçecekler',
                subCategory: 'Demlemeler',
                name: 'Filtre Kahve',
                description: 'Özel çekirdeklerden hazırlanan filtre kahve',
                price: 55,
                image: ''
            },
            {
                id: 7,
                mainCategory: 'İçecekler',
                subCategory: 'Espresso Bar',
                name: 'Espresso',
                description: 'Klasik espresso',
                price: 40,
                image: ''
            },
            {
                id: 8,
                mainCategory: 'İçecekler',
                subCategory: 'Sıcak İçecekler',
                name: 'Sıcak Çikolata',
                description: 'Gerçek çikolata ile hazırlanan',
                price: 50,
                image: ''
            },
            {
                id: 9,
                mainCategory: 'İçecekler',
                subCategory: 'Soğuk İçecekler',
                name: 'Limonata',
                description: 'Taze sıkılmış limonata',
                price: 45,
                image: ''
            },
            {
                id: 10,
                mainCategory: 'İçecekler',
                subCategory: 'Soğuk Kahveler',
                name: 'Ice Latte',
                description: 'Buzlu latte',
                price: 60,
                image: ''
            },
            {
                id: 11,
                mainCategory: 'Yiyecekler',
                subCategory: 'Tatlılar',
                name: 'Cheesecake',
                description: 'Ev yapımı cheesecake',
                price: 85,
                image: ''
            },
            {
                id: 12,
                mainCategory: 'Yiyecekler',
                subCategory: 'Tatlılar',
                name: 'Brownie',
                description: 'Çikolatalı brownie',
                price: 65,
                image: ''
            }
        ];
        saveData();
        updateSubCategories();
    }
}

function saveData() {
    localStorage.setItem('qr-menu-products', JSON.stringify(products));
}

function saveSettings() {
    localStorage.setItem('qr-menu-settings', JSON.stringify(businessSettings));
}

function updateBusinessName() {
    const nameElement = document.getElementById('businessName');
    if (nameElement) {
        nameElement.textContent = businessSettings.name;
    }
}

function updateSubCategories() {
    subCategories = {};

    products.forEach(product => {
        if (!subCategories[product.mainCategory]) {
            subCategories[product.mainCategory] = new Set();
        }
        subCategories[product.mainCategory].add(product.subCategory);
    });

    renderSubCategories();
}

// ==================== Rendering Functions ====================
function renderSubCategories() {
    const subCategoryList = document.getElementById('subCategoryList');
    subCategoryList.innerHTML = '';

    const categories = subCategories[currentMainCategory] || new Set();
    const categoriesArray = Array.from(categories);

    if (categoriesArray.length === 0) {
        subCategoryList.innerHTML = '<p class="info-text">Bu kategoride henüz ürün bulunmamaktadır.</p>';
        return;
    }

    categoriesArray.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'sub-category-btn';
        btn.dataset.subCategory = category;
        btn.textContent = category;

        if (index === 0 && !currentSubCategory) {
            btn.classList.add('active');
            currentSubCategory = category;
        } else if (category === currentSubCategory) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => filterBySubCategory(category));
        subCategoryList.appendChild(btn);
    });

    // Render products for the first/current subcategory
    if (currentSubCategory) {
        renderProducts();
    }
}

function filterByMainCategory(mainCategory) {
    currentMainCategory = mainCategory;
    currentSubCategory = '';

    // Update active main tab button
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mainCategory === mainCategory) {
            btn.classList.add('active');
        }
    });

    renderSubCategories();
}

function filterBySubCategory(subCategory) {
    currentSubCategory = subCategory;

    // Update active sub category button
    document.querySelectorAll('.sub-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.subCategory === subCategory) {
            btn.classList.add('active');
        }
    });

    renderProducts();
}

function renderProducts() {
    const productsList = document.getElementById('productsList');
    const categoryTitle = document.getElementById('categoryTitle');

    // Update category title
    if (categoryTitle) {
        categoryTitle.innerHTML = `<h2>${currentSubCategory}</h2>`;
    }

    // Filter products
    const filteredProducts = products.filter(p =>
        p.mainCategory === currentMainCategory &&
        p.subCategory === currentSubCategory
    );

    if (filteredProducts.length === 0) {
        productsList.innerHTML = '<div class="loading">Bu kategoride henüz ürün eklenmemiş.</div>';
        return;
    }

    productsList.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        if (index % 2 === 1) {
            item.classList.add('alternate');
        }

        const imageHtml = product.image
            ? `<img src="${product.image}" alt="${product.name}" class="product-image">`
            : `<div class="product-image-placeholder">IMAGE<br>COMING<br>SOON</div>`;

        item.innerHTML = `
            <div class="product-image-container">
                ${imageHtml}
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
            </div>
            <div class="product-price">₺${product.price.toFixed(2)}</div>
        `;

        item.addEventListener('click', () => showProductModal(product));
        productsList.appendChild(item);
    });
}

function showProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalImageContainer = modal.querySelector('.modal-image-container');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');

    // Clear previous content
    modalImageContainer.innerHTML = '';

    // Add image or placeholder
    if (product.image) {
        const img = document.createElement('img');
        img.id = 'modalImage';
        img.src = product.image;
        img.alt = product.name;
        img.className = 'modal-image';
        modalImageContainer.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'modal-image-placeholder';
        placeholder.textContent = 'IMAGE COMING SOON';
        modalImageContainer.appendChild(placeholder);
    }

    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description || '';
    modalPrice.textContent = `₺${product.price.toFixed(2)}`;

    modal.classList.add('active');
}

function renderProductList() {
    const productList = document.getElementById('productList');

    if (products.length === 0) {
        productList.innerHTML = '<p class="info-text">Henüz ürün eklenmemiş.</p>';
        return;
    }

    productList.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-item-admin';

        item.innerHTML = `
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.mainCategory} → ${product.subCategory} - ₺${product.price}</p>
            </div>
            <div class="product-actions">
                <button class="btn-sm btn-edit" data-product-id="${product.id}">Düzenle</button>
                <button class="btn-sm btn-delete" data-product-id="${product.id}">Sil</button>
            </div>
        `;

        // Add event listeners
        const editBtn = item.querySelector('.btn-edit');
        const deleteBtn = item.querySelector('.btn-delete');

        editBtn.addEventListener('click', () => editProduct(product.id));
        deleteBtn.addEventListener('click', () => deleteProduct(product.id));

        productList.appendChild(item);
    });
}

// ==================== Excel Functions ====================
function handleExcelUpload(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            // Clear existing products
            products = [];

            // Process each row
            jsonData.forEach((row, index) => {
                const product = {
                    id: Date.now() + index,
                    mainCategory: row['Ana Kategori'] || row['ana kategori'] || 'İçecekler',
                    subCategory: row['Alt Kategori'] || row['alt kategori'] || row['Kategori'] || 'Diğer',
                    name: row['Ürün Adı'] || row['ürün adı'] || row['Urun Adi'] || 'Ürün',
                    description: row['Açıklama'] || row['açıklama'] || row['Aciklama'] || '',
                    price: parseFloat(row['Fiyat'] || row['fiyat'] || 0),
                    image: row['Resim URL'] || row['resim url'] || row['Resim'] || ''
                };
                products.push(product);
            });

            saveData();
            updateSubCategories();
            renderProducts();
            renderProductList();

            showStatus('uploadStatus', `${products.length} ürün başarıyla yüklendi!`, 'success');
        } catch (error) {
            showStatus('uploadStatus', 'Excel dosyası okunurken hata oluştu: ' + error.message, 'error');
        }
    };

    reader.readAsArrayBuffer(file);
}

function handlePriceUpdate(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            let updatedCount = 0;

            // Update prices
            jsonData.forEach(row => {
                const productName = row['Ürün Adı'] || row['ürün adı'] || row['Urun Adi'];
                const newPrice = parseFloat(row['Yeni Fiyat'] || row['yeni fiyat'] || row['Fiyat'] || row['fiyat']);

                const product = products.find(p => p.name === productName);
                if (product && !isNaN(newPrice)) {
                    product.price = newPrice;
                    updatedCount++;
                }
            });

            if (updatedCount > 0) {
                saveData();
                renderProducts();
                renderProductList();
                showStatus('updateStatus', `${updatedCount} ürünün fiyatı güncellendi!`, 'success');
            } else {
                showStatus('updateStatus', 'Güncellenecek ürün bulunamadı.', 'error');
            }
        } catch (error) {
            showStatus('updateStatus', 'Excel dosyası okunurken hata oluştu: ' + error.message, 'error');
        }
    };

    reader.readAsArrayBuffer(file);
}

// ==================== Product Management ====================
let currentEditingProductId = null;

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentEditingProductId = id;

    // Fill the edit form
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductMainCategory').value = product.mainCategory;
    document.getElementById('editProductSubCategory').value = product.subCategory;
    document.getElementById('editProductDescription').value = product.description || '';
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image || '';

    // Show the edit modal
    document.getElementById('editProductModal').classList.add('active');
}

function saveProductEdit() {
    if (!currentEditingProductId) return;

    const product = products.find(p => p.id === currentEditingProductId);
    if (!product) return;

    // Get values from form
    product.mainCategory = document.getElementById('editProductMainCategory').value;
    product.subCategory = document.getElementById('editProductSubCategory').value.trim();
    product.description = document.getElementById('editProductDescription').value.trim();
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.image = document.getElementById('editProductImage').value.trim();

    // Validate
    if (!product.subCategory) {
        showStatus('editStatus', 'Alt kategori boş olamaz!', 'error');
        return;
    }

    if (isNaN(product.price) || product.price < 0) {
        showStatus('editStatus', 'Geçerli bir fiyat girin!', 'error');
        return;
    }

    // Save and update
    saveData();
    updateSubCategories();
    renderProducts();
    renderProductList();

    // Close modal and show success
    document.getElementById('editProductModal').classList.remove('active');
    currentEditingProductId = null;

    // Show success message briefly
    showStatus('editStatus', 'Ürün başarıyla güncellendi!', 'success');
    setTimeout(() => {
        document.getElementById('editStatus').className = 'status-message';
    }, 2000);
}

function deleteProduct(id) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        updateSubCategories();
        renderProducts();
        renderProductList();
    }
}

// ==================== Add New Product ====================
function updateSubCategoryOptions(mainCategory) {
    const subCategorySelect = document.getElementById('addProductSubCategory');
    subCategorySelect.innerHTML = '<option value="">Seçiniz...</option>';

    if (!mainCategory) {
        subCategorySelect.innerHTML = '<option value="">Önce ana kategori seçin...</option>';
        return;
    }

    // Get existing subcategories for this main category
    const existingSubCategories = subCategories[mainCategory] || new Set();

    existingSubCategories.forEach(subCat => {
        const option = document.createElement('option');
        option.value = subCat;
        option.textContent = subCat;
        subCategorySelect.appendChild(option);
    });

    // Add "Other" option
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = '+ Yeni Kategori Ekle';
    subCategorySelect.appendChild(otherOption);
}

function addNewProduct() {
    // Get form values
    const name = document.getElementById('addProductName').value.trim();
    const mainCategory = document.getElementById('addProductMainCategory').value;
    let subCategory = document.getElementById('addProductSubCategory').value;
    const customSubCategory = document.getElementById('addProductSubCategoryCustom').value.trim();
    const description = document.getElementById('addProductDescription').value.trim();
    const price = parseFloat(document.getElementById('addProductPrice').value);
    const image = document.getElementById('addProductImage').value.trim();

    // Use custom subcategory if provided or if "other" is selected
    if (customSubCategory) {
        subCategory = customSubCategory;
    } else if (subCategory === 'other') {
        showStatus('addStatus', 'Lütfen yeni kategori adını girin!', 'error');
        return;
    }

    // Validate
    if (!name) {
        showStatus('addStatus', 'Ürün adı boş olamaz!', 'error');
        return;
    }

    if (!mainCategory) {
        showStatus('addStatus', 'Ana kategori seçmelisiniz!', 'error');
        return;
    }

    if (!subCategory) {
        showStatus('addStatus', 'Alt kategori seçmelisiniz veya yeni kategori adı girin!', 'error');
        return;
    }

    if (isNaN(price) || price < 0) {
        showStatus('addStatus', 'Geçerli bir fiyat girin!', 'error');
        return;
    }

    // Create new product
    const newProduct = {
        id: Date.now(),
        mainCategory: mainCategory,
        subCategory: subCategory,
        name: name,
        description: description,
        price: price,
        image: image
    };

    // Add to products array
    products.push(newProduct);

    // Save and update
    saveData();
    updateSubCategories();
    renderProducts();
    renderProductList();

    // Close modal and reset form
    document.getElementById('addProductModal').classList.remove('active');
    resetAddProductForm();

    // Show success message
    showStatus('addStatus', 'Ürün başarıyla eklendi!', 'success');
    setTimeout(() => {
        document.getElementById('addStatus').className = 'status-message';
    }, 2000);
}

function resetAddProductForm() {
    document.getElementById('addProductName').value = '';
    document.getElementById('addProductMainCategory').value = '';
    document.getElementById('addProductSubCategory').innerHTML = '<option value="">Önce ana kategori seçin...</option>';
    document.getElementById('addProductSubCategoryCustom').value = '';
    document.getElementById('addProductDescription').value = '';
    document.getElementById('addProductPrice').value = '';
    document.getElementById('addProductImage').value = '';
}

// ==================== Category Management ====================
function renderCategoryLists() {
    // Render İçecekler categories
    const iceceklerContainer = document.getElementById('iceceklerCategories');
    const iceceklerCategories = subCategories['İçecekler'] || new Set();

    iceceklerContainer.innerHTML = '';
    if (iceceklerCategories.size === 0) {
        iceceklerContainer.innerHTML = '<p class="info-text">Henüz kategori eklenmemiş.</p>';
    } else {
        iceceklerCategories.forEach(cat => {
            const tag = createCategoryTag(cat, 'İçecekler');
            iceceklerContainer.appendChild(tag);
        });
    }

    // Render Yiyecekler categories
    const yiyeceklerContainer = document.getElementById('yiyeceklerCategories');
    const yiyeceklerCategories = subCategories['Yiyecekler'] || new Set();

    yiyeceklerContainer.innerHTML = '';
    if (yiyeceklerCategories.size === 0) {
        yiyeceklerContainer.innerHTML = '<p class="info-text">Henüz kategori eklenmemiş.</p>';
    } else {
        yiyeceklerCategories.forEach(cat => {
            const tag = createCategoryTag(cat, 'Yiyecekler');
            yiyeceklerContainer.appendChild(tag);
        });
    }
}

function createCategoryTag(categoryName, mainCategory) {
    const tag = document.createElement('div');
    tag.className = 'category-tag';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = categoryName;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'Kategoriyi sil';
    removeBtn.onclick = () => removeSubCategory(categoryName, mainCategory);

    tag.appendChild(nameSpan);
    tag.appendChild(removeBtn);

    return tag;
}

function addSubCategory(mainCategory) {
    const inputId = mainCategory === 'İçecekler' ? 'newIceceklerCategory' : 'newYiyeceklerCategory';
    const input = document.getElementById(inputId);
    const newCategory = input.value.trim();

    if (!newCategory) {
        showStatus('categoryStatus', 'Kategori adı boş olamaz!', 'error');
        return;
    }

    // Check if category already exists
    const existingCategories = subCategories[mainCategory] || new Set();
    if (existingCategories.has(newCategory)) {
        showStatus('categoryStatus', 'Bu kategori zaten mevcut!', 'error');
        return;
    }

    // Add category by creating a dummy product (will be filtered out later if needed)
    // Or we can just update the subCategories directly
    if (!subCategories[mainCategory]) {
        subCategories[mainCategory] = new Set();
    }
    subCategories[mainCategory].add(newCategory);

    // Clear input
    input.value = '';

    // Re-render
    renderCategoryLists();

    showStatus('categoryStatus', `"${newCategory}" kategorisi eklendi!`, 'success');
    setTimeout(() => {
        document.getElementById('categoryStatus').className = 'status-message';
    }, 2000);
}

function removeSubCategory(categoryName, mainCategory) {
    // Check if any products use this category
    const productsInCategory = products.filter(p =>
        p.mainCategory === mainCategory && p.subCategory === categoryName
    );

    if (productsInCategory.length > 0) {
        if (!confirm(`Bu kategoride ${productsInCategory.length} ürün var. Kategoriyi silmek istediğinizden emin misiniz? Ürünler silinmeyecek ama kategorisiz kalacak.`)) {
            return;
        }
    }

    // Remove from subCategories
    if (subCategories[mainCategory]) {
        subCategories[mainCategory].delete(categoryName);
    }

    // Re-render
    renderCategoryLists();
    updateSubCategories();

    showStatus('categoryStatus', `"${categoryName}" kategorisi silindi.`, 'success');
    setTimeout(() => {
        document.getElementById('categoryStatus').className = 'status-message';
    }, 2000);
}

// ==================== Settings Management ====================
function handleLogoUpload(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        businessSettings.logo = e.target.result;
        saveSettings();
        showStatus('settingsStatus', 'Logo başarıyla yüklendi!', 'success');
    };

    reader.readAsDataURL(file);
}

// ==================== UI Functions ====================
function showStatus(elementId, message, type) {
    const statusEl = document.getElementById(elementId);
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;

    setTimeout(() => {
        statusEl.className = 'status-message';
    }, 5000);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', function () {
    // Load initial data
    loadData();
    renderProducts();
    renderProductList();

    // Main tabs
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByMainCategory(btn.dataset.mainCategory);
        });
    });

    // Product modal close
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');

    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    // Edit Product Modal
    const editProductModal = document.getElementById('editProductModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const saveEditBtn = document.getElementById('saveEditBtn');

    closeEditModal.addEventListener('click', () => {
        editProductModal.classList.remove('active');
        currentEditingProductId = null;
    });

    editProductModal.addEventListener('click', (e) => {
        if (e.target === editProductModal) {
            editProductModal.classList.remove('active');
            currentEditingProductId = null;
        }
    });

    saveEditBtn.addEventListener('click', saveProductEdit);

    // Add Product Modal
    const addProductModal = document.getElementById('addProductModal');
    const closeAddModal = document.getElementById('closeAddModal');
    const saveAddBtn = document.getElementById('saveAddBtn');
    const openAddProductBtn = document.getElementById('openAddProductBtn');
    const addMainCategorySelect = document.getElementById('addProductMainCategory');

    openAddProductBtn.addEventListener('click', () => {
        resetAddProductForm();
        addProductModal.classList.add('active');
    });

    closeAddModal.addEventListener('click', () => {
        addProductModal.classList.remove('active');
        resetAddProductForm();
    });

    addProductModal.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
            addProductModal.classList.remove('active');
            resetAddProductForm();
        }
    });

    // Update subcategory options when main category changes
    addMainCategorySelect.addEventListener('change', (e) => {
        updateSubCategoryOptions(e.target.value);
    });

    saveAddBtn.addEventListener('click', addNewProduct);

    // Admin FAB
    const adminFab = document.getElementById('adminFab');
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.getElementById('closeModal');

    adminFab.addEventListener('click', () => {
        adminModal.classList.add('active');
        renderProductList();
        renderCategoryLists();
        // Update settings form
        document.getElementById('businessNameInput').value = businessSettings.name;
    });

    closeModal.addEventListener('click', () => {
        adminModal.classList.remove('active');
    });

    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.classList.remove('active');
        }
    });

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${targetTab}Tab`).classList.add('active');
        });
    });

    // Settings
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    saveSettingsBtn.addEventListener('click', () => {
        const newName = document.getElementById('businessNameInput').value;
        if (newName.trim()) {
            businessSettings.name = newName.trim();
            saveSettings();
            updateBusinessName();
            showStatus('settingsStatus', 'Ayarlar başarıyla kaydedildi!', 'success');
        }
    });

    const logoUpload = document.getElementById('logoUpload');
    logoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleLogoUpload(file);
        }
    });

    // Excel upload
    const uploadBtn = document.getElementById('uploadBtn');
    const excelFile = document.getElementById('excelFile');

    uploadBtn.addEventListener('click', () => {
        const file = excelFile.files[0];
        if (!file) {
            showStatus('uploadStatus', 'Lütfen bir Excel dosyası seçin.', 'error');
            return;
        }
        handleExcelUpload(file);
    });

    // Price update
    const updatePriceBtn = document.getElementById('updatePriceBtn');
    const priceFile = document.getElementById('priceFile');

    updatePriceBtn.addEventListener('click', () => {
        const file = priceFile.files[0];
        if (!file) {
            showStatus('updateStatus', 'Lütfen bir Excel dosyası seçin.', 'error');
            return;
        }
        handlePriceUpdate(file);
    });

    // Search functionality
    const searchProduct = document.getElementById('searchProduct');
    searchProduct.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.subCategory.toLowerCase().includes(searchTerm) ||
            p.mainCategory.toLowerCase().includes(searchTerm)
        );

        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        filteredProducts.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product-item-admin';

            item.innerHTML = `
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.mainCategory} → ${product.subCategory} - ₺${product.price}</p>
                </div>
                <div class="product-actions">
                    <button class="btn-sm btn-edit" data-product-id="${product.id}">Düzenle</button>
                    <button class="btn-sm btn-delete" data-product-id="${product.id}">Sil</button>
                </div>
            `;

            // Add event listeners
            const editBtn = item.querySelector('.btn-edit');
            const deleteBtn = item.querySelector('.btn-delete');

            editBtn.addEventListener('click', () => editProduct(product.id));
            deleteBtn.addEventListener('click', () => deleteProduct(product.id));

            productList.appendChild(item);
        });
    });
});
