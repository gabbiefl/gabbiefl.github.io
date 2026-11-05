// Gerado por script a partir de grades de retângulos (um sprite por cor).
// Cada chave de `paths` é uma cor lógica; o componente mapeia para um token (ver PixelSvg.tsx).
// Não edite à mão: se o desenho mudar, gere de novo.
// (Os ícones da Stack e Sol/Lua não estão aqui: vêm do Font Awesome, ver StackIcons.tsx e ThemeIcons.tsx.)

export type SpriteColor = 'ink' | 'pink' | 'blue' | 'white' | 'base';

export interface SpriteData {
  readonly box: readonly [width: number, height: number];
  readonly paths: Readonly<Partial<Record<SpriteColor, string>>>;
}

export const SPARKLE: SpriteData = {
  box: [45, 45],
  paths: {
    ink: 'M20 0h5v5h-5zM15 5h5v5h-5zM25 5h5v5h-5zM15 10h5v5h-5zM25 10h5v5h-5zM5 15h10v5h-10zM30 15h10v5h-10zM0 20h5v5h-5zM40 20h5v5h-5zM5 25h10v5h-10zM30 25h10v5h-10zM15 30h5v5h-5zM25 30h5v5h-5zM15 35h5v5h-5zM25 35h5v5h-5zM20 40h5v5h-5z',
    pink: 'M20 5h5v5h-5zM20 10h5v5h-5zM15 15h15v5h-15zM5 20h35v5h-35zM15 25h15v5h-15zM20 30h5v5h-5zM20 35h5v5h-5z',
  },
};

export const CURSOR: SpriteData = {
  box: [60, 90],
  paths: {
    ink: 'M0 0h5v5h-5zM0 5h10v5h-10zM0 10h5v5h-5zM10 10h5v5h-5zM0 15h5v5h-5zM15 15h5v5h-5zM0 20h5v5h-5zM20 20h5v5h-5zM0 25h5v5h-5zM25 25h5v5h-5zM0 30h5v5h-5zM30 30h5v5h-5zM0 35h5v5h-5zM35 35h5v5h-5zM0 40h5v5h-5zM40 40h5v5h-5zM0 45h5v5h-5zM45 45h5v5h-5zM0 50h5v5h-5zM50 50h5v5h-5zM0 55h5v5h-5zM30 55h30v5h-30zM0 60h5v5h-5zM15 60h5v5h-5zM30 60h5v5h-5zM0 65h5v5h-5zM10 65h5v5h-5zM20 65h5v5h-5zM35 65h5v5h-5zM0 70h10v5h-10zM20 70h5v5h-5zM35 70h5v5h-5zM0 75h5v5h-5zM25 75h5v5h-5zM40 75h5v5h-5zM25 80h5v5h-5zM40 80h5v5h-5zM30 85h10v5h-10z',
    blue: 'M5 10h5v5h-5zM5 15h5v5h-5zM5 20h5v5h-5zM15 20h5v5h-5zM5 25h5v5h-5zM15 25h10v5h-10zM5 30h25v5h-25zM5 35h30v5h-30zM5 40h35v5h-35zM5 45h40v5h-40zM5 50h45v5h-45zM5 55h25v5h-25zM5 60h10v5h-10zM20 60h10v5h-10zM5 65h5v5h-5zM25 65h10v5h-10zM25 70h10v5h-10zM30 75h10v5h-10zM30 80h10v5h-10z',
    white: 'M10 15h5v5h-5zM10 20h5v5h-5zM10 25h5v5h-5z',
  },
};

export const FLOWER: SpriteData = {
  box: [81, 81],
  paths: {
    ink: 'M39 0h3v3h-3zM33 3h15v3h-15zM30 6h9v3h-9zM42 6h9v3h-9zM27 9h6v3h-6zM48 9h6v3h-6zM24 12h6v3h-6zM51 12h6v3h-6zM24 15h6v3h-6zM51 15h6v3h-6zM15 18h15v3h-15zM51 18h15v3h-15zM9 21h21v3h-21zM51 21h21v3h-21zM6 24h9v3h-9zM24 24h6v3h-6zM51 24h6v3h-6zM66 24h9v3h-9zM3 27h6v3h-6zM72 27h6v3h-6zM0 30h6v3h-6zM75 30h6v3h-6zM0 33h6v3h-6zM39 33h3v3h-3zM75 33h6v3h-6zM0 36h6v3h-6zM36 36h3v3h-3zM42 36h3v3h-3zM75 36h6v3h-6zM0 39h6v3h-6zM33 39h3v3h-3zM45 39h3v3h-3zM75 39h6v3h-6zM3 42h6v3h-6zM30 42h3v3h-3zM48 42h3v3h-3zM72 42h6v3h-6zM6 45h6v3h-6zM33 45h3v3h-3zM45 45h3v3h-3zM69 45h6v3h-6zM9 48h12v3h-12zM36 48h3v3h-3zM42 48h3v3h-3zM60 48h12v3h-12zM12 51h6v3h-6zM39 51h3v3h-3zM63 51h6v3h-6zM12 54h6v3h-6zM63 54h6v3h-6zM9 57h6v3h-6zM66 57h6v3h-6zM9 60h6v3h-6zM66 60h6v3h-6zM9 63h6v3h-6zM39 63h3v3h-3zM66 63h6v3h-6zM9 66h6v3h-6zM39 66h3v3h-3zM66 66h6v3h-6zM12 69h6v3h-6zM36 69h9v3h-9zM63 69h6v3h-6zM15 72h6v3h-6zM30 72h9v3h-9zM42 72h9v3h-9zM60 72h6v3h-6zM18 75h18v3h-18zM45 75h18v3h-18zM21 78h9v3h-9zM51 78h9v3h-9z',
    pink: 'M39 6h3v3h-3zM33 9h15v3h-15zM30 12h21v3h-21zM30 15h21v3h-21zM30 18h21v3h-21zM30 21h21v3h-21zM15 24h9v3h-9zM30 24h21v3h-21zM57 24h9v3h-9zM9 27h63v3h-63zM6 30h69v3h-69zM6 33h33v3h-33zM42 33h33v3h-33zM6 36h30v3h-30zM45 36h30v3h-30zM6 39h27v3h-27zM48 39h27v3h-27zM9 42h21v3h-21zM51 42h21v3h-21zM12 45h21v3h-21zM48 45h21v3h-21zM21 48h15v3h-15zM45 48h15v3h-15zM18 51h21v3h-21zM42 51h21v3h-21zM18 54h45v3h-45zM15 57h51v3h-51zM15 60h51v3h-51zM15 63h24v3h-24zM42 63h24v3h-24zM15 66h24v3h-24zM42 66h24v3h-24zM18 69h18v3h-18zM45 69h18v3h-18zM21 72h9v3h-9zM51 72h9v3h-9z',
    white: 'M39 36h3v3h-3zM36 39h9v3h-9zM33 42h15v3h-15zM36 45h9v3h-9zM39 48h3v3h-3z',
  },
};

