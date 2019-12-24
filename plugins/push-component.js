import Vue from 'vue';

export default context => {
    Vue.prototype.$push = (elem, parentElement, props, rest) => {
        let parent = parentElement || document.body
        let Element = Vue.extend(elem)
        let instance = new Element({
            store: context.store,
            propsData: props,
            ...rest
        })
        instance.$mount()
        parent.appendChild(instance.$el)
    }
}