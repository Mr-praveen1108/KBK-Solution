import React, { useEffect, useRef, useState } from 'react';

// List of technologies to display with their name and custom icon/color
const TECHNOLOGIES = [
  { name: 'React', color: '#61DAFB', symbol: '⚛' },
  { name: 'JavaScript', color: '#F7DF1E', symbol: 'JS' },
  { name: 'TypeScript', color: '#3178C6', symbol: 'TS' },
  { name: 'HTML5', color: '#E34F26', symbol: '5' },
  { name: 'CSS3', color: '#1572B6', symbol: '3' },
  { name: 'Node.js', color: '#339933', symbol: '⬢' },
  { name: 'Python', color: '#3776AB', symbol: 'Py' },
  { name: 'Git', color: '#F05032', symbol: 'Git' },
  { name: 'Docker', color: '#2496ED', symbol: '🐳' },
  { name: 'Figma', color: '#F24E1E', symbol: 'Fg' },
  { name: 'Tailwind', color: '#06B6D4', symbol: '≈' },
  { name: 'Next.js', color: '#FFFFFF', symbol: 'N' },
  { name: 'GitHub', color: '#FFFFFF', symbol: 'Git' },
  { name: 'PostgreSQL', color: '#4169E1', symbol: '🐘' },
  { name: 'MongoDB', color: '#47A248', symbol: '🍃' },
  { name: 'GraphQL', color: '#E10098', symbol: 'GQL' },
  { name: 'Vite', color: '#646CFF', symbol: '⚡' },
  { name: 'AWS', color: '#FF9900', symbol: 'aws' },
];

