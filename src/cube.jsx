import { useEffect, useRef } from "react";

import * as THREE from "three";
import { div } from "three/tsl";

const Cube = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer( {antialias: true} );

        renderer.setSize(window.innerWidth,window.innerHeight);

        mountRef.current.appendChild(renderer.domElement);

        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1.1;
        const far = 7;
        const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(-1,2,4);
        scene.add(light);

        const geometry = new THREE.BoxGeometry(1,1,1);

        const material = new THREE.MeshPhongMaterial({color: '#85B2DD'});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube)    

        const animate = (time) => {
            time *= 0.001;
            cube.rotation.x= time;
            cube.rotation.y = time;
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        const handlerResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

        }
        window.addEventListener("resize", handlerResize);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener("resize", handlerResize);
        };        

    },[]) ;
    return <div ref={mountRef} />;
};

export default Cube;
