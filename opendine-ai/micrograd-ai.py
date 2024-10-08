# %%
import math
import numpy as np
import matplotlib.pyplot as plt
from micrograd.value import Value
# %matplotlib inline
from micrograd.tracer import draw_dot

# %%
def f(x):
  return 3*x**2 - 4*x + 5

val = f(3)

xs = np.arange(-5, 5, .25)
ys = f(xs)
print(f(3))
print(xs)
print(ys)
print(plt.plot(xs, ys))
# %%
h = 0.000001
x = -3.0
(f(x + h) - f(x))/h

# %%
# More complex
a = 2.0
b = -3.0
c = 10.0
d = a*b + c
print(d)
# %%
# Example 2
h = 0.0001

# Inputs
a = 2.0
b = -3.0
c = 10.0

d1 = a*b + c
c += h
d2 = a*b + c
print('d1', d1)
print('d2', d2)
print('slope', (d2 - d1)/h)
# %%
# Example Grad Function
def run_example_grad() -> Value:
  h = 0.001
  a = Value(2.0, label='a')
  b = Value(-3.0, label='b')
  c = Value(10.0, label='c')
  e = a*b; e.label = 'e'
  d = e + c; d.label = 'd'
  f = Value(-2.0, label='f')
  l = d*f; l.label = 'l'
  L1 = l.data

  a = Value(2.0, label='a')
  b = Value(-3.0, label='b')
  c = Value(10.0, label='c')
  # c.data +=h
  e = a*b; e.label = 'e'
  e.data += h
  d = e + c; d.label = 'd'
  # d.data += h
  f = Value(-2.0, label='f')
  l = d*f; l.label = 'l'
  L2 = l.data

  l.grad = 1.0
  f.grad = 4.0
  d.grad = -2
  c.grad = -2.0
  e.grad = -2.0

  print((L2 - L1)/h)
  return l
l = run_example_grad()
draw_dot(l)
# What is the derivative of L with respect to L
# If we change L, but a tiny amount (e.g. h), how much does L change (changes by h, proportial, derivative would be 1)

# print('d', d)
# print('d.prev', d._prev)
# print('d._op', d._op)
# %%
# What we know
# l = d * f
# what is dl/dd = ?
# dk/dd = f
#(f(x+h)-f(x))/h
#((d+h)*f - d*f)/h
#(d*f + h*f - d*f) / h
#(h*f) / h
#f
# f.grad = 4.0
# d.grad = -2

# Relationship between L and C?
# dd / dc = 1.0
# dd / de = 1.0
d = c + e
(f(x+h) - f(x)) / h
((c+h + e) - (c + e)) / h
(c + h + e - c - e)/h
h/h
# Local derivative - want to find d at end of graph, only knows it is a plus
# Plus knows local influence on d and c, and d and e
# Chain rule in calculus
# %%
# Draw value nodes




# %%
# Begin back propogation
# Calculate derivative of a node with respect to other nodes
# Need to know how weights
# Interested in the derivative of the output,
# Need to derive dl/dc


# Calculate Derivatives between distant nodes
# WANT:
# dl / dc

# KNOW:
# dl / dd = -2.0
# dd / dc = 1.0

# Chain Rule:
# dl / dc = (dl / dd) * (dd / dc)
# dl / dc = -2.0 * 1.0
# dl / dc = -2.0
# Plus nodes ROUTE the gradient
# 1 * (dl/dd) = -2.0

# LAST NODE
# dl / de = -2.0
# dl / da = (dl / de) * (de / da)
# dl / da = -2.0 * -3.0
d = 4.00010
l = -8.0020