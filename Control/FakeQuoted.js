/* 

   ####### Selfbot Version 2 ########
   
   Developer: 
   - Skyzopedia (+6283181145670)
   
   Recode:
   - Isi namamu (sosmed)
   
   # Penting
   Jangan hapus credits atau nama developer
   hargai pembuat script ini!

*/

require("../settings.js")

const FakeTransaksi = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    locationMessage: {
      name: `${namaOwner} Marketplace`, 
      jpegThumbnail: ''
    }
  }
}

const FakeLiveLoc = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    liveLocationMessage: {
    degreesLatitude: -999,
    degreesLongitude: 99999,
    sequenceNumber: "99999",
    caption: `Powered by ${namaOwner}`, 
    jpegThumbnail: ""
  }
  }
}

const FakeMarket = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    productMessage: {
      product: {
        productImage: {
          mimetype: 'image/jpeg',
          jpegThumbnail: ''
        },
        title: `${namaOwner} - Marketplace`,
        description: '',
        currencyCode: 'USDT',
        priceAmount1000: '9000',
        retailerId: ``,
        productImageCount: 1
      },
      businessOwnerJid: '0@s.whatsapp.net'
    }
  }
};

module.exports = { FakeLiveLoc, FakeMarket, FakeTransaksi }