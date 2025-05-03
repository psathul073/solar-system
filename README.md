
# 🌌 Solar System Simulation with Three.js + Vite

This project is a **3D Solar System simulation** built with [Three.js](https://threejs.org/) and powered by [Vite](https://vitejs.dev/) for fast development and bundling. It features animated planets orbiting a sun with realistic textures, lighting, and user interaction.

## 🚀 Features

- Real-time 3D rendering using Three.js
- Sun and planets with orbit animation
- Realistic textures and materials
- Interactive camera controls (orbit, zoom, pan)
- Starscape background
- Fast development and hot reload via Vite

## 📸 Preview

![Solar System Preview](preview.png) <!-- Replace with your actual preview image -->

## 🧰 Tech Stack

- [Three.js](https://threejs.org/) – WebGL-based 3D engine
- [Vite](https://vitejs.dev/) – Lightning-fast build tool
- HTML, CSS, JavaScript / ESModules`

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/psathul073/solar-system.git
cd solar-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

## 🔧 How It Works

> The scene is created using `THREE.Scene`, planets are created using `THREE.Mesh` with `THREE.SphereGeometry`, and movement is handled inside the animation loop. OrbitControls allow camera interaction.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
