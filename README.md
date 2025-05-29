# 🎉 Confetti.js

A lightweight, customizable confetti animation library for web applications.

## Features

- 🚀 **Easy to use** - Simple one-line commands
- 🎨 **Highly customizable** - Colors, shapes, physics, and more
- ⚡ **Lightweight** - Under 10KB minified, no dependencies
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🎯 **Multiple effects** - Burst, rain, fountain, fireworks, and more

## Installation

### CDN (Recommended)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/confetti@latest/dist/confetti.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/confetti@1.0.0/dist/confetti.min.js"></script>
```

### NPM

```bash
npm install confetti-js
```

### Download

Download the latest version from [GitHub Releases](https://github.com/yourusername/confetti-js/releases)

## Quick Start

```javascript
// Basic burst effect
ConfettiJS.burst();

// Custom colors and count
ConfettiJS.custom({
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    count: 200
});

// Different effects
ConfettiJS.rain();      // Continuous rain
ConfettiJS.fountain();  // Bottom-up fountain  
ConfettiJS.fireworks(); // Multiple bursts
ConfettiJS.hearts();    // Heart shapes
ConfettiJS.stars();     // Star shapes
```

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `ConfettiJS.burst(options)` | Quick burst from center |
| `ConfettiJS.rain(options)` | Continuous rain effect |
| `ConfettiJS.fountain(options)` | Fountain from bottom |
| `ConfettiJS.fireworks(options)` | Multiple burst points |
| `ConfettiJS.hearts(options)` | Heart-shaped confetti |
| `ConfettiJS.stars(options)` | Star-shaped confetti |
| `ConfettiJS.custom(options)` | Fully customizable |
| `ConfettiJS.clear()` | Clear all animations |

### Options

```javascript
{
    count: 100,                    // Number of particles
    colors: ['#ff0000', '#00ff00'], // Array of hex colors
    shapes: ['circle', 'square'],   // Particle shapes
    spread: 45,                    // Spread angle (degrees)
    origin: { x: 0.5, y: 0.5 },   // Origin point (0-1)
    velocity: 50,                  // Initial velocity
    gravity: 0.5,                  // Gravity strength
    duration: 3000,                // Animation duration (ms)
    size: { min: 3, max: 8 }       // Particle size range
}
```

### Available Shapes
- `circle`
- `square` 
- `triangle`
- `heart`
- `star`

## Examples

### Birthday Celebration
```javascript
ConfettiJS.custom({
    colors: ['#ff69b4', '#87ceeb', '#98fb98'],
    shapes: ['heart', 'star'],
    count: 150,
    spread: 70
});
```

### Corporate Event
```javascript
ConfettiJS.custom({
    colors: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    shapes: ['square', 'circle'],
    count: 100,
    spread: 45
});
```

### New Year Celebration
```javascript
ConfettiJS.fireworks({
    colors: ['#ffd700', '#ff6b6b', '#4ecdc4'],
    count: 80
});
```

## Browser Support

- Chrome 30+
- Firefox 25+
- Safari 8+
- Edge 12+
- iOS Safari 8+
- Android Browser 4.4+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Basic confetti effects
- Customizable options
- Multiple animation types# confetti
