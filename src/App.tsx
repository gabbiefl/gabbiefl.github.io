import { lazy, Suspense } from 'react';
import Home from './pages/Home';

// /kit é a galeria de componentes, uma página de DESENVOLVIMENTO. `import.meta.env.DEV` é trocado
// por `false` no build, então o ramo (e o import dinâmico dele) é descartado: a página não entra
// no bundle de produção, e em produção /kit simplesmente mostra o site.
const Kit = import.meta.env.DEV ? lazy(() => import('./pages/Kit')) : null;

export default function App() {
  if (Kit && window.location.pathname === '/kit') {
    return (
      <Suspense fallback={null}>
        <Kit />
      </Suspense>
    );
  }
  return <Home />;
}
