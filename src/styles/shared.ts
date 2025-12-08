/**
 * Shared/Common Styled Components - Bootstrap-like System
 *
 * This file contains reusable styled components for layout,
 * forms, cards, containers, and common UI patterns.
 *
 * Usage:
 * import { Container, Row, Col, Card, Button, Input } from '../styles/shared';
 */

import styled, { css } from "styled-components";

// ============================================================================
// LAYOUT SYSTEM - Grid & Flexbox Utilities
// ============================================================================

/**
 * Container - Max-width wrapper with auto horizontal centering
 *
 * Props:
 * - $fullWidth?: boolean - Remove max-width constraint
 * - $padding?: 'sm' | 'md' | 'lg' | 'xl' - Padding variants
 */
export const Container = styled.div<{
  $fullWidth?: boolean;
  $padding?: "sm" | "md" | "lg" | "xl";
}>`
  max-width: ${(props) => (props.$fullWidth ? "100%" : "1200px")};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => {
    switch (props.$padding) {
      case "sm":
        return "0 0.75rem";
      case "lg":
        return "0 2.5rem";
      case "xl":
        return "0 3rem";
      default:
        return "0 1.5rem";
    }
  }};

  @media (max-width: 768px) {
    padding: ${(props) => {
      switch (props.$padding) {
        case "sm":
          return "0 0.5rem";
        case "lg":
          return "0 1.5rem";
        case "xl":
          return "0 1.5rem";
        default:
          return "0 1rem";
      }
    }};
  }
`;

/**
 * Row - Flex container for columns (like Bootstrap row)
 *
 * Props:
 * - $gap?: 'sm' | 'md' | 'lg' | 'xl' - Gap between columns
 * - $justifyContent?: CSS justify-content values
 * - $alignItems?: CSS align-items values
 */
export const Row = styled.div<{
  $gap?: "sm" | "md" | "lg" | "xl";
  $justifyContent?: string;
  $alignItems?: string;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => {
    switch (props.$gap) {
      case "sm":
        return "0.5rem";
      case "lg":
        return "2rem";
      case "xl":
        return "3rem";
      default:
        return "1rem";
    }
  }};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  align-items: ${(props) => props.$alignItems || "stretch"};
`;

/**
 * Column - Flexible column component (like Bootstrap col)
 *
 * Props:
 * - $width?: string | number - Width in % or px (e.g., "50%", "200px")
 * - $flex?: boolean - Use flex:1 for equal width columns
 * - $alignSelf?: string - Individual alignment
 */
export const Col = styled.div<{
  $width?: string | number;
  $flex?: boolean;
  $alignSelf?: string;
}>`
  ${(props) => {
    if (props.$flex) {
      return css`
        flex: 1;
        min-width: 0;
      `;
    }
    if (props.$width) {
      return css`
        width: ${typeof props.$width === "number"
          ? `${props.$width}%`
          : props.$width};
        flex-shrink: 0;
      `;
    }
    return css`
      flex: 1;
      min-width: 0;
    `;
  }}
  align-self: ${(props) => props.$alignSelf || "auto"};
`;

/**
 * FlexBox - Flexible container with common flex properties
 *
 * Props:
 * - $direction?: 'row' | 'column'
 * - $justifyContent?: CSS justify-content values
 * - $alignItems?: CSS align-items values
 * - $gap?: 'sm' | 'md' | 'lg' | 'xl'
 * - $wrap?: boolean
 */
export const FlexBox = styled.div<{
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
  $gap?: "sm" | "md" | "lg" | "xl";
  $wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  align-items: ${(props) => props.$alignItems || "stretch"};
  gap: ${(props) => {
    switch (props.$gap) {
      case "sm":
        return "0.5rem";
      case "lg":
        return "2rem";
      case "xl":
        return "3rem";
      default:
        return "1rem";
    }
  }};
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "nowrap")};
`;

