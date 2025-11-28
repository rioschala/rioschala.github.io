---
title: "Math with KaTeX"
description: "A guide on how to use KaTeX for mathematical notation in this blog."
publishDate: "2025-11-28"
tags: ["Mathematics"]
---

# Math with KaTeX

This blog supports mathematical notation using [KaTeX](https://katex.org/). You can use LaTeX syntax to render math equations.

## Inline Math

You can write inline math by wrapping your equation in single dollar signs `$`.

For example, `$E = mc^2$` renders as $E = mc^2$.

## Block Math

For larger equations that should be displayed on their own line, use double dollar signs `$$`.

```latex
$$
\int_{0}^{\infty} x^2 e^{-x} \, dx = 2!
$$
```

Renders as:

$$
\int_{0}^{\infty} x^2 e^{-x} \, dx = 2!
$$

## Common Notations Reference

Here is a quick reference for the most commonly used mathematical notations.

### Roots and Exponents

| Notation | LaTeX Code | Result |
| :--- | :--- | :--- |
| Square Root | `\sqrt{x}` | $\sqrt{x}$ |
| Complex Root | `\sqrt{x^2 + y^2}` | $\sqrt{x^2 + y^2}$ |
| N-th Root | `\sqrt[3]{x}` | $\sqrt[3]{x}$ |
| Superscript | `x^2` | $x^2$ |
| Subscript | `x_i` | $x_i$ |

### Trigonometry

| Notation | LaTeX Code | Result |
| :--- | :--- | :--- |
| Sine | `\sin(x)` | $\sin(x)$ |
| Cosine | `\cos(x)` | $\cos(x)$ |
| Tangent | `\tan(x)` | $\tan(x)$ |
| Theta | `\theta` | $\theta$ |
| Identity | `\sin^2(\theta) + \cos^2(\theta) = 1` | $\sin^2(\theta) + \cos^2(\theta) = 1$ |

### Logarithms and Calculus

| Notation | LaTeX Code | Result |
| :--- | :--- | :--- |
| Logarithm | `\log(x)` | $\log(x)$ |
| Natural Log | `\ln(x)` | $\ln(x)$ |
| Limit | `\lim_{x \to \infty}` | $\lim_{x \to \infty}$ |
| Integral | `\int_{a}^{b}` | $\int_{a}^{b}$ |

### Operators and Logic

| Notation | LaTeX Code | Result |
| :--- | :--- | :--- |
| Plus/Minus | `\pm` | $\pm$ |
| Multiply | `\times` or `\cdot` | $\times$ or $\cdot$ |
| Divide | `\div` | $\div$ |
| Approx | `\approx` | $\approx$ |
| Not Equal | `\neq` | $\neq$ |
| Infinity | `\infty` | $\infty$ |
| For All | `\forall` | $\forall$ |
| Exists | `\exists` | $\exists$ |

## Boolean Logic

| Notation | LaTeX Code | Result |
| :--- | :--- | :--- |
| AND | `\land` | $\land$ |
| OR | `\lor` | $\lor$ |
| NOT | `\neg` | $\neg$ |
| Implies | `\implies` | $\implies$ |
| Equivalent | `\iff` | $\iff$ |
| XOR | `\oplus` | $\oplus$ |
| True | `\top` | $\top$ |
| False | `\bot` | $\bot$ |

**Example:**

`$(P \land Q) \implies R$` $\rightarrow$ $(P \land Q) \implies R$

## Functions

You can define functions using standard algebraic notation.

**Simple Function:**

`$f(x) = \sin(x) + \cos(x)$` $\rightarrow$ $f(x) = \sin(x) + \cos(x)$

**Piecewise Function:**

```latex
$$
f(x) = \begin{cases}
  x^2 & \text{if } x > 0 \\
  -x & \text{if } x \le 0
\end{cases}
$$
```

$$
f(x) = \begin{cases}
  x^2 & \text{if } x > 0 \\
  -x & \text{if } x \le 0
\end{cases}
$$

## Derivatives

Express derivatives using prime notation or Leibniz notation.

**Prime Notation:**

`$f'(x) = 2x + 1$` $\rightarrow$ $f'(x) = 2x + 1$

**Leibniz Notation:**

`$\frac{dy}{dx} = 3x^2$` $\rightarrow$ $\frac{dy}{dx} = 3x^2$

**Limit Definition:**

```latex
$$
\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$
```

$$
\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

## Polynomials

Polynomials are straightforward to write using superscripts `^` for exponents.

**General Form:**

`$P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$` $\rightarrow$ $P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$

**Cubic Polynomial:**

`$y = 4x^3 - 2x^2 + 7x - 5$` $\rightarrow$ $y = 4x^3 - 2x^2 + 7x - 5$

**Roots (Quadratic Formula):**

`$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$` $\rightarrow$ $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

## Matrices

```latex
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

Enjoy writing math in your posts!
