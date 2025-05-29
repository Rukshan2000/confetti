// shan-ui.js
(() => {
    const css = `
      /* === Shaan UI Core === */
  
      /* Glow */
      .glow-blue {
        box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.7);
      }
      .glow-pink {
        box-shadow: 0 0 10px 3px rgba(219, 39, 119, 0.7);
      }
  
      /* Smooth float */
      @keyframes floatSmooth {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .float-smooth {
        animation: floatSmooth 3s ease-in-out infinite;
      }
  
      /* Fade in */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .fade-in {
        animation: fadeIn 1s ease forwards;
      }
  
      /* Bounce click */
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      .bounce-click {
        cursor: pointer;
        display: inline-block;
      }
      .bounce-click:active {
        animation: bounce 0.3s ease forwards;
      }
  
      /* Gradient background */
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .gradient-bg {
        background: linear-gradient(270deg, #ff6ec4, #7873f5, #4ade80);
        background-size: 600% 600%;
        animation: gradientShift 15s ease infinite;
        color: white;
      }
  
      /* Shadow depth */
      .shadow-depth {
        box-shadow:
          0 2px 4px rgba(0,0,0,0.1),
          0 8px 16px rgba(0,0,0,0.1);
      }
  
      /* Rounded corners */
      .round-small { border-radius: 4px; }
      .round-medium { border-radius: 12px; }
      .round-large { border-radius: 32px; }
  
      /* Neon text */
      .text-neon {
        color: #0ff;
        text-shadow:
          0 0 5px #0ff,
          0 0 10px #0ff,
          0 0 20px #0ff,
          0 0 40px #0ff;
      }
  
      /* Soft pulse */
      @keyframes pulseSoft {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .pulse-soft {
        animation: pulseSoft 3s ease-in-out infinite;
      }
  
      /* Glass effect */
      .glass {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
  
      /* Text shadow colors */
      .shadow-text-blue {
        text-shadow: 0 0 4px #3b82f6;
      }
      .shadow-text-pink {
        text-shadow: 0 0 5px #db2777;
      }
      .shadow-text-green {
        text-shadow: 0 0 6px #4ade80;
      }
  
      /* Rotate spin */
      @keyframes rotateSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .rotate-spin {
        display: inline-block;
        animation: rotateSpin 4s linear infinite;
      }
  
      /* Hover scale */
      .hover-scale {
        transition: transform 0.3s ease;
        display: inline-block;
      }
      .hover-scale:hover {
        transform: scale(1.1);
      }
  
      /* Slide in left */
      @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .slide-in-left {
        animation: slideInLeft 0.7s ease forwards;
      }
  
      /* Underline gradient */
      .underline-gradient {
        background-image: linear-gradient(90deg, #3b82f6, #db2777);
        background-repeat: no-repeat;
        background-size: 100% 2px;
        background-position: 0 100%;
        text-decoration: none;
        transition: background-size 0.3s ease;
      }
      .underline-gradient:hover {
        background-size: 100% 4px;
      }
  
      /* Button styles */
      .btn-primary {
        background-color: #3b82f6;
        color: white;
        padding: 0.5rem 1.2rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(59,130,246,0.4);
        transition: background-color 0.3s ease;
      }
      .btn-primary:hover {
        background-color: #2563eb;
      }
      .btn-secondary {
        background-color: #f97316;
        color: white;
        padding: 0.5rem 1.2rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(249,115,22,0.4);
        transition: background-color 0.3s ease;
      }
      .btn-secondary:hover {
        background-color: #c2410c;
      }
  
      /* Cursor pointer */
      .cursor-pointer {
        cursor: pointer;
      }
  
      /* Responsive example */
      @media (max-width: 600px) {
        .text-responsive {
          font-size: 1rem !important;
        }
      }
      @media (min-width: 601px) {
        .text-responsive {
          font-size: 1.5rem !important;
        }
      }
  
      /* Padding and margin utilities (basic) */
      .p-4 { padding: 1rem; }
      .m-4 { margin: 1rem; }
    `;
  
    const styleTag = document.createElement('style');
    styleTag.id = 'shaan-ui-style';
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  
    // Expose ShaanUI object for future extensions
    window.ShaanUI = {
      version: '1.0.0',
      reload() {
        const oldStyle = document.getElementById('shaan-ui-style');
        if (oldStyle) oldStyle.remove();
        document.head.appendChild(styleTag);
      },
    };
  })();
  