/**
 * Grid - CSS Grid container
 *
 * Props:
 * - $columns?: number | string - Number of columns or template
 * - $gap?: 'sm' | 'md' | 'lg' | 'xl'
 * - $minItemWidth?: string - Minimum item width for auto-fit
 */
export const Grid = styled.div<{
  $columns?: number | string;
  $gap?: "sm" | "md" | "lg" | "xl";
  $minItemWidth?: string;
}>`
  display: grid;
  grid-template-columns: ${(props) => {
    if (typeof props.$columns === "number") {
      return `repeat(${props.$columns}, 1fr)`;
    }
    if (props.$minItemWidth) {
      return `repeat(auto-fit, minmax(${props.$minItemWidth}, 1fr))`;
    }
    return props.$columns || "repeat(auto-fit, minmax(200px, 1fr))";
  }};
  gap: ${(props) => {
    switch (props.$gap) {
      case "sm":
        return "0.5rem";
      case "lg":
        return "2rem";
      case "xl":
        return "3rem";
      default:
        return "1rem";
    }
  }};
`;

// ============================================================================
// CARD COMPONENT - Versatile card with configurable styles
// ============================================================================

/**
 * Card - Reusable card component with shadow and border options
 *
 * Props:
 * - $shadow?: 'sm' | 'md' | 'lg' | 'xl' - Shadow intensity
 * - $padding?: 'sm' | 'md' | 'lg' | 'xl' - Internal padding
 * - $border?: boolean - Show border
 * - $interactive?: boolean - Add hover effects
 * - $borderRadius?: 'sm' | 'md' | 'lg' - Border radius
 */
export const Card = styled.div<{
  $shadow?: "sm" | "md" | "lg" | "xl";
  $padding?: "sm" | "md" | "lg" | "xl";
  $border?: boolean;
  $interactive?: boolean;
  $borderRadius?: "sm" | "md" | "lg";
}>`
  background: ${(props) => props.theme.colors.background.primary};
  padding: ${(props) => {
    switch (props.$padding) {
      case "sm":
        return "1rem";
      case "lg":
        return "2.5rem";
      case "xl":
        return "3rem";
      default:
        return "2rem";
    }
  }};
  border-radius: ${(props) => {
    switch (props.$borderRadius) {
      case "sm":
        return "6px";
      case "lg":
        return "16px";
      default:
        return "10px";
    }
  }};
  border: ${(props) =>
    props.$border ? `1px solid ${props.theme.colors.border.light}` : "none"};
  box-shadow: ${(props) => {
    switch (props.$shadow) {
      case "sm":
        return props.theme.shadows.sm;
      case "lg":
        return props.theme.shadows.lg;
      case "xl":
        return props.theme.shadows.xl;
      default:
        return props.theme.shadows.md;
    }
  }};
  transition: ${(props) =>
    props.$interactive ? `all ${props.theme.transitions.base}` : "none"};

  ${(props) =>
    props.$interactive &&
    css`
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${props.theme.shadows.lg};
      }
    `}
`;

/**
 * CardHeader - Card header section with optional gradient
 */
export const CardHeader = styled.div<{ $gradient?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  ${(props) =>
    props.$gradient &&
    css`
      background: linear-gradient(
        135deg,
        ${props.theme.colors.primary},
        ${props.theme.colors.secondary}
      );
      padding: 1.5rem;
      margin: -2rem -2rem 1.5rem -2rem;
      border-radius: 10px 10px 0 0;
      color: white;
    `}
`;

/**
 * CardBody - Card body section
 */
export const CardBody = styled.div`
  flex: 1;
`;

/**
 * CardFooter - Card footer section
 */
export const CardFooter = styled.div<{ $background?: boolean }>`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border.light};
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

// ============================================================================
// FORM COMPONENTS - Input, Textarea, Select
// ============================================================================

