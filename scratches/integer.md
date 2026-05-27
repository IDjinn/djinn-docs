# Integer


- adicionar suporte para `nint` - integer com bitwidth nativa da target plataform
- adicionar sufixos para overflow handling

```djin
i32 common = 123;
i32w wrapped = 121231234w; // when overflow, value became negative (normal behaviour e.g C)
i32t trapped = 232134324t; //  when oferflow, panics
i32c checked = 232343c; // when overflow, throws language-level error (OverflowException family)
i32s satturation = 23498s; // when tried to overflow, value is manteined at i32.MAX_VALUE;
```