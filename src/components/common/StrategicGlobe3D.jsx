
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const StrategicGlobe3D = ({ height = 600 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let animationId;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a192f, 0.1);
    
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / height, 0.1, 1000);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, height);
    renderer.setClearColor(0x000000, 0);
    if (mountRef.current.children.length === 0) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Globe principal avec shader holographique amélioré
    const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(0x00ffff) }, // Cyan
        baseColor: { value: new THREE.Color(0x002244) }, // Darker Blue
        fresnelPower: { value: 2.5 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        uniform vec3 baseColor;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          // Fresnel effect for edge glow
          float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), fresnelPower);
          vec3 finalColor = mix(baseColor, glowColor, intensity);
          
          // Scanlines
          float scanline = sin((vPosition.y * 30.0) + time * 5.0) * 0.04;
          finalColor += scanline;
          
          // Grid pattern
          float grid = pow(abs(sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time)), 0.5) * 0.2;
          finalColor = mix(finalColor, glowColor, grid);

          // Glitchy noise
          float noise = random(gl_FragCoord.xy * 0.01 * time) * 0.05;
          finalColor += noise;

          gl_FragColor = vec4(finalColor, intensity * 0.7 + 0.2);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Grille extérieure subtile
    const gridGeometry = new THREE.SphereGeometry(5.05, 32, 32);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframe = new THREE.Mesh(gridGeometry, gridMaterial);
    scene.add(wireframe);

    // Anneaux orbitaux tactiques
    const createRing = (radius, color, rotation) => {
        const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = rotation.x;
        ring.rotation.y = rotation.y;
        scene.add(ring);
        return ring;
    };
    const ring1 = createRing(6, 0xff6b35, { x: Math.PI / 2, y: 0.1 });
    const ring2 = createRing(6.5, 0x00ffff, { x: 0, y: 0 });
    const ring3 = createRing(7, 0xff6b35, {x: -Math.PI / 3, y: Math.PI / 4});

    // Éclairage
    const keyLight = new THREE.DirectionalLight(0xff6b35, 1.0); // Orange
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0x00ffff, 0.7); // Cyan
    fillLight.position.set(-5, -3, 5);
    scene.add(fillLight);

    // Interaction
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationSpeed = 0.5;

    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };
        
        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            THREE.MathUtils.degToRad(deltaMove.y * rotationSpeed),
            THREE.MathUtils.degToRad(deltaMove.x * rotationSpeed),
            0,
            'XYZ'
          )
        );
        
        const allObjects = [globe, wireframe, ring1, ring2, ring3];
        allObjects.forEach(obj => {
          obj.quaternion.multiplyQuaternions(deltaRotationQuaternion, obj.quaternion);
        });
      }
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseDown = (event) => { isDragging = true; };
    const onMouseUp = () => { isDragging = false; };
    
    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('mouseleave', onMouseUp);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Constant, unconditional rotation logic applied each frame.
      // This ensures the globe is always spinning.
      // The speed is increased for better visibility.
      const autoRotationSpeed = 0.002;
      const deltaRotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0), // Rotate around the Y (up) axis
        autoRotationSpeed
      );

      // Group all objects that should rotate together
      const allObjects = [globe, wireframe, ring1, ring2, ring3];
      
      // Apply the same constant rotation to all objects so they spin as a single unit.
      // This will correctly compose with the user's drag rotation.
      allObjects.forEach(obj => {
        obj.quaternion.premultiply(deltaRotationQuaternion);
      });
      
      globe.material.uniforms.time.value = elapsedTime;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousemove', onMouseMove);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mouseleave', onMouseUp);
      if (mountRef.current && domElement.parentElement) {
        mountRef.current.removeChild(domElement);
      }
      renderer.dispose();
      // Dispose geometries and materials
      globeGeometry.dispose();
      globeMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      ring1.geometry.dispose();
      ring1.material.dispose();
      ring2.geometry.dispose();
      ring2.material.dispose();
      ring3.geometry.dispose();
      ring3.material.dispose();
    };
  }, [height]);

  return <div ref={mountRef} style={{ width: '100%', height, cursor: 'grab' }} />;
};

export default StrategicGlobe3D;