const inputBaseStyles = css<{ $error?: boolean; $size?: "sm" | "md" | "lg" }>`
  padding: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "0.5rem 0.75rem";
      case "lg":
        return "1.25rem 1.5rem";
      default:
        return "1rem";
    }
  }};
  border: 2px solid ${(props) => props.theme.colors.input.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-family: inherit;
  font-size: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "0.9rem";
      case "lg":
        return "1.1rem";
      default:
        return "1rem";
    }
  }};
  transition: all ${(props) => props.theme.transitions.base};
  background-color: ${(props) => props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.input.text};

  &::placeholder {
    color: ${(props) => props.theme.colors.input.placeholder};
  }

  ${(props) =>
    props.$error &&
    css`
      border-color: ${props.theme.colors.error};
      background: rgba(239, 68, 68, 0.05);
    `}

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    background-color: ${(props) => props.theme.colors.background.primary};
  }

  &:focus${(props) => (props.$error ? ".input-error" : "")} {
    border-color: ${(props) => props.theme.colors.error};
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${(props) => props.theme.colors.background.secondary};
  }
`;

/**
 * FormInput - Text input component
 *
 * Props:
 * - $error?: boolean - Show error state
 * - $size?: 'sm' | 'md' | 'lg' - Input size
 */
export const FormInput = styled.input<{
  $error?: boolean;
  $size?: "sm" | "md" | "lg";
}>`
  ${inputBaseStyles}
  width: 100%;
`;

/**
 * FormTextarea - Textarea component
 *
 * Props:
 * - $error?: boolean - Show error state
 * - $size?: 'sm' | 'md' | 'lg' - Input size
 * - $rows?: number - Number of rows
 */
export const FormTextarea = styled.textarea<{
  $error?: boolean;
  $size?: "sm" | "md" | "lg";
  $rows?: number;
}>`
  ${inputBaseStyles}
  width: 100%;
  resize: vertical;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  min-height: ${(props) => (props.$rows ? `${props.$rows * 1.5}rem` : "120px")};
`;

/**
 * FormSelect - Select dropdown component
 */
export const FormSelect = styled.select<{
  $error?: boolean;
  $size?: "sm" | "md" | "lg";
}>`
  ${inputBaseStyles}
  width: 100%;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667eea' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
`;

/**
 * FormGroup - Wrapper for form fields
 */
export const FormGroup = styled.div<{ $gap?: "sm" | "md" | "lg" }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => {
    switch (props.$gap) {
      case "sm":
        return "0.5rem";
      case "lg":
        return "1rem";
      default:
        return "0.75rem";
    }
  }};
`;

/**
 * FormLabel - Label for form fields
 */
export const FormLabel = styled.label<{ $required?: boolean }>`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};

  ${(props) =>
    props.$required &&
    css`
      &::after {
        content: " *";
        color: ${props.theme.colors.error};
      }
    `}
`;

/**
 * FormError - Error message below form field
 */
export const FormError = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &::before {
    content: "⚠";
    font-size: 0.9rem;
  }
`;

/**
 * FormHelperText - Helper text below form field
 */
export const FormHelperText = styled.span`
  color: ${(props) => props.theme.colors.text.tertiary};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

// ============================================================================
// BUTTON COMPONENTS - Primary, Secondary, Outlined, etc.
// ============================================================================

const buttonBaseStyles = css<{
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "0.5rem 1rem";
      case "lg":
        return "1.25rem 2rem";
      default:
        return "1rem 1.5rem";
    }
  }};
  font-size: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "0.9rem";
      case "lg":
        return "1.1rem";
      default:
        return "1rem";
    }
  }};
  font-weight: 700;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

/**
 * Button - Primary gradient button
 *
 * Props:
 * - $size?: 'sm' | 'md' | 'lg'
 * - $fullWidth?: boolean
 * - $loading?: boolean
 */
export const Button = styled.button<{
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
  $loading?: boolean;
}>`
  ${buttonBaseStyles}
  background: linear-gradient(135deg, ${(props) =>
    props.theme.colors.primary}, ${(props) => props.theme.colors.secondary});
  color: white;
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  ${(props) =>
    props.$loading &&
    css`
      opacity: 0.7;
      pointer-events: none;
    `}
