import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background() {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 800
    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 50
      posArray[i + 1] = (Math.random() - 0.5) * 50
      posArray[i + 2] = (Math.random() - 0.5) * 50

      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colorArray[i] = 0
        colorArray[i + 1] = 0.96
        colorArray[i + 2] = 1
      } else if (colorChoice < 0.66) {
        colorArray[i] = 0.29
        colorArray[i + 1] = 0.56
        colorArray[i + 2] = 0.89
      } else {
        colorArray[i] = 1
        colorArray[i + 1] = 0
        colorArray[i + 2] = 0.67
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    const gridHelper = new THREE.GridHelper(100, 50, 0x00f5ff, 0x1a1a3e)
    gridHelper.position.y = -20
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.2
    scene.add(gridHelper)

    const shootingStars = []
    const starGeometry = new THREE.SphereGeometry(0.1, 8, 8)

    function createShootingStar() {
      const star = new THREE.Mesh(starGeometry, new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1
      }))

      star.position.x = (Math.random() - 0.5) * 40
      star.position.y = Math.random() * 10 + 10
      star.position.z = (Math.random() - 0.5) * 40

      star.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          -Math.random() * 0.3 - 0.1,
          (Math.random() - 0.5) * 0.3
        )
      }

      scene.add(star)
      shootingStars.push(star)
    }

    camera.position.z = 20

    let time = 0

    function animate() {
      requestAnimationFrame(animate)
      time += 0.001

      particlesMesh.rotation.y = time * 0.2
      particlesMesh.rotation.x = Math.sin(time * 0.5) * 0.1

      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(time * 2 + positions[i3] * 0.1) * 0.01
      }
      particlesGeometry.attributes.position.needsUpdate = true

      gridHelper.position.z = (time * 10) % 10

      if (Math.random() < 0.02) {
        createShootingStar()
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        star.position.add(star.userData.velocity)
        star.material.opacity -= 0.02

        if (star.material.opacity <= 0) {
          scene.remove(star)
          shootingStars.splice(i, 1)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove)

    sceneRef.current = { scene, camera, renderer }

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="bg-canvas" />
}
