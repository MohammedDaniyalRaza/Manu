# Depizza Town - Digital Menu 🍕

A premium, fully responsive digital menu for Depizza Town restaurant located in Gulshan-e-Iqbal, Karachi, Pakistan.

## Features ✨

- **111 Products** across 14 categories
- **Advanced Search** - Real-time search with intelligent suggestions (like YouTube/Google)
- **Dark/Light Theme Toggle** - Modern black/gray and white themes (fixed visibility issue)
- **1-Second Loading Animation** with spinning pizza logo
- **Premium Animations** - Smooth transitions, hover effects, and scroll animations
- **Professional Header** - Redesigned with modern layout and brand visibility
- **Fully Responsive** - Works perfectly on all devices
- **Fixed Footer** - Professional layout with footer at bottom
- **Smooth Scrolling** - Beautiful category navigation with horizontal scroll
- **Modern Design** - Gradient effects and premium styling
- **shadcn/ui Components** - Professional UI components for better UX

## Categories 📋

1. 🍕 Pizzas (16 items)
2. 🍔 Burgers (8 items)
3. 🥙 Appetizers (10 items)
4. 🍝 Pasta (6 items)
5. 🌯 Sandwiches & Wraps (6 items)
6. 🍛 Rice & Biryani (5 items)
7. 🥗 Salads (4 items)
8. 🍰 Desserts (6 items)
9. 🥤 Beverages (17 items)
10. 🎉 Special Deals (8 items)
11. 🍳 Breakfast (6 items)
12. ⭐ House Specialties (8 items)
13. 🍟 Extra Sides (5 items)
14. 🧂 Sauces & Extras (6 items)

## Tech Stack 💻

- Next.js 16.2.9
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- JSON data structure

## Getting Started 🚀

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Build for production:
```bash
npm run build
npm start
```

## Menu Data Structure 📊

The menu is stored in `/data/menu.json` with the following structure:

```json
{
  "restaurant": {
    "name": "Depizza Town",
    "location": "Gulshan-e-Iqbal, Karachi, Pakistan",
    "currency": "PKR"
  },
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name",
      "icon": "🍕",
      "items": [
        {
          "id": 1,
          "name": "Item Name",
          "description": "Item description",
          "price": 999,
          "size": "Medium"
        }
      ]
    }
  ]
}
```

## Customization 🎨

### Adding New Items
Edit `/data/menu.json` and add items to the appropriate category.

### Changing Colors
The theme uses Tailwind CSS. Main colors:
- Orange: `orange-500`, `orange-600`
- Red: `red-500`, `red-600`
- Dark mode: `gray-800`, `gray-900`, `black`
- Light mode: `white`, `gray-50`, `gray-100`

### Modifying Categories
Add new categories in `menu.json` with a unique `id`, `name`, and `icon`.

## QR Code Integration 📱

Once deployed, generate a QR code pointing to your website URL. Customers can scan it to view the menu on their phones.

Recommended QR code generators:
- qr-code-generator.com
- qrcode-monkey.com

## Deployment 🌐

Deploy to Vercel (recommended):

```bash
npm run build
# Deploy via Vercel CLI or GitHub integration
```

Or any other Next.js hosting platform:
- Netlify
- AWS Amplify
- Railway

## Contact 📞

**Depizza Town**  
Location: Gulshan-e-Iqbal, Karachi, Pakistan  
Owner: Mohammad Daniyal

---

Made with ❤️ for food lovers
