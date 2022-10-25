
// 단순 입력 디렉티브
// 포커스 인/아웃에 따른 디스플레이 포맷 변화 없고
// 에러/포커스 하이라이트만 제어하면 되는 경우
```
var fp_directive_input = {
    bind: function (el) {
        el.addEventListener('focus', function (evt) {
            var p = el.parentElement;
            if (p && p.classList.contains('search-wrap')) {
                p.classList.add('is-selected');
            } else {
                el.classList.add('is-selected');
            }
        });
        el.addEventListener('blur', function (evt) {
            var p = el.parentElement;
            if (p && p.classList.contains('search-wrap')) {
                p.classList.remove('is-error');
                p.classList.remove('is-selected');
            } else {
                el.classList.remove('is-error');
                el.classList.remove('is-selected');
            }
        });
        el.addEventListener('input', function (evt) {
            var p = el.parentElement;
            if (p && p.classList.contains('search-wrap')) {
                p.classList.remove('is-error');
            } else {
                el.classList.remove('is-error');
            }
        });
    }
};
```

// 숫자 입력 디렉티브
// - format : 'no' 포커스 인/아웃에 따른 디스플레이 포맷 처리 안함
// - zero : 포커스 인/아웃에 따른 디스플레이 포맷 처리 시 0일 때 표시할 값
```
var fp_directive_number = {
    bind: function (el, binding) {
        var opt = binding.value || {format:'yes',zero:''};
        if (opt.format != 'no') {
            el.addEventListener('focus', function (evt) {
                console.log('fp_directive_number', 'focus in', el.id, el.value);
                var n = fpjs.number.parse (el.value);
                if (n == 0 && opt.zero === '') {
                    el.value = opt.zero;
                } else {
                    el.value = String(n);
                }
            });
        }
        if (opt.format != 'no') {
            el.addEventListener('blur', function (evt) {
                console.log('fp_directive_number', 'focus out', el.id, el.value);
                if (opt.zero) {
                    el.value = fpjs.number.format(el.value, opt.zero);
                } else {
                    el.value = fpjs.number.format(el.value);
                }
            });
        }
        el.addEventListener('keypress', function (evt) {
            var c = evt.keyCode || evt.which;
            if (c != 46 && c < 48 || 57 < c) {
                evt.preventDefault();
            }
        });
        el.addEventListener('keyup', function (evt) {
            var c = evt.keyCode || evt.which;
            if (c != 46 && c < 48 || (57 < c && c < 95) || 105 < c) { // 0-to-9 48~57, numeric key 0-to-9 95~105
                evt.preventDefault();
            }
        });
    },
    inserted: function (el, binding) {
        console.log('fp_directive_number', 'inserted', el.id, el.value);
        var opt = binding.value || {format:'yes',zero:''};
        if (opt. format !='no') {
            if (opt.zero) {
                el.value = fpjs.number.format(el.value, opt.zero);
            } else {
                el.value = fpjs.number.format(el.value);
            }
        }
    },
    update: function (el, binding) {
        console.log('fp_directive_number', 'update', el.id, el.value);
        var opt = binding.value || {format:'yes',zero:''};
        if (opt.format !='no') {
            if (opt.format != 'no') {
                if (opt.zero) {
                    el.value = fpjs.number.format(el.value, opt.zero);
                } else {
                    el.value = fpjs.number.format(el.value);
                }
            }
        }
    },
};
```

// 심사플랫폼 숫자 입력 디렉티브
// - format : 'no' 포커스 인/아웃에 따른 디스플레이 포맷 처리 안함
// - zero : 포커스 인/아웃에 따른 디스플레이 포맷 처리 시 0일 때 표시할 값
```
var uwp_directive_number = {
    bind: function (el, binding) {
        var opt = _uwp_.mixin({format:'yes',zero:''}, binding.value);
        if (opt.format != 'no') {
            el.addEventListener('focus', function (evt) {
                opt.vm && opt.vm.$nextTick(function () {
                    var n = _uwp_.number(el.value);
                    el.value = String(_uwp_.number(el.value) || opt.zero);
                    el.setSelectionRange(0, el.value.length); // 전체선택
                });
            });
            el.addEventListener('blur', function (evt) {
                opt.vm && opt.vm.$nextTick(function () {
                    el.value = _uwp_.n2s(el.value, opt.zero);
                });
            });
        }
        el.addEventListener('input', function (evt) {
            var el = evt.target;
            var val = el.value;
            var re = /[^0-9]/g;
            var res = re.exec(val);
            if (res) {
                var selection = res.index;
                el.value = val.replace(re, '');
                el.setSelectionRange(selection, selection);
            }
        });
    }
};
```

// 날짜 입력 디렉티브
// - format : 'no' 포커스 인/아웃에 따른 디스플레이 포맷 처리 안함
```
var fp_directive_date = {
    bind: function (el, binding) {
        var opt = binding.value || {format:'yes'};
        if (opt.format !='no') {
            el.addEventListener('focus', function (evt) {
                console.log('fp_directive_date', 'focus in');
                el.value = fpjs.date.imformal(el.value);
            });
        }
        if (opt.format != 'no') {
            el.addEventListener('blur', function (evt) {
                console.log('fp_directive_date', 'focus out');
                el.value = fpjs.date.formal(el.value);
            });
        }
    },
    inserted: function (el, binding) {
        console.log('fp_directive_date', 'inserted', el.value);
        var opt = binding.value || {format:'yes'};
        if (opt.format != 'no') {
            el.value = fpjs.date.formal(el.value);
        }
    },
    update: function (el, binding) {
        console.log('fp_directive_date', 'update', el.value);
        var opt = binding.value || {format:'yes'};
        if (opt.format != 'no') {
            el.value = fpjs.date.formal(el.value);
        }
    },
};
```
