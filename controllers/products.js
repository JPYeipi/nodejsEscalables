const { response, request } = require("express");

const Product = require("../models/product");
const { ProductsRepository } = require("../repositories/product");

const products = [
  {
    "_id": "1",
    "title": "Galaxy Fit3",
    "price": 799.00,
    "description": "Reconoce y rastrea automáticamente los entrenamientos populares para ti, incluidos correr, la máquina elíptica, máquinas de remo y ahora incluso nadar en la alberca.",
    "category": "Dispositivo inteligente",
  "type": "Smartwatch",
    "image": "https://images.samsung.com/is/image/samsung/p6pim/mx/sm-r390nidamxo/gallery/mx-galaxy-fit3-r390-sm-r390nidamxo-539854884?$650_519_PNG$",
    "marca":"Samsung",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
  },
  {
    "_id": "2",
    "title": "Laptop HP OMEN 14-fb0000la Intel Ultra 1TB SSD NVIDIA RTX 4060",
    "price": 37999.00,
    "description": "Experimenta una combinación de diseño premium y alto desempeño con nuestro dispositivo ultradelgado y ligero completamente metálico. Disfruta de una batería de larga duración, una carga rápida USB-C™ y un procesador Intel® Core™ Ultra, gráficos NVIDIA® GeForce RTX™ serie 40 y una pantalla OLED de 2,8K a 120 Hz. Ideal para todas las necesidades informáticas, incluidos los juegos.",
    "category": "Computadoras",
  "type": "Laptop",
    "image": "https://d22k5h68hofcrd.cloudfront.net/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/A/0/A0AP2LA-1_T1712162223.png",
    "marca":"HP",
    "rating": {
        "rate": 4.1,
        "count": 259
    }
  },
  {
    "_id": "3",
    "title": "Redmi Buds 5 Pro",
    "price": 887.00,
    "description": "Cada auricular cuenta con un tweeter de 10mm y un subwoofer dinámico de 11mm, proporcionando un sonido potente en graves y claridad en medios y agudos. Capaces de reducir hasta 52dB de ruido ambiental, con inteligencia artificial para un aislamiento mejorado.",
    "category": "Audio",
  "type": "Audifonos",
    "image": "https://http2.mlstatic.com/D_NQ_NP_900825-MLU73888131739_012024-O.webp",
    "marca":"Xiaomi",
    "rating": {
        "rate": 4.7,
        "count": 500
    }
  },
  {
    "_id": "4",
    "title": "Pro Display XDR",
    "price": 109999.00,
    "description": "Pantalla Retina 6K de 32 pulgadas. Impactante precisión de color, ángulo de visión superamplio y rango dinámico extremo.",
    "category": "TV & video",
  "type": "Television",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/pro-display-hero_FV1?wid=820&hei=474&fmt=jpeg&qlt=90&.v=1572997644832",
    "marca":"Apple",
    "rating": {
        "rate": 2.1,
        "count": 430
    }
  },
  {
    "_id": "5",
    "title": "Refrigerador Top Freezer 14 pies³ INVERTER",
    "price": 15288.60,
    "description": "Basado en los resultados de la prueba TÜV utilizando el método de prueba interno de LG que mide el tiempo que tardó en alcanzar la tasa de reducción de peso del 5% de pak choi en el estante del compartimiento de alimentos frescos del modelo LGE LinearCooling. Solo modelos aplicables. El resultado puede variar en el uso real.",
    "category": "Electrodomésticos",
     "type": "Refrigerador",
    "image": "https://www.lg.com/content/dam/channel/wcms/mx/images/refrigeradores/vt40bjp_ackfmxm_enms_mx_c/Basic-450.jpg",
    "marca":"LG",
    "rating": {
        "rate": 4.6,
        "count": 400
    }
  },
  {
    "_id": "6",
    "title": "Microondas IO IO110MDI 1.1 de acero inoxidable con espejo",
    "price": 4716.00,
    "description": "6 menús de autococción que te permiten calentar o cocinar personalizando el tiempo. Función Grill, te permite gratinar y dorar tus platillos. 10 niveles de potencia que te permiten cocinar una gran variedad de alimentos",
    "category": "Electrodomésticos",
    "type": "Microondas",
    "image": "https://m.media-amazon.com/images/I/61EOQbMcJtL._AC_SL1000_.jpg",
    "marca":"Mabe",
    "rating": {
        "rate": 3.9,
        "count": 70
    }
  },
  {
    "_id": "7",
    "title": "Lenovo Tab P12 - Storm Grey",
    "price": 7699.00,
    "description": "Todo lo que la tablet de alta gama Lenovo Tab P12 te exige es que te tomes un tiempo para ti. Disfruta de sonidos e imágenes cinematográficas en cualquier sitio con una calidad de transmisión de 1080p y altavoces JBL equipados con tecnología Dolby Atmos®. Relájate por completo con el sofisticado ajuste de luz ambiental que se adapta a tu disfrute visual y al brillo de tu entorno. Siéntate, transmite y relájate con una pantalla de 12” fabricada especialmente para que te diviertas, tanto si estás realizando un curso como si te estás preparando para un examen.",
    "category": "Dispositivo inteligente",
    "type": "Tablet",
    "image": "https://p4-ofp.static.pub//fes/cms/2024/04/22/5jg3gbx15j5o83q5t04cwaashecvix467641.png",
    "marca":"Lenovo",
    "rating": {
        "rate": 3,
        "count": 400
    }
  },
  {
    "_id": "8",
    "title": "Mini proyector multimedia HD de 2105 lm (85 ANSI lm), portátil",
    "price": 1790.00,
    "description": "Con este proyector disfruta películas, eventos deportivos, videos, fotos y más para pasar horas de diversión con tu familia y amigos.",
    "category": "TV & video",
    "type": "Proyector",
    "image": "https://www.steren.com.mx/media/catalog/product/cache/bb0cad18a6adb5d17b0efd58f4201a2f/image/22645976d/mini-proyector-multimedia-hd-de-2105-lm-85-ansi-lm-portatil.jpg",
    "marca":"Steren",
    "rating": {
        "rate": 1.9,
        "count": 100
    }
  },
  {
    "_id": "9",
    "title": "Galaxy Ring",
    "price": 7999.00,
    "description": "Galaxy Ring y Samsung Health monitorean juntos tu sueño general para brindarte información. Obtén asesoramiento basado en tus datos de sueño para mejorar tus hábitos.",
    "category": "Dispositivo inteligente",
    "type": "Smartring",
    "image": "https://images.samsung.com/is/image/samsung/assets/mx/galaxy-ring/buy/01_image-gallery/01_titanium-black/01-1_Image-Gallery_Titanium-Black_Front-PC.jpg?imbypass=true",
    "marca":"Samsung",
    "rating": {
        "rate": 1.9,
        "count": 100
    }
  },
  {
    "_id": "10",
    "title": "iPhone 16 Pro",
    "price": 25999.00,
    "description": "Como parte de nuestros esfuerzos por ser neutros en carbono para 2030, el iPhone 16 Pro y el iPhone 16 Pro Max no incluyen adaptador de corriente ni EarPods. Se incluye un cable USB-C de carga rápida compatible con puertos de computadora y adaptadores de corriente USB-C.",
    "category": "Dispositivo inteligente",
    "type": "Smartphone",
    "image": "data:image/jpeg;base64,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",
    "marca":"Apple",
    "rating": {
        "rate": 1.9,
        "count": 100
    }
  },
  {
    "_id": "11",
    "title": "Correa loop deportiva color ciruela para caja de 46 mm",
    "price": 1099.00,
    "description": "La correa loop deportiva es suave, ligera y transpirable, y tiene un cierre adhesivo ajustable. El tejido de nylon de doble capa tiene una trama compacta en la parte que está en contacto con la piel, lo que brinda más comodidad y evita que se acumule la humedad. Está hecha con un 82% de hilo reciclado, que incluye materiales provenientes de redes de pesca desechadas.",
    "category": "Dispositivo inteligente",
    "type": "Accesorios",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXL63?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1724186591572",
    "marca":"Apple",
    "rating": {
        "rate": 1.9,
        "count": 100
    }
  }
  ];

