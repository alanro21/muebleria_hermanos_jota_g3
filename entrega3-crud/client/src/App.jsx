
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import butaca from './assets/Butaca Mendoza.png'
import escritorio from './assets/Escritorio Costa.png'
import FeaturedProducts from './components/FeaturedProducts'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ContactForm from './components/ContactForm'
import Cart from './components/Cart'
import AdminProductForm from './components/AdminProductForm'
import Admin from './components/Admin'
import { addToCart, changeQuantity, cartTotals, readCart } from './utils/cart'
import { PRODUCTS_API_URL } from './utils/api'
import { BrowserRouter, Link, Routes, Route, useNavigate, useParams, useLocation, } from 'react-router-dom'

function AppContent() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carrito, setCarrito] = useState(readCart)
  const [aviso, setAviso] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { cantidad } = cartTotals(carrito)

  function agregarProducto(producto) {
    setCarrito((actual) => addToCart(actual, producto))
    setAviso(`${producto.nombre} se agregó al carrito.`)
  }

  useEffect(() => {
    try {
      localStorage.setItem('jota-carrito', JSON.stringify(carrito))
    } catch {
      // El carrito sigue funcionando en memoria si el navegador no permite guardar.
    }
  }, [carrito])

  useEffect(() => {
    if (!aviso) return
    const timeout = setTimeout(() => setAviso(''), 3000)
    return () => clearTimeout(timeout)
  }, [aviso])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
  const controller = new AbortController()
  fetch(PRODUCTS_API_URL, { signal: controller.signal })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los productos')
      }

      return response.json()
    })
    .then((data) => {
      setProductos(data)
      setLoading(false)
    })
    .catch((error) => {
      if (error.name === 'AbortError') return
      setError(error.message)
      setLoading(false)
    })
  return () => controller.abort()
}, [])


  return (
    <div className="app">
      <div className={aviso ? 'cart-notice' : 'sr-only'} role="status">{aviso}</div>
      <Routes>
        <Route path="/" element={
        <main className="inicio">
          <div className="hero-stage">
            <Navbar cantidadCarrito={cantidad} />
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero-content">
                <span className="hero-etiqueta">Tradición desde 1960</span>
                <h1 id="hero-title">Diseño que perdura,<br /> hogares que inspiran.</h1>
                <p>
                  En Hermanos Jota hacemos muebles para acompañar tu vida cotidiana.
                  Trabajamos con materiales nobles y oficio heredado, sumando
                  soluciones actuales para que cada pieza encuentre su lugar y dure
                  muchos años.
                </p>
                <div className="hero-actions">
                  <Link to="/productos" className="hero-button hero-button-primary">
                    Ver productos
                  </Link>
                  <Link to="/contacto" className="hero-button hero-button-secondary">
                    Consultá por tu proyecto
                  </Link>
                </div>
              </div>

              <div className="hero-visual" aria-label="Muebles destacados de Hermanos Jota">
                <div className="hero-visual-inner">
                  <div className="hero-chair">
                    <img src={butaca} alt="Butaca Mendoza tapizada en rosa" />
                  </div>
                  <div className="hero-desk">
                    <img src={escritorio} alt="Escritorio Costa de madera" />
                  </div>
                  <div className="hero-years">
                    <span>Más de</span>
                    <strong>Seis décadas</strong>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <FeaturedProducts
            loading={loading}
            error={error}
            productos={productos}
            onProductSelect={(producto) => navigate(`/productos/${producto.id}`)}
          />

          <section className="calidad" aria-labelledby="calidad-title">
            <div className="calidad-titulo">
              <span className="calidad-etiqueta">El detalle importa</span>
              <h2 id="calidad-title">
                Calidad que
                <em>perdura.</em>
              </h2>
            </div>
            <p className="calidad-descripcion">
              Cada pieza nace de manos expertas y materiales nobles. Con el
              tiempo suma carácter, se vuelve parte de tu rutina y acompaña nuevas
              historias en tu hogar.
            </p>
            <Link className="calidad-contacto" to="/contacto">
              Contactanos <span aria-hidden="true">↗</span>
            </Link>
          </section>

          <section className="legado" aria-labelledby="legado-title">
            <div className="legado-heading">
              <span className="legado-etiqueta">Una experiencia que permanece</span>
              <h2 id="legado-title">Más que muebles, un legado.</h2>
            </div>
            <div className="legado-grid">
              <article className="legado-card">
                <span className="legado-numero">01</span>
                <h3>Primera impresión</h3>
                <p>
                  Notás la calidez de los materiales y el cuidado de cada
                  terminación desde el primer momento.
                </p>
              </article>
              <article className="legado-card">
                <span className="legado-numero">02</span>
                <h3>Conexión más profunda</h3>
                <p>
                  Cuando la mirás de cerca, aparecen los detalles: materiales
                  elegidos con criterio, proporciones cómodas y una historia de
                  oficio detrás.
                </p>
              </article>
              <article className="legado-card">
                <span className="legado-numero">03</span>
                <h3>Impacto duradero</h3>
                <p>
                  Con el uso, la pieza gana carácter y se integra naturalmente a
                  tus días. Está hecha para acompañarte, no para pasar de moda.
                </p>
              </article>
            </div>
          </section>

          <section className="materiales" aria-labelledby="materiales-title">
            <div className="materiales-heading">
              <div>
                <span className="materiales-etiqueta">Elegir bien también es diseñar</span>
                <p>
                  Nuestro compromiso con el ambiente y las próximas generaciones
                  guía cada decisión, desde el abastecimiento hasta el cuidado de
                  cada pieza.
                </p>
              </div>
              <h2 id="materiales-title">Materiales con futuro</h2>
            </div>

            <div className="materiales-grid">
              <article className="materiales-card">
                <h3>Cómo elegimos</h3>
                <ul>
                  <li>Madera certificada FSC de bosques responsables argentinos</li>
                  <li>Prioridad al algarrobo, quebracho y caldén</li>
                  <li>Acabados y adhesivos de bajo COV</li>
                  <li>Proveedores locales del Gran Buenos Aires</li>
                  <li>Al menos 30% de materiales recuperados o reciclados</li>
                  <li>Cero plásticos de un solo uso en la cadena</li>
                </ul>
              </article>

              <article className="materiales-card">
                <h3>Acabados naturales</h3>
                <dl className="acabados-lista">
                  <div>
                    <dt>Aceite de lino</dt>
                    <dd>100% natural, prensado en frío</dd>
                  </div>
                  <div>
                    <dt>Cera de abejas</dt>
                    <dd>Origen local certificado</dd>
                  </div>
                  <div>
                    <dt>Tintes vegetales</dt>
                    <dd>Base agua y pigmentos naturales</dd>
                  </div>
                </dl>
              </article>
            </div>

            <aside className="herencia-viva">
              <div className="herencia-intro">
                <span>Compromiso de longevidad</span>
                <h3>Herencia Viva</h3>
                <p>
                  Una pieza bien cuidada puede acompañar varias generaciones.
                  Por eso también nos ocupamos de lo que pasa después de la compra.
                </p>
              </div>
              <ul>
                <li><strong>Garantía extendida:</strong> 10 años en estructura y 5 en acabados</li>
                <li><strong>Restauración:</strong> recuperamos y renovamos piezas antiguas</li>
                <li><strong>Taller de cuidados:</strong> capacitación gratuita para clientes</li>
                <li><strong>Recompra:</strong> hasta 40% del valor en piezas bien cuidadas</li>
                <li><strong>Trazabilidad:</strong> certificado del origen de cada material</li>
              </ul>
            </aside>
          </section>
        </main>
        } />
        <Route path="/productos" element={
        <>
          <Navbar cantidadCarrito={cantidad} />
          <main className="catalogo-page">
            <ProductList
              onAddToCart={agregarProducto}
              productos={productos}
              loading={loading}
              error={error}
              onProductSelect={(producto) => navigate(`/productos/${producto.id}`)}
            />
          </main>
        </>
        } />
        <Route path="/productos/:id" element={
          <ProductDetailRoute
            productos={productos}
            loading={loading}
            error={error}
            cantidadCarrito={cantidad}
            onAddToCart={agregarProducto}
            onProductSelect={(producto) => navigate(`/productos/${producto.id}`)}
          />
        } />
        <Route path="/contacto" element={
        <>
          <Navbar cantidadCarrito={cantidad} />
          <ContactForm />
        </>
        } />
        <Route path="/carrito" element={
        <>
          <Navbar cantidadCarrito={cantidad} />
          <Cart
            items={carrito}
            onNavigate={(destino) => navigate(destino === 'productos' ? '/productos' : '/contacto')}
          onQuantityChange={(id, delta) => setCarrito((actual) => changeQuantity(actual, id, delta))}
          onRemove={(id) => setCarrito((actual) => actual.filter((item) => item.id !== id))}
            onClear={() => setCarrito([])}
          />
        </>
        } />
        <Route path="/admin" element={
          <>
            <Navbar cantidadCarrito={cantidad} />
            <Admin />
          </>
        } />
      


        <Route path="*" element={
          <>
            <Navbar cantidadCarrito={cantidad} />
            <main className="simple-page">
              <h1>Página no encontrada</h1>
              <p>La página que buscás no existe o fue movida.</p>
              <Link className="jota-button" to="/">Volver al inicio</Link>
            </main>
          </>
        } />
        


      </Routes>
      <Footer />
    </div>
  )
}

function ProductDetailRoute({
  productos,
  loading,
  error,
  cantidadCarrito,
  onAddToCart,
  onProductSelect,
}) {
  const { id } = useParams()
  const producto = productos.find((item) => String(item.id) === id)

  if (loading) {
    return (
      <>
        <Navbar cantidadCarrito={cantidadCarrito} />
        <main className="detalle-page"><p role="status">Cargando producto...</p></main>
      </>
    )
  }

  if (error || !producto) {
    return (
      <>
        <Navbar cantidadCarrito={cantidadCarrito} />
        <main className="simple-page">
          <h1>{error ? 'No pudimos cargar el producto' : 'Producto no encontrado'}</h1>
          <p>{error || 'El producto solicitado no existe.'}</p>
          <Link className="jota-button" to="/productos">Volver al catálogo</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} />
      <main className="detalle-page">
        <ProductDetail
          onAddToCart={onAddToCart}
          producto={producto}
          productos={productos}
          onProductSelect={onProductSelect}
        />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
