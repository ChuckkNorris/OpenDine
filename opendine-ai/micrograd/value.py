
class Value:
  def __init__(self, data, _children=(), _op='', label='') -> None:
    self.data = data
    # default, we assume it's not affecting output initially
    self.grad = 0
    self._prev = set(_children)
    self._op = _op
    self.label = label

  def __repr__(self) -> str:
    return f"Value(data={self.data})"
  
  def __add__(self, other):
    return Value(self.data + other.data, (self, other), '+')
  
  def __mul__(self, other):
    return Value(self.data * other.data, (self, other), '*')
  
  def __truediv__(self, other):
    return Value(self.data / other.data, (self, other), '/')
  
  def __sub__(self, other):
    return Value(self.data - other.data, (self, other), '-')