const getAllProducts = async (req = request, res = response) => {
  const { searchTerm } = req.query;
    try{
      const result = await ProductsRepository.getAll({title: RegExp(searchTerm)});
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json({
        msg: "Error al obtener los datos"
      });
    }
}

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  try{
    const result = await ProductsRepository.getById(id);
    if(result == null){
      res.status(404).json({
        msg: "No se encontró el producto"
      });
      return;
    }
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los datos"
    })
  }
}

const createNewProducts = async (req = request, res = response) => {

  const {title, price, description, category, type, image, marca, rating} = req.body;
  const productData = {title, price, description, category, type, image, marca, rating};

  if( !title || !price || !description || !category || !type || !image || !marca || !rating){
    return res.status(400).json({
      msg: "Información incompleta"
    })
  }

  try{
    const savedProduct = await ProductsRepository.create(productData); //Crear en la bd
    res.status(201).json(
      savedProduct
    )
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar el nuevo elemento"
    })
  }
}

const deleteTvShow = async (req = request, res = response) =>{
  const { id } = req.params;
  try{
    const deletedProduct = await ProductsRepository.deleteById(id);
    res.status(200).json({
      msg: `Producto con id: ${id} borrado`,
      deletedProduct
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al borrar los datos"
    })
  }
}

const updateTvShow = async (req = request, res = response) =>{
  const { id } = req.params;

  const {title, price, description, category, type, image, marca, rating} = req.body;
  const productData = {title, price, description, category, type, image, marca, rating};

  if( !title || !price || !description || !category || !type || !image || !marca || !rating){
    return res.status(400).json({
      msg: "Información incompleta"
    })
  }

  try{
    const updatedProduct = await ProductsRepository.updateById(id, productData);
    res.status(200).json({
      updatedProduct,
      productData
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al editar los datos"
    })
  }
}




module.exports = {
    getAllProducts,
    createNewProducts,
    getProductById,
    deleteTvShow,
    updateTvShow
}