# Chapter 1: Complex Numbers - Lecture Notes

---

## Part 1: What are Complex Numbers?

### The Problem That Started It All
You know that some equations have no real solutions. For example:
- **x² = -1** has no real solution (because squaring any real number gives a positive result)
- We cannot find √(-1) in real numbers

### The Solution: Imaginary Unit "i"
Mathematicians created a new number called **i** (imaginary unit) where:

**i = √(-1)**

This means: **i² = -1**

### What is a Complex Number?
A **complex number** is written as:

**z = a + bi**

Where:
- **a** = real part (a real number)
- **b** = imaginary part (also a real number, but it's multiplied by i)
- **i** = √(-1)

### Examples:
- **3 + 4i** → real part = 3, imaginary part = 4
- **5 - 2i** → real part = 5, imaginary part = -2
- **7** → real part = 7, imaginary part = 0 (this is just a real number)
- **-3i** → real part = 0, imaginary part = -3 (this is purely imaginary)

---

## Part 2: Geometrical Representation of Complex Numbers

### The Complex Plane (Argand Plane)
Just like we plot points on a graph with x and y coordinates, we can plot complex numbers on a **complex plane**.

**How it works:**
- The **horizontal axis (x-axis)** = Real axis (for the real part "a")
- The **vertical axis (y-axis)** = Imaginary axis (for the imaginary part "b")

### Plotting a Complex Number z = a + bi
The complex number **z = a + bi** is plotted as the point **(a, b)** on the complex plane.

### Examples:
1. **z = 3 + 4i** → Plot point (3, 4)
   - Move 3 units right on real axis
   - Move 4 units up on imaginary axis

2. **z = -2 + 5i** → Plot point (-2, 5)
   - Move 2 units left on real axis
   - Move 5 units up on imaginary axis

3. **z = 4 - 3i** → Plot point (4, -3)
   - Move 4 units right on real axis
   - Move 3 units down on imaginary axis

### Visual Representation:
```
    Imaginary axis (i)
          ↑
          |
    5i ---|--- • (z = -2 + 5i)
          |
    4i ---|------- • (z = 3 + 4i)
          |
    3i ---|
          |
          |
─────────|─────────→ Real axis
   -2  -1|0  1  2  3  4
          |
   -3i ---|------- • (z = 4 - 3i)
          |
```

### Important Points:
- Every complex number represents a **unique point** on the complex plane
- The distance from origin (0, 0) to the point (a, b) is called the **modulus** (we'll learn this next)
- This geometric view helps us visualize operations on complex numbers

---

## Part 3: Basic Operations on Complex Numbers

### 1. Addition of Complex Numbers

**Rule:** Add the real parts together, and add the imaginary parts together.

If **z₁ = a + bi** and **z₂ = c + di**, then:

**z₁ + z₂ = (a + c) + (b + d)i**

**Examples:**
1. **(3 + 4i) + (2 + 5i)**
   - Real parts: 3 + 2 = 5
   - Imaginary parts: 4 + 5 = 9
   - **Answer: 5 + 9i**

2. **(7 - 3i) + (-2 + 6i)**
   - Real parts: 7 + (-2) = 5
   - Imaginary parts: -3 + 6 = 3
   - **Answer: 5 + 3i**

---

### 2. Subtraction of Complex Numbers

**Rule:** Subtract the real parts, and subtract the imaginary parts.

If **z₁ = a + bi** and **z₂ = c + di**, then:

**z₁ - z₂ = (a - c) + (b - d)i**

**Examples:**
1. **(5 + 7i) - (2 + 3i)**
   - Real parts: 5 - 2 = 3
   - Imaginary parts: 7 - 3 = 4
   - **Answer: 3 + 4i**

2. **(4 - 2i) - (6 - 5i)**
   - Real parts: 4 - 6 = -2
   - Imaginary parts: -2 - (-5) = -2 + 5 = 3
   - **Answer: -2 + 3i**

---

### 3. Multiplication of Complex Numbers

**Rule:** Use the distributive property (like multiplying binomials), and remember that **i² = -1**.

If **z₁ = a + bi** and **z₂ = c + di**, then:

**z₁ × z₂ = (a + bi)(c + di)**

**Steps:**
1. Multiply using FOIL (First, Outer, Inner, Last)
2. Replace i² with -1
3. Simplify

**Examples:**

**Example 1:** (2 + 3i)(4 + 5i)
- First: 2 × 4 = 8
- Outer: 2 × 5i = 10i
- Inner: 3i × 4 = 12i
- Last: 3i × 5i = 15i² = 15(-1) = -15

Combine: 8 + 10i + 12i - 15 = (8 - 15) + (10 + 12)i = **-7 + 22i**

**Example 2:** (3 - 2i)(1 + 4i)
- First: 3 × 1 = 3
- Outer: 3 × 4i = 12i
- Inner: -2i × 1 = -2i
- Last: -2i × 4i = -8i² = -8(-1) = 8

Combine: 3 + 12i - 2i + 8 = (3 + 8) + (12 - 2)i = **11 + 10i**

---

### 4. Division of Complex Numbers

**Rule:** Multiply both numerator and denominator by the **conjugate** of the denominator.

**What is a conjugate?**
- The conjugate of (a + bi) is (a - bi)
- The conjugate of (a - bi) is (a + bi)
- You just change the sign of the imaginary part

**Why use conjugate?**
When you multiply a complex number by its conjugate, you get a **real number**:
- (a + bi)(a - bi) = a² - (bi)² = a² - b²i² = a² - b²(-1) = a² + b²

**Steps for Division:**
If you want to find **z₁ ÷ z₂**:
1. Write it as a fraction: z₁/z₂
2. Find the conjugate of the denominator
3. Multiply both top and bottom by this conjugate
4. Simplify

**Examples:**

**Example 1:** (4 + 3i) ÷ (1 + 2i)

Step 1: Write as fraction: (4 + 3i)/(1 + 2i)

Step 2: Conjugate of (1 + 2i) is (1 - 2i)

Step 3: Multiply top and bottom by (1 - 2i):
```
(4 + 3i)(1 - 2i)
─────────────────
(1 + 2i)(1 - 2i)
```

Step 4: Multiply numerator:
- (4 + 3i)(1 - 2i) = 4 - 8i + 3i - 6i² = 4 - 5i - 6(-1) = 4 - 5i + 6 = 10 - 5i

Step 5: Multiply denominator:
- (1 + 2i)(1 - 2i) = 1 - 4i² = 1 - 4(-1) = 1 + 4 = 5

Step 6: Final answer:
```
10 - 5i     10    5i
─────── = ─── - ───  = 2 - i
   5        5     5
```

**Answer: 2 - i**

---

**Example 2:** (6 + 8i) ÷ (2 - i)

Conjugate of (2 - i) is (2 + i)

Numerator: (6 + 8i)(2 + i) = 12 + 6i + 16i + 8i² = 12 + 22i - 8 = 4 + 22i

Denominator: (2 - i)(2 + i) = 4 - i² = 4 + 1 = 5

Answer: (4 + 22i)/5 = **4/5 + (22/5)i**

---

## Quick Summary:

| Operation | Rule |
|-----------|------|
| **Addition** | (a + bi) + (c + di) = (a + c) + (b + d)i |
| **Subtraction** | (a + bi) - (c + di) = (a - c) + (b - d)i |
| **Multiplication** | Use FOIL method, remember i² = -1 |
| **Division** | Multiply by conjugate of denominator |

---

*Lecture Date: April 10, 2026*
