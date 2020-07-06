import { push } from './push-element'
import TwofaCheck from './twofa-check'

export default {
    open: function(store, { parentElement, animationDuration }) {
        let parent = parentElement || document.body
        let anim = animationDuration || 500
        return new Promise((resolve, reject) => {
            push(TwofaCheck, store, parent, {
                animDuration: anim,
                positiveResult: () => {
                    resolve()
                },
                negativeResult: () => {
                    reject()
                }
            })
        })
    }
}
