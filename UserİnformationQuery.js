// nodejs kütüphanesini dahil ediyoruz
const fs = require("fs");

// Kaydedilecek dosya konumunu belirliyoruz
const dir = "./UserData";
const jsonDir = dir + "/UserData.json";

// Kullanıcı bilgilerini json dosyasına kaydeden fonksiyon
function saveUser(user) {
  // Eğer dosya klasörü yoksa oluşturuyor
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.appendFile(jsonDir, "", function (err) {
      if (err) throw err;
      console.log("Klasör ve dosya oluşturuldu.");
    });
  }
  // Dosya var ise içeriğini okuyor ve güncelliyor
  fs.readFile(jsonDir, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    // Okunan içerikte yeni kullanıcı verileri ekleniyor
    users.push(user);

    // Güncellenen içerik dosyaya yazılıyor
    fs.writeFile(jsonDir, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("Kullanıcı bilgileri dosyaya kaydedildi.");
    });
  });
}


// Id li kullanıcıyı siler
function deleteUserById(id) {
  // json dosyasını okuma
  fs.readFile(jsonDir, 'utf8', (err, data) => {
    // dosya okunurken hata varsa hata mesajı yazdırma
    if (err) {
      console.error(err);
      return;
    }
    let users = [];
    // dosyadan okunan veri varsa parse etme
    if (data) {
      users = JSON.parse(data);
    }
    // id değerine göre filtreleme yaparak kullanıcıyı bulma
    const userToDelete = users.find(user => user.id === id);
    // bulunan kullanıcı varsa silme
    if (userToDelete) {
      const updatedUsers = users.filter(user => user.id !== id);
      // güncellenmiş kullanıcıları json dosyasına yazma
      fs.writeFile(jsonDir, JSON.stringify(updatedUsers), (err) => {
        // dosyaya yazarken hata varsa hata mesajı yazdırma
        if (err) {
          console.error(err);
          return;
        }
        // silme işlemi başarılı mesajı yazdırma
        console.log(`Kullanıcı (id: ${id}) silindi.`);
      });
    } else {
      // silmek istenen kullanıcı bulunamadı mesajı yazdırma
      console.log(`Kullanıcı (id: ${id}) bulunamadı.`);
    }
  });
}


function updateUser(id, newUsername, newPassword, newAvatar) {
  fs.readFile(jsonDir, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let users = [];
    if (data) {
      users = JSON.parse(data);
    }
    // id değerine göre filtreleme yaparak kullanıcıyı bulma
    const userToUpdate = users.find(user => user.id === id);
    // bulunan kullanıcı varsa güncelleme
    if (userToUpdate) {
      userToUpdate.username = newUsername;
      userToUpdate.password = newPassword;
      userToUpdate.avatar = newAvatar;
      fs.writeFile(jsonDir, JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Kullanıcı (id: ${id}) güncellendi.`);
      });
    } else {
      console.log(`Kullanıcı (id: ${id}) bulunamadı.`);
    }
  });
}



// Kaydedilen kullanıcı bilgilerinin okunması için fonksiyon
function getUser() {
  fs.readFile(jsonDir, "utf8", (err, data) => {
    return JSON.parse(data);
  });
}


saveUser({id:1,Username:"Eren",Password:1234,Avatar:"avatar.png"})




