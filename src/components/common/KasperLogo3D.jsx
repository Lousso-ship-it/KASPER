import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const KasperLogo3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || !mountRef.current.parentElement) return;

    let animationId;
    const parent = mountRef.current.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    // --- Scene and Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (mountRef.current.children.length === 0) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 8, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xff6b35, 0.8, 20);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4fc3f7, 0.6, 20);
    pointLight2.position.set(5, 5, -5);
    scene.add(pointLight2);

    // --- Main Logo Group ---
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // --- Torus Knot Creation ---
    const knotGroup = new THREE.Group();
    logoGroup.add(knotGroup);

    // Create the torus knot geometry
    const knotGeometry = new THREE.TorusKnotGeometry(2.5, 0.7, 128, 32, 2, 3);
    
    // Smooth, ceramic-like material matching the image
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8c5d1,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    torusKnot.castShadow = true;
    torusKnot.receiveShadow = true;
    knotGroup.add(torusKnot);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    
    const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotation.x = mouse.y * 0.3;
        targetRotation.y = mouse.x * 0.3;
    };
    
    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Torus knot rotation with mouse influence
        knotGroup.rotation.x += (targetRotation.x - knotGroup.rotation.x) * 0.05;
        knotGroup.rotation.y += (targetRotation.y - knotGroup.rotation.y) * 0.05;
        knotGroup.rotation.y += 0.008; // Continuous rotation
        knotGroup.rotation.x += 0.004; // Slight x rotation for 3D effect

        // Subtle floating animation
        knotGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.2;

        renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    const handleResize = () => {
        if (!mountRef.current || !parent) return;
        const newWidth = parent.clientWidth;
        const newHeight = parent.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        domElement.removeEventListener('mousemove', onMouseMove);
        if (mountRef.current && renderer.domElement.parentElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.traverse(object => {
            if (object.isMesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />;
};

export default KasperLogo3D;