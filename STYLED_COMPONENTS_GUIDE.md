# Styled Components Setup

Este proyecto utiliza **Styled Components** para gestión avanzada de estilos con TypeScript y React.

## Estructura de Estilos

### 1. **GlobalStyles** (`src/styles/GlobalStyles.ts`)

Estilos globales aplicados a toda la aplicación incluyendo:

- Reset de CSS
- Definición de variables CSS
- Estilos base para elementos HTML
- Font-smoothing y configuración general

### 2. **Theme** (`src/styles/theme.ts`)

Archivo centralizado con todas las constantes de diseño:

- **Colores:** Primario, secundario, gradientes, paleta de texto
- **Sombras:** sm, md, lg, primary, hover
- **Transiciones:** fast, base, smooth
- **Border radius:** sm, md, lg, full
- **Spacing:** xs, sm, md, lg, xl, xxl
- **Breakpoints:** mobile, tablet, desktop, wide

### 3. **Componentes Reutilizables** (`src/styles/components.ts`)

Componentes styled reutilizables:

- `Container` - Contenedor con max-width
- `Section` - Sección con padding y background personalizables
- `Grid` - Grid responsivo
- `Card` - Tarjeta con efectos hover
- `Button` - Botón con variantes
- `Input` / `Textarea` - Campos de formulario
- `Badge` - Etiqueta
- `Link` - Enlace con efecto

### 4. **Estilos Específicos por Componente**

Cada componente tiene su propio archivo de estilos (ej: `src/styles/HeroStyles.ts`):

```typescript
export const HeroSection = styled.section`...`;
export const HeroTitle = styled.h1`...`;
```

## Cómo Usar

### En un Componente

```typescript
import styled from "styled-components";
import { Container } from "../styles/components";

const MySection = styled.section`
  padding: 2rem;
  background: ${(props) => props.theme.colors.background.light};
`;

export default function MyComponent() {
  return (
    <MySection>
      <Container>
        <h1>Mi Componente</h1>
      </Container>
    </MySection>
  );
}
```

### Acceder al Theme

```typescript
const MyButton = styled.button`
  padding: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;
```

### Usar Componentes Reutilizables

```typescript
import { Button, Input, Card, Grid } from "../styles/components";

function Form() {
  return (
    <Grid columns={2} gap="2rem">
      <Card>
        <Input placeholder="Nombre" />
        <Button>Enviar</Button>
      </Card>
    </Grid>
  );
}
```

## Beneficios

✅ **Encapsulación:** Los estilos están ligados al componente  
✅ **Reutilización:** Componentes styled globales  
✅ **Type-Safe:** TypeScript integrado  
✅ **Mantenibilidad:** Cambios centralizados en theme  
✅ **Performance:** Solo CSS necesario se carga  
✅ **Consistencia:** Paleta de colores unificada  
✅ **Responsive:** Helpers de breakpoints

## Paleta de Colores

- **Primary:** `#667eea`
- **Secondary:** `#764ba2`
- **Success:** `#2ecc71`
- **Error:** `#ef4444`
- **Text Dark:** `#1a202c`
- **Text Light:** `#4a5568`

## Breakpoints

```typescript
mobile: 480px
tablet: 768px
desktop: 1024px
wide: 1440px
```

## Próximos Pasos

1. Refactorizar componentes existentes a Styled Components
2. Mover estilos CSS a archivos de estilos específicos
3. Usar componentes reutilizables en lugar de clases CSS
4. Documentar patrones de uso en cada componente
