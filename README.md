# 🍽️ QR Menü - Dijital Menü Sistemi

Modern ve kullanıcı dostu bir dijital menü uygulaması. Restoranlar, kafeler ve işletmeler için QR kod ile erişilebilir menü sistemi.

![QR Menu](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Özellikler

### 🎨 Kullanıcı Arayüzü
- **Modern ve Şık Tasarım** - Temiz ve minimalist görünüm
- **Responsive Tasarım** - Mobil, tablet ve masaüstü uyumlu
- **İki Seviyeli Kategori Sistemi** 
  - Ana kategoriler: İçecekler / Yiyecekler
  - Alt kategoriler: Bitki Çayları, Espresso Bar, Tatlılar vb.
- **Ürün Detay Modal** - Ürüne tıklayınca büyük görsel ve detay

### ⚙️ Admin Paneli
- **Yeni Ürün Ekleme** - Tam özellikli ürün ekleme modalı
- **Ürün Düzenleme** - Tüm ürün bilgilerini düzenleme
- **Ürün Silme** - Onay ile ürün silme
- **Kategori Yönetimi** - Yeni kategoriler ekleme ve silme
- **Excel İle Ürün Yükleme** - Toplu ürün ekleme
- **Fiyat Güncelleme** - Sadece fiyatları güncelleyebilme
- **İşletme Ayarları** - Logo ve işletme adı özelleştirme
- **Arama Özelliği** - Ürünlerde arama yapabilme

### 💾 Veri Yönetimi
- **LocalStorage** - Veriler tarayıcıda saklanır
- **Excel İçe/Dışa Aktarma** - Kolay veri yönetimi
- **Offline Çalışma** - İnternet bağlantısı gerektirmez

## 🚀 Kurulum

### Gereksinimler
- Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)
- Python 3 (yerel sunucu için) veya herhangi bir web sunucusu

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/KULLANICI_ADINIZ/qrmenu.git
cd qrmenu
```

2. **Yerel sunucuyu başlatın:**
```bash
python3 -m http.server 8080
```

3. **Tarayıcıda açın:**
```
http://localhost:8080
```

## 📖 Kullanım Kılavuzu

### Yeni Ürün Eklemek

1. Sağ alttaki **⚙️** butonuna tıklayın
2. **"Ürün Yönet"** sekmesine gidin
3. **"+ Yeni Ürün Ekle"** butonuna tıklayın
4. Formu doldurun:
   - **Ürün Adı** (zorunlu)
   - **Ana Kategori** (İçecekler/Yiyecekler)
   - **Alt Kategori** (mevcut kategorilerden seçin veya yeni oluşturun)
   - **Açıklama**
   - **Fiyat** (zorunlu)
   - **Resim URL** (opsiyonel)
5. **"Ürün Ekle"** butonuna tıklayın

### Kategori Yönetimi

1. Admin panelini açın
2. **"Kategori Yönet"** sekmesine gidin
3. İçecekler veya Yiyecekler bölümünde:
   - Yeni kategori adı yazın
   - **"+ Ekle"** butonuna tıklayın
4. Kategori silmek için **×** butonuna tıklayın

### Excel İle Toplu Ürün Ekleme

1. Admin panelinde **"Excel Yükle"** sekmesine gidin
2. [Örnek şablonu indirin](templates.html)
3. Excel dosyanızı hazırlayın (şu sütunlar olmalı):
   - Ana Kategori
   - Alt Kategori
   - Ürün Adı
   - Açıklama
   - Fiyat
   - Resim URL
4. Dosyayı seçin ve **"Yükle ve İçe Aktar"** butonuna tıklayın

### Fiyat Güncelleme

1. Admin panelinde **"Fiyat Güncelle"** sekmesine gidin
2. Excel dosyası hazırlayın (Ürün Adı, Yeni Fiyat sütunları)
3. Dosyayı yükleyin

## 📂 Proje Yapısı

```
qrmenu/
├── index.html          # Ana sayfa
├── templates.html      # Excel şablonları indirme sayfası
├── style.css          # CSS tasarımı
├── app.js             # JavaScript mantığı
└── README.md          # Bu dosya
```

## 🎨 Özelleştirme

### Renk Teması Değiştirme

`style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #5a6c57;      /* Ana renk */
    --primary-dark: #4a5847;       /* Koyu ton */
    --accent-color: #c94b4b;       /* Vurgu rengi */
}
```

### İşletme Bilgileri

Admin panelinde **"Ayarlar"** sekmesinden:
- İşletme adını değiştirin
- Logo yükleyin

## 📊 Excel Şablon Formatı

### Ürün Ekleme Şablonu

| Ana Kategori | Alt Kategori | Ürün Adı | Açıklama | Fiyat | Resim URL |
|--------------|--------------|----------|----------|-------|-----------|
| İçecekler | Bitki Çayları | Coco Chai | kakao çekirdekleri, rooibos... | 245 | |
| Yiyecekler | Tatlılar | Cheesecake | Ev yapımı cheesecake | 85 | |

### Fiyat Güncelleme Şablonu

| Ürün Adı | Yeni Fiyat |
|----------|------------|
| Coco Chai | 250 |
| Cheesecake | 90 |

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **HTML5** - Semantik yapı
- **CSS3** - Modern tasarım, flexbox, grid, animasyonlar
- **JavaScript (ES6+)** - Dinamik içerik yönetimi
- **SheetJS (XLSX)** - Excel dosyası okuma/yazma
- **LocalStorage API** - Veri saklama
- **Google Fonts** - Inter ve Playfair Display fontları

### Tarayıcı Desteği

- ✅ Chrome (önerilen)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🌐 Canlı Demo

Uygulamayı yerel sunucuda çalıştırmak için:

```bash
# Python 3 ile
python3 -m http.server 8080

# Node.js ile (http-server kurulu ise)
npx http-server -p 8080

# PHP ile
php -S localhost:8080
```

Tarayıcıda açın: `http://localhost:8080`

## 📝 Notlar

- Excel dosyalarınızda Türkçe karakter kullanabilirsiniz
- Sütun isimleri büyük/küçük harf duyarlı değildir
- Resim URL'leri boş bırakılabilir (IMAGE COMING SOON görseli gösterilir)
- Ana kategoriler: "İçecekler" ve "Yiyecekler" olmalıdır
- Alt kategoriler otomatik olarak oluşturulur
- Fiyat güncellemede ürün adı tam eşleşmelidir
- Tüm veriler tarayıcınızın LocalStorage'ında saklanır
- Tarayıcı verilerini temizlerseniz ürünler silinir

## 🎯 Gelecek Özellikler

- [ ] Ürün resmi yükleme (dosyadan)
- [ ] QR kod oluşturma
- [ ] Tema değiştirme (açık/koyu mod)
- [ ] Çoklu dil desteği
- [ ] Sipariş sistemi
- [ ] Veritabanı entegrasyonu
- [ ] Ürün stok takibi
- [ ] Kategori sıralama
- [ ] Toplu ürün silme

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştirici

Geliştirici: **Ekibiniz**

## 🙏 Teşekkürler

- [SheetJS](https://sheetjs.com/) - Excel işlemleri için
- [Google Fonts](https://fonts.google.com/) - Fontlar için

## 📞 İletişim

Sorularınız veya önerileriniz için:
- Issue açın
- Pull request gönderin

---

**Not**: Bu uygulama modern web teknolojileri kullanılarak geliştirilmiştir. Referans tasarım: KAKULE QR Menü

**Versiyon**: 1.0.0  
**Son Güncelleme**: Aralık 2025
