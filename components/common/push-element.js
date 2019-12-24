import Vue from 'vue'

export function push(elem, store, parentElement, props, rest) {
    let parent = parentElement || document.body
    let Element = Vue.extend(elem)
    let instance = new Element({
        store,
        propsData: props,
        ...rest
    })
    instance.$mount()
    parent.appendChild(instance.$el)
}