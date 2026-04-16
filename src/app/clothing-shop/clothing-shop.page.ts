import { Component } from '@angular/core';

@Component({
  selector: 'app-clothing-shop',
  templateUrl: './clothing-shop.page.html',
  styleUrls: ['./clothing-shop.page.scss'],
})
export class ClothingShopPage {
  products = [
    { id: 1, name: 'Футболка', price: 2990, color: '#FF6B6B', category: 'Футболки', sizes: ['S','M','L','XL'] },
    { id: 2, name: 'Джинсы', price: 4990, color: '#4ECDC4', category: 'Джинсы', sizes: ['28','30','32','34'] },
    { id: 3, name: 'Куртка', price: 12990, color: '#45B7D1', category: 'Куртки', sizes: ['S','M','L','XL'] },
    { id: 4, name: 'Платье', price: 3990, color: '#96CEB4', category: 'Платья', sizes: ['XS','S','M','L'] },
    { id: 5, name: 'Кроссовки', price: 6990, color: '#FFEAA7', category: 'Обувь', sizes: ['36','37','38','39','40'] },
    { id: 6, name: 'Худи', price: 5490, color: '#DFE6E9', category: 'Куртки', sizes: ['S','M','L','XL'] },
    { id: 7, name: 'Шорты', price: 1990, color: '#FDCB6E', category: 'Футболки', sizes: ['S','M','L','XL'] },
    { id: 8, name: 'Свитер', price: 4490, color: '#E17055', category: 'Куртки', sizes: ['S','M','L','XL'] }
  ];
  
  cartItems: any[] = [];
  selectedCategory = 'all';
  showCart = false;
  categories = ['all', 'Футболки', 'Джинсы', 'Куртки', 'Платья', 'Обувь'];

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) this.cartItems = JSON.parse(saved);
  }

  get filtered() {
    return this.selectedCategory === 'all' 
      ? this.products 
      : this.products.filter(p => p.category === this.selectedCategory);
  }

  get total() {
    return this.cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  }

  get count() {
    return this.cartItems.reduce((s, i) => s + i.quantity, 0);
  }

  add(product: any, size: string) {
    if (!size) return;
    const existing = this.cartItems.find(i => i.product.id === product.id && i.selectedSize === size);
    existing ? existing.quantity++ : this.cartItems.push({ product: {...product}, quantity: 1, selectedSize: size });
    this.save();
    alert(`${product.name} (${size}) добавлен`);
  }

  update(item: any, delta: number) {
    const newQty = item.quantity + delta;
    newQty > 0 ? item.quantity = newQty : this.remove(item);
    this.save();
  }

  remove(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.save();
  }

  clear() {
    this.cartItems = [];
    this.save();
  }

  checkout() {
    if (!this.cartItems.length) return alert('Корзина пуста');
    alert(`Заказ оформлен! Сумма: ${this.format(this.total)} ₽`);
    this.clear();
    this.showCart = false;
  }

  format(p: number) { return p.toLocaleString('ru-RU'); }
  save() { localStorage.setItem('cart', JSON.stringify(this.cartItems)); }
}