export default function InteractiveSphere() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 500;
    let height = 480;
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const measuredW = container.clientWidth;
      const measuredH = container.clientHeight;
      width = measuredW > 80 ? measuredW : 500;
      height = measuredH > 80 ? measuredH : 480;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Initial 3D nodes using Fibonacci Sphere algorithm
    const nodes = [];
    const radius = Math.min(width, height) * 0.38;
    const N = TECHNOLOGIES.length;
    
    for (let i = 0; i < N; i++) {
      const theta = Math.acos(-1 + (2 * i) / N);
      const phi = Math.sqrt(N * Math.PI) * theta;
      
      nodes.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        tech: TECHNOLOGIES[i],
        screenX: 0,
        screenY: 0,
        scale: 1,
        opacity: 1
      });
    }

    // Rotation angles
    let angleX = 0.003; // Auto rotation speeds
    let angleY = 0.003;
    let targetAngleX = 0.003;
    let targetAngleY = 0.003;

    // Interaction states
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Rotation helper functions
    const rotateX = (node, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = node.y * cos - node.z * sin;
      const z = node.y * sin + node.z * cos;
      node.y = y;
      node.z = z;
    };

    const rotateY = (node, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = node.x * cos - node.z * sin;
      const z = node.x * sin + node.z * cos;
      node.x = x;
      node.z = z;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const depth = 350; // Camera distance perspective

      // Apply rotation interpolation (momentum damping)
      if (!isDragging) {
        angleX += (targetAngleX - angleX) * 0.05;
        angleY += (targetAngleY - angleY) * 0.05;
      }

      // Rotate nodes
      nodes.forEach(node => {
        rotateX(node, angleX);
        rotateY(node, angleY);
      });

      // Update positions & project to 2D
      nodes.forEach(node => {
        const scale = depth / (depth - node.z);
        node.screenX = centerX + node.x * scale;
        node.screenY = centerY + node.y * scale;
        node.scale = scale;
        // Fade out items in the background
        node.opacity = Math.max(0.12, (node.z + radius) / (2 * radius));
      });

      // Sort by depth (painter's algorithm)
      const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

      // Draw wireframe connections (only close nodes)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
          if (dist < radius * 1.0) {
            const avgOpacity = (nodes[i].opacity + nodes[j].opacity) / 2;
            const grad = ctx.createLinearGradient(nodes[i].screenX, nodes[i].screenY, nodes[j].screenX, nodes[j].screenY);
            grad.addColorStop(0, `${nodes[i].tech.color}${Math.floor(avgOpacity * 90).toString(16).padStart(2, '0')}`);
            grad.addColorStop(1, `${nodes[j].tech.color}${Math.floor(avgOpacity * 90).toString(16).padStart(2, '0')}`);
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(nodes[i].screenX, nodes[i].screenY);
            ctx.lineTo(nodes[j].screenX, nodes[j].screenY);
            ctx.stroke();
          }
        }
      }

      // Draw tilted glowing orbital rings (similar to screenshot)
      // Blue outer orbit
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.15); // Tilt angle
      ctx.scale(1, 0.35); // Ellipse compression
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Copper/Orange inner orbit
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(0.2); // Tilted opposite way
      ctx.scale(1, 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.05, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Find hovered node
      let currentHovered = null;
      if (!isDragging) {
        for (let i = nodes.length - 1; i >= 0; i--) {
          const node = nodes[i];
          const dist = Math.hypot(node.screenX - mouseX, node.screenY - mouseY);
          if (dist < 22 * node.scale) {
            currentHovered = node;
            break;
          }
        }
      }

      setHoveredNode(currentHovered ? currentHovered.tech.name : null);

      // Render tags/nodes
      sortedNodes.forEach(node => {
        const isSelfHovered = currentHovered && currentHovered.tech.name === node.tech.name;
        
        ctx.save();
        ctx.translate(node.screenX, node.screenY);
        ctx.scale(node.scale * (isSelfHovered ? 1.15 : 1), node.scale * (isSelfHovered ? 1.15 : 1));

        // Draw small badge/ring around node
        const badgeRadius = 14;
        const opacityHex = Math.floor(node.opacity * 255).toString(16).padStart(2, '0');
        
        // Shadow/glow for active nodes or hovered node
        if (isSelfHovered) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = node.tech.color;
        }

        // Draw circular badge background
        ctx.fillStyle = `rgba(22, 27, 38, ${isSelfHovered ? 0.98 : Math.max(0.85, node.opacity)})`;
        ctx.strokeStyle = `${node.tech.color}${isSelfHovered ? 'ff' : Math.floor(Math.max(node.opacity, 0.6) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = isSelfHovered ? 2 : 1;
        ctx.beginPath();
        ctx.arc(0, 0, badgeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw Icon Symbol in center
        ctx.fillStyle = isSelfHovered ? '#ffffff' : `${node.tech.color}${opacityHex}`;
        ctx.font = 'bold 10px Outfit';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.tech.symbol, 0, 0);

        // Draw Name text slightly below when close or hovered
        if (node.z > -radius * 0.3 || isSelfHovered) {
          ctx.fillStyle = isSelfHovered ? '#ffffff' : `rgba(243, 244, 246, ${node.opacity})`;
          ctx.font = isSelfHovered ? 'bold 10px Outfit' : '400 9px Inter';
          ctx.fillText(node.tech.name, 0, badgeRadius + 11);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Event Handlers for interactive drag & hover
    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = x;
      mouseY = y;

      if (!isDragging) {
        // Slow sway/tilt based on hover coordinate
        targetAngleX = (y - height / 2) * 0.00002;
        targetAngleY = (x - width / 2) * 0.00002;
        return;
      }

      // Modify sphere rotation based on drag movement
      const dx = x - startX;
      const dy = y - startY;
      angleY = dx * 0.005;
      angleX = -dy * 0.005;

      startX = x;
      startY = y;
    };

    const handleMouseUp = () => {
      isDragging = false;
      // Damping back to normal speed
      targetAngleX = 0.003;
      targetAngleY = 0.003;
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[360px] w-full items-center justify-center sm:min-h-[400px] lg:min-h-[440px]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-full bg-gradient-to-tr from-brand-teal/20 via-brand-violet/15 to-brand-green/20 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <canvas
        ref={canvasRef}
        className="relative z-10 block w-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: '360px' }}
      />

      {hoveredNode && (
        <div className="absolute top-6 z-20 flex items-center gap-2 rounded-full border border-brand-green/30 bg-space-mid/90 px-4 py-2 text-xs font-bold tracking-wider text-brand-glow shadow-glow-sm backdrop-blur-md transition-all duration-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
          {hoveredNode.toUpperCase()}
        </div>
      )}
    </div>
  );
}
