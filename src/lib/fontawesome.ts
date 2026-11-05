import { config } from '@fortawesome/fontawesome-svg-core';
// O CSS do Font Awesome (tamanho 1em, alinhamento etc.) entra pelo bundle do Vite...
import '@fortawesome/fontawesome-svg-core/styles.css';

// ...e por isso o FA NÃO precisa injetar um <style> sozinho em tempo de execução. Sem esta linha
// ele injetaria o CSS depois da página carregar (os ícones "pulam" de tamanho por um instante)
// e o Tailwind e o FA brigariam pela ordem das regras.
config.autoAddCss = false;
