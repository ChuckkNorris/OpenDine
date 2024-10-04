# %%
import math
import numpy as np
import matplotlib.pyplot as plt
from micrograd.value import Value
# %matplotlib inline

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
a = Value(2.0)
b = Value(-3.0)
c = Value(10.0)
d = a*b + c

print('d', d)
print('d.prev', d._prev)
print('d._op', d._op)
# %%