export const DIAMOND: SpriteData = {
  box: [21, 21],
  paths: {
    ink: 'M9 0h3v3h-3zM6 3h3v3h-3zM12 3h3v3h-3zM3 6h3v3h-3zM15 6h3v3h-3zM0 9h3v3h-3zM18 9h3v3h-3zM3 12h3v3h-3zM15 12h3v3h-3zM6 15h3v3h-3zM12 15h3v3h-3zM9 18h3v3h-3z',
    pink: 'M9 3h3v3h-3zM6 6h9v3h-9zM3 9h15v3h-15zM6 12h9v3h-9zM9 15h3v3h-3z',
  },
};

export const CHEVRON: SpriteData = {
  box: [24, 12],
  paths: {
    base: 'M0 0h6v3h-6zM18 0h6v3h-6zM3 3h6v3h-6zM15 3h6v3h-6zM6 6h12v3h-12zM9 9h6v3h-6z',
  },
};

export const ARROW_RIGHT: SpriteData = {
  box: [22, 18],
  paths: {
    base: 'M10 0h2v2h-2zM10 2h4v2h-4zM10 4h6v2h-6zM0 6h18v2h-18zM0 8h22v2h-22zM0 10h18v2h-18zM10 12h6v2h-6zM10 14h4v2h-4zM10 16h2v2h-2z',
  },
};

export const ARROW_DOWN: SpriteData = {
  box: [18, 22],
  paths: {
    base: 'M6 0h6v2h-6zM6 2h6v2h-6zM6 4h6v2h-6zM6 6h6v2h-6zM6 8h6v2h-6zM0 10h18v2h-18zM2 12h14v2h-14zM4 14h10v2h-10zM6 16h6v2h-6zM8 18h2v2h-2zM8 20h2v2h-2z',
  },
};

export const ARROW_UP_RIGHT: SpriteData = {
  box: [15, 15],
  paths: {
    base: 'M0 0h15v3h-15zM9 3h6v3h-6zM6 6h3v3h-3zM12 6h3v3h-3zM3 9h3v3h-3zM12 9h3v3h-3zM0 12h3v3h-3zM12 12h3v3h-3z',
  },
};

export const ARROW_UP: SpriteData = {
  box: [15, 18],
  paths: {
    base: 'M6 0h3v3h-3zM3 3h9v3h-9zM0 6h3v3h-3zM6 6h3v3h-3zM12 6h3v3h-3zM6 9h3v3h-3zM6 12h3v3h-3zM6 15h3v3h-3z',
  },
};

export const LANDSCAPE: SpriteData = {
  box: [160, 96],
  paths: {
    base: 'M112 8h24v8h-24zM104 16h40v8h-40zM112 24h24v8h-24zM56 40h16v8h-16zM48 48h32v8h-32zM40 56h48v8h-48zM120 56h16v8h-16zM32 64h64v8h-64zM112 64h32v8h-32zM24 72h128v8h-128zM16 80h144v8h-144zM0 88h160v8h-160z',
  },
};

export const AVATAR: SpriteData = {
  box: [144, 176],
  paths: {
    base: 'M64 16h16v8h-16zM48 24h48v8h-48zM40 32h64v8h-64zM40 40h64v8h-64zM32 48h80v8h-80zM32 56h80v8h-80zM40 64h64v8h-64zM40 72h64v8h-64zM48 80h48v8h-48zM64 88h16v8h-16zM48 104h48v8h-48zM40 112h64v8h-64zM32 120h80v8h-80zM24 128h96v8h-96zM16 136h112v8h-112zM16 144h112v8h-112zM8 152h128v8h-128zM8 160h128v8h-128zM8 168h128v8h-128z',
  },
};
