import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Globe3D = ({ 
  data = [], 
  colorScale = (value) => value > 50 ? '#ef4444' : value > 25 ? '#f59e0b' : '#10b981',
  onCountryClick = () => {},
  selectedMetric = 'value',
  width = '100%',
  height = 400
}) => {
  const mountRef = useRef(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Globe geometry
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const bumpTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add data points
    const dataPoints = new THREE.Group();
    data.forEach(point => {
      if (point.lat && point.lon) {
        // Convert lat/lon to 3D coordinates
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (point.lon + 180) * (Math.PI / 180);
        
        const x = -5.1 * Math.sin(phi) * Math.cos(theta);
        const y = 5.1 * Math.cos(phi);
        const z = 5.1 * Math.sin(phi) * Math.sin(theta);
        
        // Create data point
        const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const pointMaterial = new THREE.MeshBasicMaterial({
          color: colorScale(point[selectedMetric])
        });
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
        pointMesh.position.set(x, y, z);
        pointMesh.userData = point;
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: colorScale(point[selectedMetric]),
          transparent: true,
          opacity: 0.3
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.copy(pointMesh.position);
        
        dataPoints.add(pointMesh);
        dataPoints.add(glowMesh);
      }
    });
    scene.add(dataPoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 15;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: event.offsetX - previousMousePosition.x,
          y: event.offsetY - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
            THREE.MathUtils.degToRad(deltaMove.y * 0.5),
            THREE.MathUtils.degToRad(deltaMove.x * 0.5),
            0,
            'XYZ'
          ));

        globe.quaternion.multiplyQuaternions(deltaRotationQuaternion, globe.quaternion);
        dataPoints.quaternion.copy(globe.quaternion);
        atmosphere.quaternion.copy(globe.quaternion);
      }

      // Raycast for hover effects
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(dataPoints.children.filter(child => child.userData.country));
      
      if (intersects.length > 0) {
        const hoveredPoint = intersects[0].object.userData;
        setHoveredCountry(hoveredPoint);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredCountry(null);
        document.body.style.cursor = 'default';
      }

      previousMousePosition = { x: event.offsetX, y: event.offsetY };
    };

    const handleMouseDown = (event) => {
      isDragging = true;
      previousMousePosition = { x: event.offsetX, y: event.offsetY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(dataPoints.children.filter(child => child.userData.country));
      
      if (intersects.length > 0) {
        onCountryClick(intersects[0].object.userData);
      }
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('click', handleClick);

    // Auto rotation
    const animate = () => {
      if (!isDragging) {
        globe.rotation.y += 0.005;
        dataPoints.rotation.y += 0.005;
        atmosphere.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    globeRef.current = globe;

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [data, selectedMetric, colorScale, onCountryClick, height]);

  return (
    <div className="relative">
      <div ref={mountRef} style={{ width, height }} />
      {hoveredCountry && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border">
          <h4 className="font-semibold text-gray-900">{hoveredCountry.country}</h4>
          <p className="text-sm text-gray-600">
            {selectedMetric}: {hoveredCountry[selectedMetric]}
            {selectedMetric.includes('percent') || selectedMetric.includes('rate') ? '%' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default Globe3D;