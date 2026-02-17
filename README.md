# QRcraft

A beautiful, client-side QR code generator built with React, Vite, and Tailwind CSS.
Create branded QR codes with custom colors, dot styles, and logos.

![QRcraft Preview](https://via.placeholder.com/800x400)

## Features

- 🎨 **Full Customization**: Change foreground/background colors, dot styles, and corner shapes.
- 🖼️ **Logo Support**: Upload your own logo to the center of the QR code.
- ⚡ **Instant Preview**: Updates in real-time as you edit.
- 📱 **Mobile Friendly**: Fully responsive design.
- 🔒 **Privacy Focused**: Runs entirely in your browser. No data is sent to a server.
- 💸 **Freemium Model**: Free low-res downloads; pay one-time to unlock high-res PNG & SVG.

## Tech Stack

- **React** (v18+)
- **Vite**
- **Tailwind CSS**
- **qr-code-styling**
- **react-color**

## Getting Started

### Prerequisites

- Node.js (v16 or higher)

### Installation

1. Clone the repository and navigate to the folder:
   ```bash
   cd qr-customizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

## Deployment

To deploy to Vercel (recommended):

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and click "Add New Project".
3. Import your repository.
4. Keep default settings (Framework: Vite).
5. Click **Deploy**.

## Stripe Integration

The app is set up to work with **Stripe Payment Links**.
To enable payments:

1. Create a Payment Link in your Stripe Dashboard.
2. Open `src/components/Pricing.jsx` and `src/components/PaywallModal.jsx`.
3. Replace `STRIPE_PAYMENT_LINK` constant with your actual link.
4. Configure your Stripe Payment Link to redirect to `https://your-domain.com/?paid=true` after payment.

## License

MIT
# QRCraft
