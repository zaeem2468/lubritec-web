// Master Product Database
const products = [
    { id: 'sae40', name: 'Engine Oil (SAE 40)', category: 'Engine Oils', img: 'images/sae40.jpg', desc: 'Monograde motor oil with minimal additives. High adhesive power.', variants: [{ size: '500ML', price: 20 }, { size: '5L', price: 150 }, { size: '20L', price: 610 }, { size: '210L', price: 7075 }] },
    { id: 'multi20w50', name: 'Multigrade (20W50)', category: 'Engine Oils', img: 'images/20w50.jpg', desc: 'Premium turbo-tested oil. Meets latest manufacturer specs.', variants: [{ size: '500ML', price: 22 }, { size: '5L', price: 165 }, { size: '20L', price: 670 }, { size: '210L', price: 7570 }] },
    { id: 'hd40', name: 'Diesel Oil (HD40)', category: 'Engine Oils', img: 'images/hd40.jpg', desc: 'Heavy duty. API SF/CD/CF/CF2 approved.', variants: [{ size: '500ML', price: 22.50 }, { size: '5L', price: 175 }, { size: '20L', price: 710 }, { size: '210L', price: 8030 }] },
    { id: 'turbo15w40', name: 'Turbo Diesel (15W40)', category: 'Engine Oils', img: 'images/15w40.jpg', desc: 'Excellent soot dispersancy and wear control.', variants: [{ size: '500ML', price: 25 }, { size: '5L', price: 200 }, { size: '20L', price: 810 }, { size: '210L', price: 8590 }] },
    { id: 'ep90', name: 'Gear Oil (EP90)', category: 'Gear & Auto', img: 'images/ep90.jpg', desc: 'Mineral oil containing extreme pressure additives.', variants: [{ size: '500ML', price: 25 }, { size: '5L', price: 200 }, { size: '20L', price: 810 }, { size: '210L', price: 8490 }] },
    { id: 'brake', name: 'Brake Fluid DOT 4', category: 'Gear & Auto', img: 'images/brake.jpg', desc: 'High wet boiling point to protect against vapour lock.', variants: [{ size: '200ML', price: 18 }, { size: '500ML', price: 30 }, { size: '5L', price: 280 }, { size: '20L', price: 1130 }, { size: '210L', price: 10850 }] },
    { id: 'iso68', name: 'Hydraulic Oil (ISO 68)', category: 'Industrial', img: 'images/iso68.jpg', desc: 'Anti-wear and extreme pressure properties.', variants: [{ size: '1L', price: 45 }, { size: '5L', price: 200 }, { size: '20L', price: 810 }, { size: '210L', price: 8490 }] },
    { id: 'af_96', name: 'Anti-Freeze 96%', category: 'Industrial', img: 'images/af_96.jpg', desc: 'Maximum strength concentrated antifreeze.', variants: [{ size: '1L', price: 35 }, { size: '5L', price: 130 }, { size: '20L', price: 530 }, { size: '210L', price: 5177 }] },
    { id: 'ew_cleaner', name: 'Engine Cleaner (Water Base)', category: 'Chemicals & Grease', img: 'images/water_cleaner.jpg', desc: 'Removes soils by dissolving contaminants.', variants: [{ size: '500ML', price: 15 }, { size: '5L', price: 70 }, { size: '20L', price: 290 }, { size: '210L', price: 2850 }] },
    { id: 'grit', name: 'Hand Cleaner With Grit', category: 'Chemicals & Grease', img: 'images/grit.jpg', desc: 'Solvent-free heavy duty hand cleaner.', variants: [{ size: '800G', price: 35 }, { size: '5KG', price: 160 }, { size: '15KG', price: 415 }] },
    { id: 'g_multi', name: 'Grease - Multipurpose', category: 'Chemicals & Grease', img: 'images/grease_multi.jpg', desc: 'Versatile lubricant for various industrial applications.', variants: [{ size: '500G', price: 42 }, { size: '5KG', price: 330 }, { size: '15KG', price: 875 }, { size: '180KG', price: 11660 }] }
];

// Smart Cart Memory
let activeCart = JSON.parse(localStorage.getItem('lubritec_cart')) || [];

function saveCart() {
    localStorage.setItem('lubritec_cart', JSON.stringify(activeCart));
    updateCartUI();
}

function toggleCart() {
    const panel = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
        document.body.style.overflow = 'auto';
    }
}

function addToQuote(productId, name, size, price) {
    const cartItemId = `${productId}-${size}`;
    const existing = activeCart.find(item => item.cartId === cartItemId);
    if (existing) { existing.qty += 1; } else { activeCart.push({ cartId: cartItemId, name: name, size: size, price: parseFloat(price), qty: 1 }); }

    saveCart();

    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.classList.add('scale-150');
        setTimeout(() => badge.classList.remove('scale-150'), 200);
    }
}

function updateQty(cartId, delta) {
    const item = activeCart.find(i => i.cartId === cartId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) activeCart = activeCart.filter(i => i.cartId !== cartId);
    saveCart();
}

