
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getCountriesGeoJSON } from '../../api/dataProviders';

const InteractiveWorldMap = ({ onCountryClick }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [hoverName, setHoverName] = useState(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId;
    
    // Définir les dimensions de base de la carte (longitude/latitude)
    const MAP_WIDTH = 360;
    const MAP_HEIGHT = 180;
    const MAP_ASPECT = MAP_WIDTH / MAP_HEIGHT;

    // Scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);

    // Caméra orthographique pour un rendu 2D
    const aspect = currentMount.clientWidth / currentMount.clientHeight;
    let frustumSize;

    if (aspect > MAP_ASPECT) {
        // Si le conteneur est plus large que la carte, on s'adapte à la hauteur
        frustumSize = MAP_HEIGHT;
    } else {
        // Si le conteneur est plus haut, on s'adapte à la largeur
        frustumSize = MAP_WIDTH / aspect;
    }

    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2, (frustumSize * aspect) / 2,
      frustumSize / 2, frustumSize / -2,
      1, 1000
    );
    camera.position.set(0, 0, 200);
    camera.updateProjectionMatrix();

    // Rendu
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minZoom = 0.5;
    controls.maxZoom = 8;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 100, 100);
    scene.add(directionalLight);

    // Matériaux
    const countryMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.5, roughness: 0.6 });
    const highlightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xff6b35, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.4 });

    // Raycasting pour la détection du survol et du clic
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredCountry = null;
    let countryMeshes = [];
    const hoverElevation = 3;

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      setPointerPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    const handleClick = () => {
        if (hoveredCountry && onCountryClick) {
            onCountryClick(hoveredCountry.name);
        }
    };

    function drawCountries(geojsonData) {
      geojsonData.features.forEach(feature => {
        const { properties, geometry } = feature;
        if (!geometry) return;

        const group = new THREE.Group();
        group.name = properties.name || 'Unnamed';
        group.userData = { originalZ: 0, targetZ: 0 };

        createShapes(geometry).forEach(shape => {
          const geom = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
          const mesh = new THREE.Mesh(geom, countryMaterial.clone());
          group.add(mesh);
        });
        
        countryMeshes.push(group);
        scene.add(group);
      });
      setLoading(false);
    }
    
    // Fonction corrigée pour un mappage direct des coordonnées (Longitude -> X, Latitude -> Y)
    function createShapes(geometry) {
        const shapes = [];
        
        const createShapeFromPolygon = (polygonCoords) => {
            const shape = new THREE.Shape();
            const outerRing = polygonCoords[0];
            shape.moveTo(outerRing[0][0], outerRing[0][1]); 
            for (let i = 1; i < outerRing.length; i++) {
                shape.lineTo(outerRing[i][0], outerRing[i][1]);
            }

            for (let i = 1; i < polygonCoords.length; i++) {
                const hole = new THREE.Path();
                const holeRing = polygonCoords[i];
                hole.moveTo(holeRing[0][0], holeRing[0][1]); 
                for (let j = 1; j < holeRing.length; j++) {
                    hole.lineTo(holeRing[j][0], holeRing[j][1]);
                }
                shape.holes.push(hole);
            }
            return shape;
        }

        if (geometry.type === 'Polygon') {
            shapes.push(createShapeFromPolygon(geometry.coordinates));
        } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach(polygon => shapes.push(createShapeFromPolygon(polygon)));
        }
        return shapes;
    }

    getCountriesGeoJSON().then(({ data, error }) => {
      if (error) {
        console.error("Failed to load GeoJSON", error);
        setLoading(false);
        return;
      }
      drawCountries(data);
    });

    // Gestion du redimensionnement de la fenêtre
    function handleResize() {
        if (!currentMount) return;
        const newAspect = currentMount.clientWidth / currentMount.clientHeight;
        let newFrustumSize;
        if (newAspect > MAP_ASPECT) {
            newFrustumSize = MAP_HEIGHT;
        } else {
            newFrustumSize = MAP_WIDTH / newAspect;
        }
        
        camera.left = (newFrustumSize * newAspect) / -2;
        camera.right = (newFrustumSize * newAspect) / 2;
        camera.top = newFrustumSize / 2;
        camera.bottom = newFrustumSize / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    }

    const canvas = renderer.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(countryMeshes, true);

      const intersectedObject = intersects.length > 0 ? intersects[0].object.parent : null;

      if (hoveredCountry !== intersectedObject) {
          if (hoveredCountry) {
              hoveredCountry.children.forEach(child => child.material = countryMaterial);
              hoveredCountry.userData.targetZ = 0;
          }
          hoveredCountry = intersectedObject;
          if (hoveredCountry) {
              hoveredCountry.children.forEach(child => child.material = highlightMaterial);
              hoveredCountry.userData.targetZ = hoverElevation;
              setHoverName(hoveredCountry.name);
          } else {
              setHoverName(null);
          }
      }
      
      countryMeshes.forEach(country => {
          country.position.z = THREE.MathUtils.lerp(country.position.z, country.userData.targetZ, 0.1);
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, [onCountryClick]);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#101010]/80 z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[#a0a0a0] font-mono">Chargement des données géopolitiques...</span>
          </div>
        </div>
      )}
      {hoverName && (
        <div
          className="absolute z-30 pointer-events-none bg-[#1a1a1a]/80 text-white text-xs px-2 py-1 rounded"
          style={{ left: pointerPos.x + 10, top: pointerPos.y + 10 }}
        >
          {hoverName}
        </div>
      )}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </>
  );
};

export default InteractiveWorldMap;