`;

/**
 * ButtonSecondary - Secondary outlined button
 */
export const ButtonSecondary = styled.button<{
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}>`
  ${buttonBaseStyles}
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};

  &:hover:not(:disabled) {
    background: rgba(102, 126, 234, 0.1);
  }
`;

/**
 * ButtonDanger - Danger/destructive action button
 */
export const ButtonDanger = styled.button<{
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}>`
  ${buttonBaseStyles}
  background: ${(props) => props.theme.colors.error};
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4);
  }
`;

/**
 * ButtonGhost - Minimal ghost button
 */
export const ButtonGhost = styled.button<{
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}>`
  ${buttonBaseStyles}
  background: transparent;
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.border.light};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.background.secondary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================

/**
 * Heading - Reusable heading component
 *
 * Props:
 * - $level?: 1 | 2 | 3 | 4 | 5 | 6
 * - $gradient?: boolean
 * - $align?: 'left' | 'center' | 'right'
 */
export const Heading = styled.h1<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6;
  $gradient?: boolean;
  $align?: "left" | "center" | "right";
}>`
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
  text-align: ${(props) => props.$align || "left"};

  font-size: ${(props) => {
    switch (props.$level) {
      case 1:
        return "3.5rem";
      case 2:
        return "2.5rem";
      case 3:
        return "2rem";
      case 4:
        return "1.5rem";
      case 5:
        return "1.25rem";
      case 6:
        return "1rem";
      default:
        return "2rem";
    }
  }};

  ${(props) =>
    props.$gradient &&
    css`
      background: linear-gradient(
        135deg,
        ${props.theme.colors.primary},
        ${props.theme.colors.secondary}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `}

  @media (max-width: 768px) {
    font-size: ${(props) => {
      switch (props.$level) {
        case 1:
          return "2.5rem";
        case 2:
          return "2rem";
        case 3:
          return "1.5rem";
        case 4:
          return "1.25rem";
        case 5:
          return "1rem";
        case 6:
          return "0.9rem";
        default:
          return "1.5rem";
      }
    }};
  }
`;

/**
 * Paragraph - Reusable paragraph with size variants
 *
 * Props:
 * - $size?: 'sm' | 'md' | 'lg'
 * - $weight?: 400 | 500 | 600 | 700
 * - $color?: 'primary' | 'secondary' | 'tertiary' | 'muted'
 */
export const Paragraph = styled.p<{
  $size?: "sm" | "md" | "lg";
  $weight?: 400 | 500 | 600 | 700;
  $color?: "primary" | "secondary" | "tertiary" | "muted";
}>`
  margin: 0;
  font-size: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "0.9rem";
      case "lg":
        return "1.1rem";
      default:
        return "1rem";
    }
  }};
  font-weight: ${(props) => props.$weight || 400};
  line-height: 1.7;
  color: ${(props) => {
    switch (props.$color) {
      case "secondary":
        return props.theme.colors.text.secondary;
      case "tertiary":
        return props.theme.colors.text.tertiary;
      case "muted":
        return props.theme.colors.text.muted;
      default:
        return props.theme.colors.text.primary;
    }
  }};
`;

/**
 * Badge - Small label/tag component
 */
export const Badge = styled.span<{
  $variant?: "primary" | "secondary" | "success" | "error" | "warning";
  $size?: "sm" | "md";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) =>
    props.$size === "sm" ? "0.25rem 0.75rem" : "0.5rem 1rem"};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => (props.$size === "sm" ? "0.75rem" : "0.85rem")};
  font-weight: 700;
  white-space: nowrap;

  ${(props) => {
    const variant = props.$variant || "primary";
    const bgColor =
      variant === "primary"
        ? props.theme.colors.primary
        : variant === "success"
        ? props.theme.colors.success
        : variant === "error"
        ? props.theme.colors.error
        : variant === "warning"
        ? props.theme.colors.warning
        : props.theme.colors.secondary;

    return css`
      background: ${bgColor};
      color: white;
    `;
  }}
