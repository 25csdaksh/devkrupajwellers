import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LogOut, Plus, Image as ImageIcon, Trash2, Loader2, Edit2, X, Search, Filter, Mail, Phone, Calendar } from 'lucide-react';
import { customProducts } from '../firebase/customProductsData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('gold'); // 'gold' | 'silver' | 'custom'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Edit mode state
  const [editProduct, setEditProduct] = useState(null); // holds product object when editing

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Rings');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageSourceType, setImageSourceType] = useState('file'); // 'file' | 'url'
  const [imageUrlInput, setImageUrlInput] = useState('');
  
  // Specifications State (Optional/Premium attributes)
  const [weight, setWeight] = useState('');
  const [purity, setPurity] = useState('');
  const [material, setMaterial] = useState('');
  const [diamondCut, setDiamondCut] = useState('');

  // Categories list per collection
  const categoriesByTab = {
    gold: ['Rings', 'Bridal Collection', 'Diamond Necklaces', 'Earrings', 'Bangles', 'Mangalsutra'],
    silver: ['Silver Payal', 'Silver Kamarband', 'Pooja Items', 'Silver Bracelet', 'Silver Rings'],
    custom: ['Silver Articles', 'Bespoke Lifestyle', 'Men\'s Couture', 'Body Couture', 'Bespoke Accessories', 'Hair Couture']
  };

  const getCollectionName = (tab) => {
    if (tab === 'silver') return 'silver_products';
    if (tab === 'custom') return 'custom_products';
    if (tab === 'inquiries') return 'contact_inquiries';
    return 'products';
  };

  useEffect(() => {
    // Check auth status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin');
      } else {
        fetchProducts(activeTab);
      }
    });
    return () => unsubscribe();
  }, [navigate, activeTab]);

  const fetchProducts = async (tab) => {
    setLoading(true);
    try {
      const collectionName = getCollectionName(tab);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by creation date (newest first) if available
      productList.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB - dateA;
      });

      setProducts(productList);
    } catch (error) {
      console.error(`Error fetching products for ${tab}:`, error);
      if (error.code === 'failed-precondition' || error.message.includes('API key')) {
        alert("Firebase is not fully configured yet. Please verify your credentials in .env");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset form fields
    setName('');
    setPrice('');
    setCategory(categoriesByTab[tab] ? categoriesByTab[tab][0] : '');
    setDescription('');
    setImageFile(null);
    setWeight('');
    setPurity('');
    setMaterial('');
    setDiamondCut('');
    setEditProduct(null);
    setSearchQuery('');
    setCategoryFilter('All');
    setImageSourceType('file');
    setImageUrlInput('');
    if (document.getElementById('imageInput')) {
      document.getElementById('imageInput').value = '';
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setName(product.name || '');
    setPrice(product.price !== undefined ? product.price : '');
    setCategory(product.category || categoriesByTab[activeTab][0]);
    setDescription(product.description || '');
    setWeight(product.weight || '');
    setPurity(product.purity || '');
    setMaterial(product.material || '');
    setDiamondCut(product.diamondCut || '');
    setImageFile(null); // Clear image selector
    if (product.imageUrl) {
      setImageUrlInput(product.imageUrl);
      setImageSourceType('url');
    } else {
      setImageUrlInput('');
      setImageSourceType('file');
    }
    if (document.getElementById('imageInput')) {
      document.getElementById('imageInput').value = '';
    }
    // Scroll to form on mobile
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
    setName('');
    setPrice('');
    setCategory(categoriesByTab[activeTab][0]);
    setDescription('');
    setImageFile(null);
    setWeight('');
    setPurity('');
    setMaterial('');
    setDiamondCut('');
    setImageSourceType('file');
    setImageUrlInput('');
    if (document.getElementById('imageInput')) {
      document.getElementById('imageInput').value = '';
    }
  };

  const handleSeedProducts = async () => {
    if (window.confirm("Do you want to seed the database with the default Gold, Silver & Custom collections? This might take a few moments.")) {
      setLoading(true);
      try {
        // 1. Seed Gold Collections
        const goldProductsToSeed = [
          {
            name: "Devkrupa Heritage Pearl & Emerald Har",
            price: 380000,
            category: "Bridal Collection",
            description: "Magnificent heritage-style multi-layered gold necklace with detailed temple carvings, beautifully accented with tiny natural pearls and green emeralds.",
            imageUrl: "/src/assets/bridal_necklace_antique.jpg",
            material: "22K Yellow Gold",
            weight: "48 Grams",
            purity: "22K Gold (916)",
            diamondCut: "Carved Kundan Work"
          },
          {
            name: "Devkrupa Premium CZ AD Choker Set",
            price: 290000,
            category: "Bridal Collection",
            description: "Complete royal wedding choker set featuring premium quality Cubic Zirconia (CZ) and AD stones, completed with elegant hanging jhumkas and matching maang tikka.",
            imageUrl: "/src/assets/bridal_necklace_choker_set_v2.jpg",
            material: "22K Gold & AD Diamonds",
            weight: "36 Grams",
            purity: "22K Gold (916)",
            diamondCut: "Brilliant CZ Cut"
          },
          {
            name: "Devkrupa Royal Pearl & Kundan Drop Necklace",
            price: 340000,
            category: "Bridal Collection",
            description: "A heavy royal kundan necklace adorned with layers of natural sea pearls and drops of deep green emeralds and pink-red rubies.",
            imageUrl: "/src/assets/bridal_necklace_pearl_kundans.jpg",
            material: "22K Gold & Kundan",
            weight: "42 Grams",
            purity: "22K Gold (916)",
            diamondCut: "Polished Kundan Setting"
          },
          {
            name: "Devkrupa Grand Antique Ruby Choker",
            price: 420000,
            category: "Bridal Collection",
            description: "A heavy antique gold choker set featuring intricate floral carvings and embedded dark red ruby drops. A masterpiece of traditional Gujarati heritage.",
            imageUrl: "/src/assets/bridal_necklace_grand_ruby.jpg",
            material: "22K Antique Gold",
            weight: "52 Grams",
            purity: "22K Gold (916)",
            diamondCut: "Traditional Granular Relieving"
          },
          {
            name: "Devkrupa Peacock Emerald Queen Choker",
            price: 360000,
            category: "Bridal Collection",
            description: "Exquisite royal choker with a broad gold net pattern, green enamel emerald medallions, and elegant white pearls draping beautifully on the neck.",
            imageUrl: "/src/assets/bridal_necklace_royal_emerald.jpg",
            material: "22K Gold & Emerald Enamel",
            weight: "45 Grams",
            purity: "22K Gold (916)",
            diamondCut: "Gujarati Meenakari Work"
          },
          {
            name: "Devkrupa Canary Blossom Diamond Set",
            price: 650000,
            category: "Diamond Necklaces",
            description: "Splendid 18K gold and canary yellow diamond necklet featuring a floral vine pattern, matching yellow cushion-cut drop earrings, and a gorgeous pear-cut drop.",
            imageUrl: "/src/assets/diamond_necklace_yellow_cushion.jpg",
            material: "18K Gold & Diamonds",
            weight: "28 Grams",
            purity: "18K Gold",
            diamondCut: "Canary Yellow Cushion & Pear Cut"
          },
          {
            name: "Devkrupa Pink Marquise Teardrop Set",
            price: 780000,
            category: "Diamond Necklaces",
            description: "Luxurious marquise-cut pink and white diamond cluster necklace featuring a magnificent pear-cut pink diamond drop, with matching drop earrings.",
            imageUrl: "/src/assets/diamond_necklace_pink_teardrop.jpg",
            material: "18K White Gold & Diamonds",
            weight: "32 Grams",
            purity: "18K Gold",
            diamondCut: "Marquise & Pear Brilliant"
          },
          {
            name: "Devkrupa Serpent Blue Diamond Drop",
            price: 490000,
            category: "Diamond Necklaces",
            description: "Minimalist serpent-style white gold collar necklace with a highly delicate blue sapphire/diamond pear-shaped drop.",
            imageUrl: "/src/assets/diamond_necklace_serpent_blue.jpg",
            material: "18K White Gold",
            weight: "22 Grams",
            purity: "18K Gold",
            diamondCut: "Pear Cut Blue Sapphire"
          },
          {
            name: "Devkrupa Blossom Pink Diamond Choker",
            price: 580000,
            category: "Diamond Necklaces",
            description: "Exquisite rose gold leaves collar choker highlighted by bright pink marquise diamonds in a cascade of petals.",
            imageUrl: "/src/assets/diamond_necklace_classic_pink.jpg",
            material: "18K Rose Gold",
            weight: "25 Grams",
            purity: "18K Gold",
            diamondCut: "Pink Marquise Diamonds"
          },
          {
            name: "Devkrupa Marquise Leaf Diamond Crown Choker",
            price: 820000,
            category: "Diamond Necklaces",
            description: "An absolute masterpiece featuring dozens of perfectly matched marquise white diamonds hand-set into leaf clusters with a central teardrop dangle.",
            imageUrl: "/src/assets/diamond_necklace_marquise_leaves.jpg",
            material: "18K White Gold & Diamonds",
            weight: "38 Grams",
            purity: "18K Gold",
            diamondCut: "VVS-VS Brilliant Marquise"
          },
          {
            name: "Devkrupa Flower Snake Chain Earrings",
            price: 35000,
            category: "Earrings",
            description: "Charming 22K yellow gold earrings featuring a sweet flower stud with elegant hanging snake chains, perfect for daily premium wear.",
            imageUrl: "/src/assets/earrings_gold_flower_hanging.jpg",
            material: "22K Gold",
            weight: "4.8 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Antique Pearl Jhumkas",
            price: 78000,
            category: "Earrings",
            description: "Magnificent antique gold jhumkas displaying intricate traditional granular carvings and completed with a lower ring of lustrous white pearls.",
            imageUrl: "/src/assets/earrings_antique_jhumka_pearl.jpg",
            material: "22K Antique Gold & Pearls",
            weight: "12.5 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Infinity Diamond Loop Studs",
            price: 45000,
            category: "Earrings",
            description: "Modern infinity-inspired gold circle studs meticulously paved with micro-diamonds for understated elegance and brilliance.",
            imageUrl: "/src/assets/earrings_gold_infinity_studs.jpg",
            material: "18K Gold & Diamonds",
            weight: "3.2 Grams",
            purity: "18K Gold",
            diamondCut: "Micro Pave Diamonds"
          },
          {
            name: "Devkrupa Golden Blossom Diamond Studs",
            price: 52000,
            category: "Earrings",
            description: "Fabulous gold flower studs featuring detailed petals surrounding a high-quality brilliant-cut diamond center.",
            imageUrl: "/src/assets/earrings_diamond_gold_blossom.jpg",
            material: "18K Gold & Diamonds",
            weight: "3.8 Grams",
            purity: "18K Gold",
            diamondCut: "Brilliant Round Solitaire"
          },
          {
            name: "Devkrupa Three-Tier Golden Jhumka Drop",
            price: 95000,
            category: "Earrings",
            description: "Majestic and heavy three-tier cascading golden jhumka drop earrings. An absolute masterpiece perfect for grand weddings and celebrations.",
            imageUrl: "/src/assets/earrings_three_tier_jhumka.jpg",
            material: "22K Gold",
            weight: "16.8 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Antique Filigree Gem Bangles",
            price: 145000,
            category: "Bangles",
            description: "Splendid pair of 22K antique gold filigree bangles highlighted with classic bezel-set round ruby and emerald gemstones.",
            imageUrl: "/src/assets/bangles_antique_filigree_gems.jpg",
            material: "22K Gold with Ruby & Emerald",
            weight: "26.5 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Royal Peacock Meenakari Kada",
            price: 165000,
            category: "Bangles",
            description: "Gorgeously crafted 22K gold kada bangles featuring beautifully detailed peacock engravings accented with royal multi-color meenakari enamel.",
            imageUrl: "/src/assets/bangles_gold_peacock_enamel.jpg",
            material: "22K Gold & Meenakari Enamel",
            weight: "28.0 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Antique Royal Temple Kada",
            price: 185000,
            category: "Bangles",
            description: "Heavy traditional temple-style gold kada bangles with delicate rope-textured borders, floral engraving, and deep reddish-pink gemstone accents.",
            imageUrl: "/src/assets/bangles_royal_temple_kada.jpg",
            material: "22K Gold & Pink Gemstones",
            weight: "32.4 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Delicate Ruby Gold Bangles",
            price: 115000,
            category: "Bangles",
            description: "Slim and elegant gold bangles set studded with gorgeous round ruby beads interspersed in granular gold clusters.",
            imageUrl: "/src/assets/bangles_delicate_ruby_gold.jpg",
            material: "22K Gold & Ruby Beads",
            weight: "18.5 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Grand Floral Ruby Kada Pair",
            price: 195000,
            category: "Bangles",
            description: "Stunningly broad 22K gold kada bangles pair highlighted by a prominent central floral motif encrusted with rich red rubies and intricate gold leaf work.",
            imageUrl: "/src/assets/bangles_grand_floral_ruby_kada.jpg",
            material: "22K Gold & Rubies",
            weight: "34.0 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Flower Gold Ring with Ruby",
            price: 105000,
            category: "Rings",
            description: "Exquisite 22K (916) yellow gold ring featuring a stunning flower pattern with a vibrant red ruby gemstone center. Elegantly crafted for timeless beauty.",
            imageUrl: "/src/assets/gold_ring_flower_ruby.jpg",
            material: "22K Gold & Ruby",
            weight: "11.2 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Cushion Ruby Halo Ring",
            price: 125000,
            category: "Rings",
            description: "Luxurious gold ring featuring a large cushion-cut ruby stone with a brilliant halo of micro-diamonds, presenting unparalleled elegance and charm.",
            imageUrl: "/src/assets/gold_ring_ruby_halo.jpg",
            material: "18K Gold & Diamonds",
            weight: "8.5 Grams",
            purity: "18K Gold",
            diamondCut: "Cushion Cut Ruby & Micro Halo"
          },
          {
            name: "Devkrupa Diamond Cluster Flower Ring",
            price: 95000,
            category: "Rings",
            description: "Elegant flower-like cluster of diamonds set in a split-shank yellow gold ring. A perfect blend of modernity and tradition.",
            imageUrl: "/src/assets/gold_ring_diamond_flower.jpg",
            material: "18K Gold & Diamonds",
            weight: "6.8 Grams",
            purity: "18K Gold",
            diamondCut: "Round Brilliant Cluster"
          },
          {
            name: "Devkrupa Filigree Floral Ring",
            price: 88000,
            category: "Rings",
            description: "Stunning 22K gold flower ring featuring detailed leaf engravings and exquisite traditional filigree craftsmanship.",
            imageUrl: "/src/assets/gold_ring_filigree_flower.jpg",
            material: "22K Gold",
            weight: "9.2 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Royal Antique Leaf Ring",
            price: 145000,
            category: "Rings",
            description: "Large, regal gold ring with a vertical leaf-like antique pattern and a delicate flower in the center. An absolute masterpiece of heritage design.",
            imageUrl: "/src/assets/gold_ring_antique_leaf.jpg",
            material: "22K Antique Gold",
            weight: "15.4 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Elegant Diamond Mangalsutra",
            price: 250000,
            category: "Mangalsutra",
            description: "An exquisite modern mangalsutra featuring a delicate curved V-shaped pendant paved with brilliant-cut diamonds, completed with a gorgeous teardrop diamond dangle and traditional black beads.",
            imageUrl: "/src/assets/mangalsutra_1.jpg",
            material: "18K Gold & Diamonds",
            weight: "14.2 Grams",
            purity: "18K Gold",
            diamondCut: "Brilliant Curved V & Teardrop"
          },
          {
            name: "Devkrupa Solitaire Aura Mangalsutra",
            price: 185000,
            category: "Mangalsutra",
            description: "A minimalist yet stunning mangalsutra showcasing a circular diamond cluster pendant on a delicate 18K gold chain accented with classic black beads.",
            imageUrl: "/src/assets/mangalsutra_2.jpg",
            material: "18K Gold & Diamonds",
            weight: "9.8 Grams",
            purity: "18K Gold",
            diamondCut: "Round Solitaire Cluster"
          },
          {
            name: "Devkrupa Royal Heritage Mangalsutra",
            price: 320000,
            category: "Mangalsutra",
            description: "A heavy royal heritage-style mangalsutra with multi-layered black bead chains and a grand traditional gold pendant featuring detailed Gujarati artisan engravings.",
            imageUrl: "/src/assets/mangalsutra_3.jpg",
            material: "22K Gold & Black Beads",
            weight: "28.5 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Classic Gold Plate Mangalsutra",
            price: 220000,
            category: "Mangalsutra",
            description: "A beautiful and traditional gold mangalsutra featuring a classic rectangular-arched pendant with fine gold bead dangles and a double-strand black beaded chain.",
            imageUrl: "/src/assets/mangalsutra_4.jpg",
            material: "22K Gold",
            weight: "20.2 Grams",
            purity: "22K Gold (916)"
          },
          {
            name: "Devkrupa Sleek Diamond Petals Mangalsutra",
            price: 160000,
            category: "Mangalsutra",
            description: "A highly elegant and sleek modern mangalsutra featuring an artistic diamond petal pendant that gracefully wraps around the neckline, perfect for everyday luxury.",
            imageUrl: "/src/assets/mangalsutra_5.jpg",
            material: "18K Gold & Diamonds",
            weight: "8.4 Grams",
            purity: "18K Gold",
            diamondCut: "Leaf Petal Pave"
          }
        ];

        for (const prod of goldProductsToSeed) {
          await addDoc(collection(db, 'products'), {
            ...prod,
            createdAt: new Date()
          });
        }

        // 2. Seed Silver Collections
        const silverProductsToSeed = [
          {
            name: "Devkrupa Bridal Kundan Toe Ring Payal Set",
            price: 28000,
            category: "Silver Payal",
            description: "Sensational bridal sterling silver payal (anklet) connected directly to toe rings with delicate chains, beautifully worn on feet decorated with bridal mehndi.",
            imageUrl: "/src/assets/silver_payal_bridal_foot.jpg",
            weight: "250 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Bridal Foot Harness"
          },
          {
            name: "Devkrupa Royal Curved Carved Payal",
            price: 18000,
            category: "Silver Payal",
            description: "An exquisite pairs of broad silver payals presenting royal curved shapes, detailed traditional engravings, and a hanging border of tiny silver beads.",
            imageUrl: "/src/assets/silver_payal_antique_carved.jpg",
            weight: "145 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Curved Carvings & Beads"
          },
          {
            name: "Devkrupa Delicate Floral Toe Ring Payal",
            price: 12000,
            category: "Silver Payal",
            description: "A slender and highly delicate silver anklet connected to beautiful floral toe rings, presenting a highly modern and graceful silhouette.",
            imageUrl: "/src/assets/silver_payal_slender_toe.jpg",
            weight: "95 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Delicate Cable Chain"
          },
          {
            name: "Devkrupa Sparkling CZ Flora Payal",
            price: 22000,
            category: "Silver Payal",
            description: "Stunning contemporary silver anklets beautifully paved with sparkling Cubic Zirconia (CZ) floral clusters.",
            imageUrl: "/src/assets/silver_payal_cz_floral.jpg",
            weight: "115 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Brilliant Floral CZ Pave"
          },
          {
            name: "Devkrupa Traditional Enamel Ghungroo Kada Payal",
            price: 25000,
            category: "Silver Payal",
            description: "Broad traditional kada-style silver payal pair featuring heavy clusters of ringing ghungroo bells and highlighting enamel meenakari colored details.",
            imageUrl: "/src/assets/silver_payal_traditional_ghungroo.jpg",
            weight: "190 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Cascading Ghungroo Bells"
          },
          {
            name: "Devkrupa Empress Emerald & CZ Kamarband",
            price: 38000,
            category: "Silver Kamarband",
            description: "Sensational sterling silver waist belt fully paved with shimmering diamond-cut CZ floral accents, featuring a premium deep green oval emerald gemstone in the center.",
            imageUrl: "/src/assets/silver_kamarband_emerald_cut.jpg",
            weight: "180 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver, Emerald & CZ",
            diamondCut: "Floral Marquise CZ & Oval Emerald"
          },
          {
            name: "Devkrupa Broad Multi-Tier Silver Kamarband",
            price: 32000,
            category: "Silver Kamarband",
            description: "Sensational broad multi-tier sterling silver waist chain adorned with delicate looping chains and ringing silver ghungroo beads.",
            imageUrl: "/src/assets/silver_kamarband_multi_tier.jpg",
            weight: "240 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Broad Ghungroo Chime"
          },
          {
            name: "Devkrupa Elegant Loop Chain Kamarband",
            price: 18000,
            category: "Silver Kamarband",
            description: "A beautifully streamlined multi-chain sterling silver waist belt displaying interconnected scallops and delicate hanging round beads.",
            imageUrl: "/src/assets/silver_kamarband_simple_loops.jpg",
            weight: "135 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Polished Cable Scallops"
          },
          {
            name: "Devkrupa Royal Layered Bead Kamarband",
            price: 28000,
            category: "Silver Kamarband",
            description: "Classic detailed sterling silver waist chain with elegant filigree settings and layers of shimmering hollow silver ball tassels.",
            imageUrl: "/src/assets/silver_kamarband_layered_beads.jpg",
            weight: "210 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Repousse Ball Tassels"
          },
          {
            name: "Devkrupa Ruby Medallion Jhumka Kamarband",
            price: 22000,
            category: "Silver Kamarband",
            description: "A highly unique slender silver waist chain featuring a central floral filigree medallion with a bright red ruby center and double hanging jhumkas.",
            imageUrl: "/src/assets/silver_kamarband_ruby_jhumka.jpg",
            weight: "165 Grams",
            purity: "925 Sterling Silver",
            material: "Gold & Ruby Gems",
            diamondCut: "Floral Ruby Medallion"
          },
          {
            name: "Devkrupa Silver Shankh Roli Chawal Tray",
            price: 3500,
            category: "Pooja Items",
            description: "Elegant shell-shaped pure silver container featuring two dedicated compartments for sacred roli (kumkum) and akshat (rice), finished with a beautiful gold-polished crown.",
            imageUrl: "/src/assets/silver_pooja_mango_roli_chawal.jpg",
            weight: "45 Grams",
            purity: "999 Pure Silver",
            material: "99.9% Pure Silver with Gold Plating",
            diamondCut: "Mango-Leaf Shankh Shape"
          },
          {
            name: "Devkrupa Royal Silver Ganesha Idol",
            price: 18000,
            category: "Pooja Items",
            description: "Magnificently detailed pure silver idol of Lord Ganesha sitting majestically on an engraved pedestal, presenting beautiful traditional design work and high-polish finish.",
            imageUrl: "/src/assets/silver_pooja_ganesha_idol.jpg",
            weight: "210 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Highly Detailed Antique Relief"
          },
          {
            name: "Devkrupa Peacock Haldi Kumkum Stand",
            price: 8500,
            category: "Pooja Items",
            description: "A spectacular three-pot sterling silver stand for pooja kumkum, haldi, and rice, beautifully supported by elephant-shaped legs and featuring a majestic dancing peacock top handle.",
            imageUrl: "/src/assets/silver_pooja_peacock_haldi_kumkum.jpg",
            weight: "95 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Three-Pot elephant & Peacock Structure"
          },
          {
            name: "Devkrupa Royal Kamdhenu Cow Statue",
            price: 45000,
            category: "Pooja Items",
            description: "Exquisite heavy sterling silver statue of the sacred Kamdhenu Cow feeding her calf, adorned with highly detailed traditional relief carvings of spiritual motifs.",
            imageUrl: "/src/assets/silver_pooja_kamdhenu_cow.jpg",
            weight: "550 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Detailed Sacred Carvings"
          },
          {
            name: "Devkrupa Premium Swastika Pooja Thali Set",
            price: 38000,
            category: "Pooja Items",
            description: "Sacred pure silver pooja plate featuring an intricately engraved central Swastika symbol and traditional floral border, complete with dynamic silver cups, a diya, a kalash, and a designer bell.",
            imageUrl: "/src/assets/silver_pooja_premium_thali_set.jpg",
            weight: "320 Grams",
            purity: "999 Pure Silver",
            material: "99.9% Pure Silver",
            diamondCut: "Swastika & Floral Engravings"
          },
          {
            name: "Devkrupa Regal Amethyst Silver Cuff",
            price: 12000,
            category: "Silver Bracelet",
            description: "A magnificent hand-engraved sterling silver cuff bracelet featuring a stunning oval-cut royal purple amethyst gemstone in the center and detailed vintage floral scrollwork.",
            imageUrl: "/src/assets/silver_bracelet_amethyst_cuff.jpg",
            weight: "55 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & Amethyst",
            diamondCut: "Oval Brilliant Cut Amethyst"
          },
          {
            name: "Devkrupa Royal Pearl Open Torque Cuff",
            price: 9500,
            category: "Silver Bracelet",
            description: "An exquisite open-torque sterling silver cuff bracelet with beautifully detailed granular filigree patterns and featuring two round white pearls on the open ends.",
            imageUrl: "/src/assets/silver_bracelet_pearl_torque.jpg",
            weight: "42 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & Pearls",
            diamondCut: "Polished Round Natural Pearls"
          },
          {
            name: "Devkrupa Sparkling CZ Marquise Link Bracelet",
            price: 15000,
            category: "Silver Bracelet",
            description: "Stunning contemporary sterling silver link bracelet paved with glittering marquise-cut Cubic Zirconia (CZ) diamonds arranged in a gorgeous botanical leaf pattern.",
            imageUrl: "/src/assets/silver_bracelet_cz_marquise.jpg",
            weight: "28 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & CZ",
            diamondCut: "Marquise Brilliant CZ Leaves"
          },
          {
            name: "Devkrupa Twin Butterfly Silver Torque",
            price: 11000,
            category: "Silver Bracelet",
            description: "A beautifully textured twisted rope sterling silver torque bracelet featuring two highly detailed butterfly motifs meeting at the open center.",
            imageUrl: "/src/assets/silver_bracelet_butterfly_torque.jpg",
            weight: "48 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Textured Rope & Filigree Butterfly"
          },
          {
            name: "Devkrupa Delicate Scroll Center Chain Bracelet",
            price: 6500,
            category: "Silver Bracelet",
            description: "A highly elegant and slender multi-strand sterling silver chain bracelet highlighting an intricately detailed central filigree scrollwork medallion.",
            imageUrl: "/src/assets/silver_bracelet_filigree_slender.jpg",
            weight: "18 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver",
            diamondCut: "Delicate Filigree Scroll Medallion"
          },
          {
            name: "Devkrupa Matte Flower Silver Ring",
            price: 3800,
            category: "Silver Rings",
            description: "A gorgeous five-petal floral blossom ring in sterling silver with an exquisite satin-matte finish on the petals and sparkling micro-diamonds paved along the delicate split shank.",
            imageUrl: "/src/assets/silver_ring_matte_flower.jpg",
            weight: "5.4 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & Cubic Zirconia",
            diamondCut: "Satin-Matte Flower & Round Brilliant CZ"
          },
          {
            name: "Devkrupa Emerald Accent Bypass Ring",
            price: 5500,
            category: "Silver Rings",
            description: "An exquisite sterling silver bypass ring featuring a striking emerald-cut deep green gemstone in the center, flanked by two round brilliant emerald accents on the branches.",
            imageUrl: "/src/assets/silver_ring_emerald_accent.jpg",
            weight: "6.2 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & Synthetic Emerald",
            diamondCut: "Emerald-Cut Center & Round Accents"
          },
          {
            name: "Devkrupa Pearl Bypass Silver Ring",
            price: 4800,
            category: "Silver Rings",
            description: "A beautifully minimalist open sterling silver ring presenting a single shimmering white freshwater pearl nestled inside a graceful bypass band.",
            imageUrl: "/src/assets/silver_ring_pearl_bypass.jpg",
            weight: "5.8 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & Freshwater Pearl",
            diamondCut: "Polished Round Pearl"
          },
          {
            name: "Devkrupa Filigree Butterfly Silver Ring",
            price: 6500,
            category: "Silver Rings",
            description: "An intricate, wide-band sterling silver ring featuring a highly detailed central butterfly motif paved with tiny micro-diamonds, finished with traditional filigree patterns.",
            imageUrl: "/src/assets/silver_ring_filigree_butterfly.jpg",
            weight: "7.5 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & CZ",
            diamondCut: "Detailed Butterfly Relief & Micro CZ"
          },
          {
            name: "Devkrupa Heart CZ Bypass Adjustable Ring",
            price: 4500,
            category: "Silver Rings",
            description: "An adorable and adjustable sterling silver open bypass ring featuring a heart-shaped brilliant CZ gemstone on one end and a round-cut solitaire CZ on the other.",
            imageUrl: "/src/assets/silver_ring_heart_cz_bypass.jpg",
            weight: "4.8 Grams",
            purity: "925 Sterling Silver",
            material: "92.5% Sterling Silver & CZ",
            diamondCut: "Heart-Cut & Round Solitaire CZ"
          }
        ];

        for (const prod of silverProductsToSeed) {
          await addDoc(collection(db, 'silver_products'), {
            ...prod,
            createdAt: new Date()
          });
        }

        // 3. Seed Custom Bespoke Collections
        const customProductsToSeed = customProducts.map(prod => ({
          name: prod.name,
          category: prod.category,
          description: prod.description,
          imageUrl: prod.imageUrl,
          weight: prod.weight || "",
          purity: prod.purity || "",
          material: prod.material || "",
          diamondCut: prod.diamondCut || "",
          createdAt: new Date()
        }));

        for (const prod of customProductsToSeed) {
          await addDoc(collection(db, 'custom_products'), prod);
        }

        alert("Gold, Silver & Bespoke collections successfully imported into Firestore Database!");
        fetchProducts(activeTab);
      } catch (error) {
        console.error("Error seeding products:", error);
        alert("Failed to seed database. Verify your Firestore configurations.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddOrEditProduct = async (e) => {
    e.preventDefault();
    
    // Validation
    if (imageSourceType === 'file') {
      if (!editProduct && !imageFile) {
        alert("Please select a product image file to upload.");
        return;
      }
    } else {
      if (!imageUrlInput) {
        alert("Please enter a product image URL.");
        return;
      }
    }

    setUploading(true);
    try {
      let currentImageUrl = "";

      if (imageSourceType === 'file') {
        if (imageFile) {
          // Upload new image to storage
          const fileRef = ref(storage, `${activeTab}_products/${Date.now()}_${imageFile.name}`);
          await uploadBytes(fileRef, imageFile);
          currentImageUrl = await getDownloadURL(fileRef);
        } else if (editProduct) {
          currentImageUrl = editProduct.imageUrl;
        }
      } else {
        currentImageUrl = imageUrlInput;
      }

      // 2. Prepare payload
      const payload = {
        name,
        category,
        description,
        imageUrl: currentImageUrl,
        weight,
        purity,
        material,
        diamondCut
      };

      // Add price if it's Gold or Silver (custom is optional, fallback to 0)
      payload.price = price ? Number(price) : 0;

      const collectionName = getCollectionName(activeTab);

      if (editProduct) {
        // Edit mode: Update existing Firestore document
        await updateDoc(doc(db, collectionName, editProduct.id), payload);
        alert("Product updated successfully!");
        setEditProduct(null);
      } else {
        // Add mode: Add new Firestore document
        await addDoc(collection(db, collectionName), {
          ...payload,
          createdAt: new Date()
        });
        alert("Product published successfully!");
      }

      // Reset Form Fields
      setName('');
      setPrice('');
      setCategory(categoriesByTab[activeTab][0]);
      setDescription('');
      setImageFile(null);
      setWeight('');
      setPurity('');
      setMaterial('');
      setDiamondCut('');
      if (document.getElementById('imageInput')) {
        document.getElementById('imageInput').value = '';
      }

      fetchProducts(activeTab); // Reload list
    } catch (error) {
      console.error("Error publishing product:", error);
      alert(`Failed to save product.\n\nError details: ${error.message || error}\n\nTip: If it is a storage/upload error, please select the 'Image URL' option and paste an image link to bypass storage!`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    const itemType = activeTab === 'inquiries' ? 'customer inquiry' : 'product';
    if (window.confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
      try {
        const collectionName = getCollectionName(activeTab);
        await deleteDoc(doc(db, collectionName, id));
        fetchProducts(activeTab); // Refresh list
      } catch (error) {
        console.error(`Error deleting ${itemType}:`, error);
        alert(`Failed to delete ${itemType}.`);
      }
    }
  };

  // Perform client-side filter
  const filteredItems = products.filter(item => {
    if (activeTab === 'inquiries') {
      return (
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }
  });

  return (
    <div className="min-h-screen bg-dominant pt-20 pb-12 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-secondary p-6 rounded-lg border border-white/10 mb-8 gap-4 shadow-xl">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Admin Control Center</h1>
            <p className="text-muted text-sm mt-1">Manage Gold, Silver, and Bespoke products in real-time</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleSeedProducts}
              className="flex items-center gap-2 bg-accent/20 text-accent hover:bg-accent hover:text-dominant px-4 py-2 rounded font-semibold border border-accent/30 transition-all text-xs"
            >
              Seed Sample Databases
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-colors text-xs"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Collection Tab Switcher */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto gap-2">
          <button 
            onClick={() => handleTabChange('gold')}
            className={`py-3 px-6 font-serif font-bold text-sm tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'gold' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            ⚜️ Gold & Diamond Collection
          </button>
          <button 
            onClick={() => handleTabChange('silver')}
            className={`py-3 px-6 font-serif font-bold text-sm tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'silver' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            💍 Silver Collection
          </button>
          <button 
            onClick={() => handleTabChange('custom')}
            className={`py-3 px-6 font-serif font-bold text-sm tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'custom' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            ✨ Bespoke Custom Collection
          </button>
          <button 
            onClick={() => handleTabChange('inquiries')}
            className={`py-3 px-6 font-serif font-bold text-sm tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inquiries' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            📬 Customer Inquiries
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add / Edit Form Panel */}
          {activeTab !== 'inquiries' && (
            <div className="lg:col-span-1">
            <div className="glass-effect p-6 rounded-lg border border-white/10 shadow-2xl relative sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Plus className="text-accent" size={20} /> 
                  {editProduct ? "Edit Product Details" : "Publish New Product"}
                </span>
                {editProduct && (
                  <button onClick={handleCancelEdit} className="text-muted hover:text-red-500">
                    <X size={18} />
                  </button>
                )}
              </h2>
              
              <form onSubmit={handleAddOrEditProduct} className="space-y-4">
                <div>
                  <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Product Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm"
                    placeholder="e.g. Royal Kundan Haar"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Price (₹) (Optional)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                    placeholder="Leave blank for Price on Request"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Category *</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm"
                    >
                      {categoriesByTab[activeTab].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Material</label>
                    <input 
                      type="text" 
                      value={material} 
                      onChange={(e) => setMaterial(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                      placeholder="e.g. 22K Gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Weight</label>
                    <input 
                      type="text" 
                      value={weight} 
                      onChange={(e) => setWeight(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                      placeholder="e.g. 12g"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Purity</label>
                    <input 
                      type="text" 
                      value={purity} 
                      onChange={(e) => setPurity(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                      placeholder="e.g. 916 Gold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Diamond Cut</label>
                    <input 
                      type="text" 
                      value={diamondCut} 
                      onChange={(e) => setDiamondCut(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                      placeholder="e.g. Marquise"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">Description *</label>
                  <textarea 
                    required 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    rows={3} 
                    className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm"
                    placeholder="Provide premium product description here..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs text-secondary mb-1 uppercase tracking-wider font-semibold">
                    Product Image {editProduct ? "(Optional)" : "*"}
                  </label>
                  
                  {/* File / URL Toggle tab group */}
                  <div className="flex gap-2 mb-2 p-0.5 bg-dominant border border-white/10 rounded-md">
                    <button
                      type="button"
                      onClick={() => setImageSourceType('file')}
                      className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                        imageSourceType === 'file' ? 'bg-accent text-dominant shadow-lg' : 'text-muted hover:text-primary'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceType('url')}
                      className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                        imageSourceType === 'url' ? 'bg-accent text-dominant shadow-lg' : 'text-muted hover:text-primary'
                      }`}
                    >
                      Image URL
                    </button>
                  </div>

                  {imageSourceType === 'file' ? (
                    <div className="border border-dashed border-white/20 rounded-lg p-4 text-center hover:border-accent transition-colors cursor-pointer relative bg-dominant/50">
                      <input 
                        id="imageInput" 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <ImageIcon className="mx-auto text-muted mb-2" size={24} />
                      <span className="text-xs text-muted block truncate">
                        {imageFile ? imageFile.name : editProduct ? "Retaining original image" : "Click or Drag to upload image"}
                      </span>
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      value={imageUrlInput} 
                      onChange={(e) => setImageUrlInput(e.target.value)} 
                      className="w-full bg-dominant border border-white/10 rounded px-3 py-2 text-primary focus:outline-none focus:border-accent text-sm" 
                      placeholder="e.g. /src/assets/bridal_necklace_antique.jpg or web link"
                    />
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {editProduct && (
                    <button 
                      type="button"
                      onClick={handleCancelEdit}
                      className="w-1/3 border border-white/10 text-primary hover:bg-white/5 py-3 rounded transition-colors text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className={`bg-accent text-dominant font-bold py-3 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 text-sm ${
                      editProduct ? "w-2/3" : "w-full"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Saving...
                      </>
                    ) : editProduct ? (
                      "Save Changes"
                    ) : (
                      "Publish Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          )}

          {/* Manage Products Panel */}
          <div className={activeTab === 'inquiries' ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <div className="glass-effect p-6 rounded-lg border border-white/10 shadow-2xl min-h-[600px] flex flex-col">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-bold whitespace-nowrap">
                  {activeTab === 'inquiries' ? `Inquiries (${filteredItems.length})` : `In-Store Products (${filteredItems.length})`}
                </h2>
                
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {/* Search bar */}
                  <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
                    <Search className="absolute left-3 top-2.5 text-muted" size={16} />
                    <input 
                      type="text" 
                      placeholder={activeTab === 'inquiries' ? "Search inquiries..." : "Search items..."} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-dominant border border-white/10 rounded pl-9 pr-3 py-1.5 text-xs text-primary focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Category Filter */}
                  {activeTab !== 'inquiries' && (
                    <div className="relative">
                      <Filter className="absolute left-2.5 top-2.5 text-muted" size={12} />
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-dominant border border-white/10 rounded pl-7 pr-3 py-1.5 text-xs text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer"
                      >
                        <option value="All">All Categories</option>
                        {categoriesByTab[activeTab].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Grid */}
              {loading ? (
                <div className="flex-grow flex flex-col justify-center items-center py-24">
                  <Loader2 className="animate-spin text-accent mb-4" size={48} />
                  <p className="text-muted text-sm">Fetching items from database...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center py-24 text-center text-muted bg-dominant/50 rounded-lg border border-white/5 p-6">
                  <span className="text-4xl mb-3">🔍</span>
                  <p className="font-medium text-sm">No items found matching the search or category.</p>
                  <p className="text-xs text-muted/80 mt-1">Try resetting filters or seeding database.</p>
                </div>
              ) : activeTab === 'inquiries' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map(inquiry => (
                    <div key={inquiry.id} className="bg-dominant/75 border border-white/10 rounded-lg p-5 flex flex-col justify-between hover:border-accent/40 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2 border-b border-white/5 pb-2">
                          <h3 className="font-semibold text-primary truncate text-sm flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shrink-0"></span>
                            {inquiry.name}
                          </h3>
                          <span className="text-[10px] text-muted flex items-center gap-1">
                            <Calendar size={10} />
                            {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleDateString('en-IN') : new Date(inquiry.createdAt || 0).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        
                        <div className="space-y-1.5 text-xs text-muted">
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-accent/70" />
                            <a href={`mailto:${inquiry.email}`} className="hover:text-accent underline transition-colors">{inquiry.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-accent/70" />
                            <a href={`https://wa.me/${inquiry.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline transition-colors">{inquiry.phone}</a>
                          </div>
                        </div>

                        <div className="bg-secondary/20 p-3 rounded border border-white/5 text-xs text-secondary mt-2 max-h-32 overflow-y-auto leading-relaxed whitespace-pre-wrap font-sans">
                          {inquiry.message}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2.5 pt-3 border-t border-white/5 mt-4">
                        <button 
                          onClick={() => handleDeleteProduct(inquiry.id)}
                          className="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-all border border-red-500/20 hover:border-red-500 font-semibold"
                        >
                          <Trash2 size={12} /> Delete Inquiry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredItems.map(product => (
                    <div 
                      key={product.id} 
                      className={`bg-dominant/70 border rounded-lg flex overflow-hidden hover:border-accent/40 transition-all duration-300 ${
                        editProduct?.id === product.id ? 'border-accent shadow-lg shadow-accent/5' : 'border-white/10'
                      }`}
                    >
                      <div className="w-1/3 aspect-square bg-secondary flex items-center justify-center p-2 relative overflow-hidden border-r border-white/10">
                        <img 
                          src={product.imageUrl} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-md opacity-20 pointer-events-none" 
                        />
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="max-w-full max-h-full object-contain relative z-10 rounded-sm" 
                        />
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h3 className="font-semibold text-primary truncate text-sm" title={product.name}>
                              {product.name}
                            </h3>
                            <span className="text-[10px] text-accent/80 border border-accent/20 bg-accent/5 px-1.5 py-0.5 rounded font-mono uppercase shrink-0">
                              {product.category}
                            </span>
                          </div>
                          {product.weight && (
                            <p className="text-[10px] text-muted/80 mt-0.5">
                              Weight: {product.weight} | Purity: {product.purity || "N/A"}
                            </p>
                          )}
                          <p className="text-accent font-medium text-sm mt-1.5">
                            {product.price && product.price > 0 ? (
                              `₹ ${product.price.toLocaleString('en-IN')}`
                            ) : (
                              "Bespoke / Price on Request"
                            )}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2.5 pt-2 border-t border-white/5 mt-2">
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="text-accent hover:bg-accent/15 px-2 py-1 rounded text-xs flex items-center gap-1 transition-all"
                          >
                            <Edit2 size={12} /> Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:bg-red-500/10 px-2 py-1 rounded text-xs flex items-center gap-1 transition-all"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
