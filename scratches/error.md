### Error Handling


```djinn
import std::types;

struct DivisionByZeroException : ArgumentException;

constexpr i32 division(i32 value, i32 divisor) throws(DivisionByZeroException) {
    if (unlikely(divisor == 0))   {
        throw DivisionByZeroException("Division {value}/0 is not allowed");
    }
    return value / divisor;
}

void main() throws {
    i32 result = try division(1, 0).or(-1);
}
```