`;

// ============================================================================
// DIVIDER & SPACING
// ============================================================================

/**
 * Divider - Horizontal line separator
 */
export const Divider = styled.hr<{ $margin?: "sm" | "md" | "lg" | "xl" }>`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.border.light};
  margin: ${(props) => {
    switch (props.$margin) {
      case "sm":
        return "1rem 0";
      case "lg":
        return "3rem 0";
      case "xl":
        return "4rem 0";
      default:
        return "2rem 0";
    }
  }};
`;

/**
 * Spacer - Add consistent spacing
 */
export const Spacer = styled.div<{ $height?: "sm" | "md" | "lg" | "xl" }>`
  height: ${(props) => {
    switch (props.$height) {
      case "sm":
        return "1rem";
      case "lg":
        return "3rem";
      case "xl":
        return "4rem";
      default:
        return "2rem";
    }
  }};
`;

// ============================================================================
// SECTION COMPONENTS - Common page sections
// ============================================================================

/**
 * Section - Full-width section with padding
 *
 * Props:
 * - $padding?: 'sm' | 'md' | 'lg' | 'xl'
 * - $background?: 'light' | 'gradient'
 * - $center?: boolean
 */
export const Section = styled.section<{
  $padding?: "sm" | "md" | "lg" | "xl";
  $background?: "light" | "gradient";
  $center?: boolean;
}>`
  padding: ${(props) => {
    switch (props.$padding) {
      case "sm":
        return "2rem 0";
      case "lg":
        return "6rem 0";
      case "xl":
        return "8rem 0";
      default:
        return "4rem 0";
    }
  }};

  ${(props) => {
    if (props.$background === "gradient") {
      return css`
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      `;
    }
    return css`
      background: ${props.theme.colors.background.primary};
    `;
  }}

  ${(props) =>
    props.$center &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}

  @media (max-width: 768px) {
    padding: ${(props) => {
      switch (props.$padding) {
        case "sm":
          return "1rem 0";
        case "lg":
          return "3rem 0";
        case "xl":
          return "4rem 0";
        default:
          return "2rem 0";
      }
    }};
  }
`;

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

/**
 * Stack - Simple flexbox column stack
 */
export const Stack = styled.div<{
  $gap?: "sm" | "md" | "lg" | "xl";
  $align?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => {
    switch (props.$gap) {
      case "sm":
        return "0.5rem";
      case "lg":
        return "2rem";
      case "xl":
        return "3rem";
      default:
        return "1rem";
    }
  }};
  align-items: ${(props) => props.$align || "stretch"};
`;

/**
 * Link - Styled anchor component
 */
export const Link = styled.a<{ $underline?: boolean }>`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  text-decoration: ${(props) => (props.$underline ? "underline" : "none")};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: underline;
  }
`;

/**
 * Overlay - Full screen overlay
 */
export const Overlay = styled.div<{ $opacity?: number; $visible?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, ${(props) => props.$opacity || 0.5});
  z-index: 999;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transition: all ${(props) => props.theme.transitions.base};
`;

export default {
  // Layout
  Container,
  Row,
  Col,
  FlexBox,
  Grid,
  Stack,

  // Cards
  Card,
  CardHeader,
  CardBody,
  CardFooter,

  // Forms
  FormInput,
  FormTextarea,
  FormSelect,
  FormGroup,
  FormLabel,
  FormError,
  FormHelperText,

  // Buttons
  Button,
  ButtonSecondary,
  ButtonDanger,
  ButtonGhost,

  // Typography
  Heading,
  Paragraph,
  Badge,

  // Utilities
  Section,
  Divider,
  Spacer,
  Link,
  Overlay,
};
