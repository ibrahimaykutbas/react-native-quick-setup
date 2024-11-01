# React Native Quick Setup

React Native Quick Setup, hazırladığınız özel bir template ile React Native projesi oluşturmak, proje dizinini kurmak ve temel yapı dosyalarını otomatik olarak eklemek için geliştirilmiş bir araçtır. Bu paket sayesinde, projeye başlarken her defasında manuel olarak kurulum yapmak yerine, yapılandırmalar ve klasör yapısı otomatik olarak hazırlanır.

## Kurulum

Öncelikle, index.js dosyasının çalıştırılabilir olması için gerekli izinleri ayarlayın:

```
chmod +x index.js
```

## Paket Olarak Yayınlamak

Paketinizi npm üzerinde yayınlamak için şu adımları takip edebilirsiniz:

```
npm login
npm publish
```

## Lokal Olarak Çalıştırmak

Geliştirme aşamasında paketi lokal olarak test etmek için:

```
npm link
```

## Kullanım

Projeyi oluşturmak için aşağıdaki komutları kullanın.

```
npx react-native-quick-setup
```

Bu komut, belirlediğiniz dizin ve dosya yapılarını oluşturacak ve gerekli ayarlamaları yapacaktır. İster paket olarak yayınlayarak, ister lokal bağlantı ile projelerinizde hızlıca kullanabilirsiniz.