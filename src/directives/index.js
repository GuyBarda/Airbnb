export const clickOutsideDirective = {
    mounted(el, { value: cb }) {
        el.clickOutside = ({ clientX, clientY }) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            if (
                !(
                    clientX > left &&
                    clientX < left + width &&
                    clientY > top &&
                    clientY < top + height
                )
            ) {
                cb();
                console.log("outside");
            } else {
                console.log("inside");
            }
        };
        setTimeout(() => {
            document.addEventListener("click", el.clickOutside);
        }, 0);
    },
    unmounted(el) {
        document.removeEventListener("click", el.clickOutside);
    },
};

export const scrollEvent = {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener("scroll", f);
            }
        };
        window.addEventListener("scroll", f);
    },
};
