# Next.js Activity Indicator

Next.js projelerinde kullanılmak üzere tasarlanmış modern ve özelleştirilebilir aktivite göstergesi (loading spinner) bileşeni.

## ✨ Özellikler

- 🎨 **Özelleştirilebilir** - Boyut ve renk seçenekleri
- 🔧 **TypeScript Desteği** - Tam tip güvenliği
- 🎯 **Next.js Optimized** - Next.js projelerine özel optimize edilmiş
- 📱 **Responsive** - Tüm cihazlarda mükemmel görünüm
- 🎭 **CSS Modules** - Stil çakışmalarını önler
- ⚡ **Hafif** - Minimal dosya boyutu

## 🚀 Kurulum

```bash
npm install @avicennatechnology/next-activity-indicator
```

```bash
yarn add @avicennatechnology/next-activity-indicator
```

```bash
pnpm add @avicennatechnology/next-activity-indicator
```

## 📖 Kullanım

### Temel Kullanım

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';

function MyComponent() {
  return (
    <div>
      <ActivityIndicator />
    </div>
  );
}
```

### Boyut Seçenekleri

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';

function MyComponent() {
  return (
    <div>
      <ActivityIndicator size="small" />
      <ActivityIndicator size="medium" />
      <ActivityIndicator size="large" />
    </div>
  );
}
```

### Renk Özelleştirme

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';

function MyComponent() {
  return (
    <div>
      <ActivityIndicator color="#3b82f6" />
      <ActivityIndicator color="#ef4444" />
      <ActivityIndicator color="#10b981" />
    </div>
  );
}
```

### Loading State ile Kullanım

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';
import { useState, useEffect } from 'react';

function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ActivityIndicator size="large" />
      </div>
    );
  }

  return <div>{/* Veri gösterimi */}</div>;
}
```

### Next.js Sayfa Geçişleri

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <ActivityIndicator size="large" />
        </div>
      )}
      {children}
    </div>
  );
}
```

### API Çağrıları ile Kullanım

```jsx
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';
import { useState } from 'react';

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await loginUser(formData);
      // Başarılı giriş
    } catch (error) {
      // Hata yönetimi
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form alanları */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          'Giriş Yap'
        )}
      </button>
    </form>
  );
}
```

## 🎛️ API Referansı

### ActivityIndicator Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Spinner'ın boyutu |
| `color` | `string` | `undefined` | Spinner'ın rengi (CSS renk değeri) |
| `className` | `string` | `undefined` | Ek CSS sınıfı |
| `style` | `React.CSSProperties` | `undefined` | Inline stil |
| `...props` | `HTMLAttributes<HTMLDivElement>` | - | Tüm div özellikleri |

### Boyut Seçenekleri

- **small**: 0.8rem (12.8px)
- **medium**: 1.2rem (19.2px) 
- **large**: 1.8rem (28.8px)

## 🎨 Özelleştirme

### CSS Değişkenleri

Bileşen aşağıdaki CSS değişkenlerini kullanır:

```css
.activity-indicator {
  --spinner-color: #71717a; /* Varsayılan renk */
  --spinner-size: 1.2rem;   /* Varsayılan boyut */
}
```

### Özel Stiller

```jsx
<ActivityIndicator 
  style={{ 
    '--spinner-color': '#3b82f6',
    '--spinner-size': '2rem'
  }}
/>
```

## 💡 Örnekler

### Veri Yükleme

```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-8">
          <ActivityIndicator size="large" />
          <p className="mt-4 text-gray-600">Ürünler yükleniyor...</p>
        </div>
      ) : (
        <div>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Form Gönderimi

```jsx
function ContactForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await sendMessage(message);
      setMessage('');
      alert('Mesaj gönderildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mesajınızı yazın..."
        disabled={sending}
      />
      <button type="submit" disabled={sending}>
        {sending ? (
          <span className="flex items-center gap-2">
            <ActivityIndicator size="small" color="#ffffff" />
            Gönderiliyor...
          </span>
        ) : (
          'Gönder'
        )}
      </button>
    </form>
  );
}
```

### Sayfa Geçiş Göstergesi

```jsx
// _app.js
import { ActivityIndicator } from '@avicennatechnology/next-activity-indicator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <ActivityIndicator size="large" />
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

## 🛡️ TypeScript Desteği

Bu paket tam TypeScript desteği ile gelir:

```typescript
import { ActivityIndicator, ActivityIndicatorProps } from '@avicennatechnology/next-activity-indicator';

const MySpinner: React.FC<ActivityIndicatorProps> = (props) => {
  return <ActivityIndicator {...props} />;
};
```

## 🎯 Avantajlar

- **Kolay Kullanım**: Tek satırda ekleyebilirsiniz
- **Performans**: Optimize edilmiş CSS animasyonları
- **Esneklik**: Farklı boyut ve renk seçenekleri
- **Uyumluluk**: Next.js ve React ile mükemmel uyum
- **Tip Güvenliği**: Full TypeScript desteği
- **Responsive**: Tüm cihazlarda mükemmel görünüm

## 📦 Build & Yayın

```bash
# Build
npm run build

# Yayın
npm publish
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🆘 Destek

Herhangi bir sorunuz veya öneriniz varsa:
- GitHub Issues'da issue açın
- E-posta: support@avicennatechnology.com

---

Bu paket Next.js projelerinde loading state'lerini yönetmeyi kolaylaştırmak için tasarlanmıştır. ⚡ 