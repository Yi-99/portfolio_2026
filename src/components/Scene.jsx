import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

// GLSL 3D simplex noise (Ashima Arts)
const snoise = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const texturedVertexShader = /* glsl */`
${snoise}
uniform float uTime;
uniform float uDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisp;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;

  // Layered noise displacement
  float n1 = snoise(pos * 1.8 + uTime * 0.3) * 0.5;
  float n2 = snoise(pos * 3.6 + uTime * 0.5) * 0.25;
  float n3 = snoise(pos * 7.2 + uTime * 0.2) * 0.12;
  float disp = (n1 + n2 + n3) * uDisplacement;
  vDisp = disp;

  pos += normal * disp;
  vPosition = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const texturedFragmentShader = /* glsl */`
${snoise}
uniform float uTime;
uniform vec3 uAccent;
uniform float uScrollProgress;
uniform vec3 uLightDir;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisp;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Directional light (follows cursor)
  vec3 lightDir = normalize(uLightDir);
  float NdotL = dot(normal, lightDir);
  float diffuse = max(NdotL, 0.0);
  // Wrap lighting — pushes light into shadow areas, kills black spots
  float wrapDiffuse = (NdotL + 0.6) / 1.6;
  wrapDiffuse = max(wrapDiffuse, 0.0);

  // Specular highlight
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

  // Fresnel rim glow
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

  // Animated surface noise pattern
  float pattern = snoise(vPosition * 2.5 + uTime * 0.15);
  float pattern2 = snoise(vPosition * 5.0 - uTime * 0.1);
  float combinedPattern = pattern * 0.6 + pattern2 * 0.4;

  // Hexagonal cell-like pattern
  float cells = snoise(vPosition * 8.0 + uTime * 0.05);
  cells = smoothstep(0.0, 0.15, abs(cells));

  // Raised base color — no pure black
  vec3 baseColor = vec3(0.10, 0.10, 0.14);

  // Ambient light floor
  vec3 ambient = uAccent * 0.08 + vec3(0.06, 0.06, 0.08);

  // Accent-tinted veins that pulse with scroll
  vec3 veinColor = uAccent * (0.3 + uScrollProgress * 0.5);
  float veins = 1.0 - cells;
  veins *= 0.6 + 0.4 * sin(uTime * 0.8);

  // Iridescent shift based on view angle + displacement
  float iriShift = fresnel * 2.0 + vDisp * 3.0 + uTime * 0.1;
  vec3 iri = vec3(
    sin(iriShift) * 0.5 + 0.5,
    sin(iriShift + 2.094) * 0.5 + 0.5,
    sin(iriShift + 4.189) * 0.5 + 0.5
  );

  // Compose with lighting
  vec3 color = baseColor + ambient;
  color += uAccent * wrapDiffuse * 0.35;
  color += vec3(0.9, 0.92, 1.0) * diffuse * 0.15;
  color += uAccent * spec * 0.4;
  color += veinColor * veins * 0.4;
  color += uAccent * fresnel * (0.4 + uScrollProgress * 0.6);
  color += iri * fresnel * 0.08;
  color += uAccent * combinedPattern * 0.06;

  // Subtle edge glow intensifies on scroll
  float edgeGlow = fresnel * (0.3 + uScrollProgress * 0.7);
  color += uAccent * edgeGlow * 0.5;

  float alpha = 0.75 + fresnel * 0.25;

  gl_FragColor = vec4(color, alpha);
}
`

const Scene = forwardRef(function Scene(_, ref) {
  const canvasRef = useRef(null)
  const sceneAPI = useRef(null)

  useImperativeHandle(ref, () => ({
    setGeometry: (name) => sceneAPI.current?.setGeometry(name),
    setAccent: (hex) => sceneAPI.current?.setAccent(hex),
    setDensity: (mult) => sceneAPI.current?.setDensity(mult),
    setFog: (d) => sceneAPI.current?.setFog(d),
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060608, 0.02)

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 0, 28)

    // ── Soft star sprite texture ──
    const starCanvas = document.createElement('canvas')
    starCanvas.width = 64
    starCanvas.height = 64
    const ctx = starCanvas.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.08, 'rgba(255,255,255,1)')
    grad.addColorStop(0.2, 'rgba(255,255,255,0.9)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.5)')
    grad.addColorStop(0.6, 'rgba(255,255,255,0.15)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const starTexture = new THREE.CanvasTexture(starCanvas)

    // ── Starfield ──
    function makeStars(count, radius, size, color, opacity) {
      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const r = Math.pow(Math.random(), 0.5) * radius
        const theta = Math.random() * Math.PI * 2
        const z = (Math.random() - 0.5) * radius * 2.4
        positions[i * 3] = r * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(theta)
        positions[i * 3 + 2] = z
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        color, size, sizeAttenuation: true,
        transparent: true, opacity, depthWrite: false,
        blending: THREE.AdditiveBlending,
        map: starTexture,
      })
      return new THREE.Points(geo, mat)
    }

    const farStars = makeStars(1400, 80, 0.22, 0xffffff, 0.9)
    const midStars = makeStars(700, 50, 0.32, 0xffffff, 1.0)
    const nearStars = makeStars(220, 24, 0.45, 0xffffff, 1.0)
    scene.add(farStars, midStars, nearStars)

    // ── Higher-subdivision geometries for visible texture ──
    const geos = {
      icosahedron: new THREE.IcosahedronGeometry(2.2, 5),
      torus: new THREE.TorusKnotGeometry(1.6, 0.45, 220, 48, 2, 3),
      octahedron: new THREE.OctahedronGeometry(2.4, 4),
      dodecahedron: new THREE.DodecahedronGeometry(2.2, 4),
    }

    // Custom shader material for textured surface
    const accentColor = new THREE.Color(0x2a5ccc)
    const shaderUniforms = {
      uTime: { value: 0 },
      uAccent: { value: accentColor },
      uDisplacement: { value: 0.12 },
      uScrollProgress: { value: 0 },
      uLightDir: { value: new THREE.Vector3(1, 0.8, 1.5).normalize() },
    }

    const texturedMat = new THREE.ShaderMaterial({
      vertexShader: texturedVertexShader,
      fragmentShader: texturedFragmentShader,
      uniforms: shaderUniforms,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: true,
    })

    const objGroup = new THREE.Group()
    scene.add(objGroup)

    let mesh = null

    function setGeometry(name) {
      if (mesh) objGroup.remove(mesh)

      const g = geos[name] || geos.icosahedron
      mesh = new THREE.Mesh(g, texturedMat)
      objGroup.add(mesh)
    }
    setGeometry('icosahedron')

    // Core glow — slightly larger, more dynamic
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x2a5ccc, transparent: true, opacity: 0.9 })
    )
    scene.add(core)

    // Outer core haze
    const coreHaze = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x2a5ccc, transparent: true, opacity: 0.12,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    )
    scene.add(coreHaze)

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(3.4, 3.42, 96),
      new THREE.MeshBasicMaterial({ color: 0x2a5ccc, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
    )
    scene.add(halo)

    const halo2 = new THREE.Mesh(
      new THREE.RingGeometry(5.2, 5.205, 128),
      new THREE.MeshBasicMaterial({ color: 0xc8d8ff, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
    )
    scene.add(halo2)

    // ── State ──
    const state = { scroll: 0, mouseX: 0, mouseY: 0, targetMouseX: 0, targetMouseY: 0 }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight, false)
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      state.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    function onMouse(e) {
      state.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      state.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMouse)
    onScroll()

    const clock = new THREE.Clock()
    let raf = 0

    function tick() {
      const t = clock.elapsedTime
      clock.getDelta()

      state.mouseX += (state.targetMouseX - state.mouseX) * 0.04
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.04

      const z = 28 - state.scroll * 22
      camera.position.x = state.mouseX * 1.4
      camera.position.y = -state.mouseY * 1.0
      camera.position.z = z
      camera.lookAt(0, 0, 0)

      scene.fog.density = 0.024 - state.scroll * 0.018

      // Update shader uniforms
      shaderUniforms.uTime.value = t
      shaderUniforms.uScrollProgress.value = state.scroll
      shaderUniforms.uDisplacement.value = 0.08 + state.scroll * 0.18
      // Light follows cursor — comes from where mouse points
      shaderUniforms.uLightDir.value.set(
        state.mouseX * 2.0,
        -state.mouseY * 2.0,
        1.5
      ).normalize()

      objGroup.rotation.x = t * 0.08
      objGroup.rotation.y = t * 0.12
      objGroup.rotation.z = Math.sin(t * 0.4) * 0.05

      const s = 1 + state.scroll * 0.35
      objGroup.scale.setScalar(s)

      // Surface particles: gentle drift
      // Core breathing
      const breath = 1 + Math.sin(t * 1.5) * 0.22
      core.scale.setScalar(breath)
      core.material.opacity = 0.6 + 0.4 * Math.sin(t * 1.5)
      coreHaze.scale.setScalar(breath * 1.8)
      coreHaze.material.opacity = 0.08 + 0.08 * Math.sin(t * 1.5)

      halo.rotation.z = t * 0.1
      halo2.rotation.z = -t * 0.04
      halo.material.opacity = 0.12 + state.scroll * 0.12

      farStars.rotation.y = t * 0.01
      midStars.rotation.y = -t * 0.018
      nearStars.rotation.y = t * 0.03
      nearStars.position.z = -state.scroll * 4

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    sceneAPI.current = {
      setGeometry,
      setAccent(hex) {
        const c = new THREE.Color(hex)
        accentColor.copy(c)
        shaderUniforms.uAccent.value = c
        core.material.color.copy(c)
        coreHaze.material.color.copy(c)
        halo.material.color.copy(c)
      },
      setDensity(mult) {
        farStars.material.opacity = 0.9 * mult
        midStars.material.opacity = 1.0 * mult
        nearStars.material.opacity = 1.0 * mult
      },
      setFog(d) {
        scene.fog.density = d
      },
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMouse)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="scene-canvas-wrapper">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
})

export default Scene