function updateCartUI() {
    const countSpan = document.getElementById('cart-count');
    const itemsDiv = document.getElementById('cart-items');
    if (!countSpan || !itemsDiv) return;

    const totalQty = activeCart.reduce((sum, item) => sum + item.qty, 0);
    countSpan.textContent = totalQty;
    if (totalQty > 0) countSpan.classList.remove('scale-0');
    else countSpan.classList.add('scale-0');

    const emptyMsg = document.getElementById('empty-cart-msg');
    if (activeCart.length === 0) {
        emptyMsg.style.display = 'flex';
        itemsDiv.innerHTML = '';
        itemsDiv.appendChild(emptyMsg);
    } else {
        emptyMsg.style.display = 'none';
        itemsDiv.innerHTML = '';
        activeCart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col gap-3 shadow-md';
            row.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="pr-2">
                        <h4 class="font-bold text-sm text-white mb-1">${item.name}</h4>
                        <span class="text-[9px] text-brand-400 font-bold uppercase bg-black px-2 py-1 rounded border border-gray-800">${item.size} Size</span>
                    </div>
                    <span class="font-black text-white text-base">R${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div class="flex items-center justify-between border-t border-gray-800 pt-3 mt-1">
                    <div class="flex items-center bg-black rounded-lg border border-gray-800">
                        <button onclick="updateQty('${item.cartId}', -1)" class="w-10 h-10 text-white font-bold hover:bg-gray-800">-</button>
                        <span class="w-6 text-center text-xs font-bold text-white">${item.qty}</span>
                        <button onclick="updateQty('${item.cartId}', 1)" class="w-10 h-10 text-white font-bold hover:bg-gray-800">+</button>
                    </div>
                    <button onclick="updateQty('${item.cartId}', -999)" class="text-[10px] uppercase tracking-widest text-red-500 font-bold p-2 hover:bg-red-900/20 rounded">Remove</button>
                </div>
            `;
            itemsDiv.appendChild(row);
        });
    }

    const subtotal = activeCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    document.getElementById('cart-subtotal').textContent = `R${subtotal.toFixed(2)}`;
    document.getElementById('cart-vat').textContent = `R${vat.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `R${total.toFixed(2)}`;

    const waBtn = document.getElementById('wa-checkout-btn');
    if (activeCart.length === 0) { waBtn.href = "#"; } else {
        let msg = "*NEW QUOTE REQUEST - LUBRITEC*%0A%0A";
        activeCart.forEach(i => { msg += `▪ *${i.qty}x* ${i.name} (${i.size}) - R${(i.price * i.qty).toFixed(2)}%0A`; });
        msg += `%0A*Subtotal:* R${subtotal.toFixed(2)}%0A*VAT (15%):* R${vat.toFixed(2)}%0A*Total Estimate:* R${total.toFixed(2)}%0A%0A`;
        waBtn.href = `https://wa.me/27680871269?text=${msg}`;
    }
}

document.addEventListener('DOMContentLoaded', updateCartUI);

// ===== PRODUCT REVIEWS SYSTEM =====
window.productReviews = {};
window.reviewCache = {};

window.loadProductReviews = async function(productId) {
    if (!window.firebaseDb) return [];
    try {
        const reviewsRef = window.collection(window.firebaseDb, 'reviews');
        const q = window.query(reviewsRef, window.firebaseFirestore ? .where ? .('productId', '==', productId) || undefined);
        const snapshot = await window.getDocs(q);
        const reviews = [];
        snapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
        });
        window.reviewCache[productId] = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        return window.reviewCache[productId];
    } catch (error) {
        console.log('Reviews not available yet');
        return [];
    }
};

window.submitReview = async function(productId, rating, reviewText, userName) {
    if (!window.firebaseDb || !window.currentUser) {
        alert('Please log in to submit a review');
        return false;
    }
    try {
        const reviewData = {
            productId: productId,
            userId: window.currentUser.uid,
            userEmail: window.currentUser.email,
            userName: userName || 'Anonymous',
            rating: parseInt(rating),
            text: reviewText,
            date: new Date().toISOString(),
            helpful: 0
        };
        await window.addDoc(window.collection(window.firebaseDb, 'reviews'), reviewData);
        // Refresh reviews
        await window.loadProductReviews(productId);
        return true;
    } catch (error) {
        console.error('Error submitting review:', error);
        return false;
    }
};

window.getAverageRating = function(productId) {
    const reviews = window.reviewCache[productId] || [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

// ===== ANALYTICS FUNCTIONS =====
window.getAnalyticsData = async function() {
    if (!window.firebaseDb || !window.isAdmin) {
        alert('Admin access required');
        return null;
    }
    try {
        const ordersSnapshot = await window.getDocs(window.collection(window.firebaseDb, 'orders'));
        const usersSnapshot = await window.getDocs(window.collection(window.firebaseDb, 'users'));

        let totalOrders = 0;
        let totalRevenue = 0;
        let productSales = {};

        ordersSnapshot.forEach(doc => {
            const order = doc.data();
            totalOrders++;
            totalRevenue += order.total || 0;

            if (order.items) {
                order.items.forEach(item => {
                    productSales[item.name] = (productSales[item.name] || 0) + item.qty;
                });
            }
        });

        return {
            totalOrders: totalOrders,
            totalRevenue: totalRevenue.toFixed(2),
            totalUsers: usersSnapshot.size,
            productSales: productSales,
            topProducts: Object.entries(productSales)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
        };
    } catch (error) {
        console.error('Analytics error:', error);
        return null;
    }
};